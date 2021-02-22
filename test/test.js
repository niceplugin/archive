// todo readme.md 인덱스 옵션 객체 {필드명: {...옵션}} 을 {필드명, ...옵션} 으로 변경 필요

function isObject(obj) {
  return obj !== null && !Array.isArray(obj) && typeof(obj) === 'object';
}
function isBoolean(boo) {
  return typeof(boo) === 'boolean';
}

class NiceStore {
  #storeName;
  #nicedb;
  #DBOpenRequest;
  #DBQueue;
  #defQuery;

  #requestHandler;
  #getCursor;
  #getStoreIndex;
  #getRange;
  #getKeys;
  #getKeysPromises;
  #getDocs;
  #getDocOne;
  #doSort;
  #doSkip;
  #doLimit;
  #DBQueueAdd;
  #processReadonly;

  constructor(storeName, nicedb, DBOpenRequest, DBQueue) {
    const it = this;

    this.#storeName = storeName;
    this.#nicedb = nicedb;
    this.#DBOpenRequest = DBOpenRequest;
    this.#DBQueue = DBQueue;
    this.#defQuery = { _id: { $gt: 0 } };

    // 요청에 대한 성공 애러 이벤트 핸들러
    this.#requestHandler = function(request, resolve, reject) {
      request.onsuccess = function() { resolve(request.result) };
      request.onerror = function() { reject(request.error) };
    }

    // 리턴 값: field 에 해당하는 IDBIndex
    this.#getStoreIndex = function(field, mode = 'readonly') {
      const name = it.#storeName;
      const transaction = it.#DBOpenRequest.result.transaction(name, mode);
      const iDBObjectStore = transaction.objectStore(name)

      transaction.onerror = () => { throw transaction.error };

      return field === '_id' ? iDBObjectStore : iDBObjectStore.index(field);
    }

    // 리턴 값: IDBKeyRange
    this.#getRange = function(query) {
      // 쿼리 식별자: $lt, $lte, $gt, $gte
      //            upperBound, lowerBound
      //                     bound

      // 쿼리가 논리적인 범위를 나타내야 할 경우
      if ( isObject(query) ) {
        const keys = Object.keys(query);
        const options = {};

        keys.forEach(key=>{
          const value = query[key];
          if (key === '$lt') {
            options.upper = value;
            options.upperOpen = true;
          } else if (key === '$lte') {
            options.upper = value;
            options.upperOpen = false;
          } else if (key === '$gt') {
            options.lower = value;
            options.lowerOpen = true;
          } else if (key === '$gte') {
            options.lower = value;
            options.lowerOpen = false;
          }
        });

        let range;
        const oKeys = Object.keys(options);
        if (oKeys.includes('lower') && oKeys.includes('upper')) {
          range = IDBKeyRange.bound(options.lower, options.upper, options.lowerOpen, options.upperOpen);
        } else if (oKeys.includes('lower')) {
          range = IDBKeyRange.lowerBound(options.lower, options.lowerOpen);
        } else if (oKeys.includes('upper')) {
          range = IDBKeyRange.upperBound(options.upper, options.upperOpen);
        }

        if (!range) { // 내용: 쿼리의 값이 잘못되었습니다.
          throw new URIError('The value of the query is invalid.');
        }
        return range;
      } else {
        return IDBKeyRange.only(query);
      }
    }

    // 리턴 값: 검색된 문서의 Promise 로 이루어진 배열 Promise
    this.#getKeysPromises = function( queries = it.#defQuery ) {
      let fields = Object.keys(queries);

      if (!fields.length) {
        fields = ['_id'];
        queries = it.#defQuery;
      }

      // promises = 쿼리즈 내에 모든 필드를 루프하고, 각각의 리턴 값 Promise 로 이루어진 배열
      const promises = fields.map( field => {
        return new Promise((resolve, reject) => { try {
          const iDBIndex = it.#getStoreIndex(field);
          const iDBKeyRange = it.#getRange( queries[field] );
          const iDBRequest = iDBIndex.getAllKeys(iDBKeyRange);
          it.#requestHandler(iDBRequest, resolve, reject);
        } catch(e) { reject(e) } })
      });

      return Promise.all(promises);
    }

    // 리턴 값: 검색된 문서의 _id 로 이루어진 배열 Promise
    this.#getKeys = function(queries) {
      return new Promise((resolve, reject) => { try {
        it.#getKeysPromises(queries).then( arrays => {
          // 사용자가 IDBObjectStore.createIndex 옵션을 { multiEntry: true } 로 할 경우
          // 해당 문서의 필드의 배열 내 값이 여러번 일치 할 경우
          // 그 때 마다 key(_id) 를 배열에 담으므로, key 가 중복된 상태일 수 있으니
          // 값이 유니크 할 수 있도록 필터조치
          arrays = arrays.map( arr => arr.filter( (value, index, self) => {
            return self.indexOf(value) === index
          }) );

          // arrays = 쿼리즈 내에 모든 필드를 각각 검색한 결과 값 key 로 이루어진 배열로 이루어진 2차원 배열
          // result = arrays 내의 모든 배열들의 교집합 배열
          const result = arrays.reduce((accumulator, currentValue) => {
            const a = accumulator.length < currentValue.length ? accumulator : currentValue;
            const b = a !== accumulator ? accumulator : currentValue;
            return a.filter( key => -1 !== b.indexOf(key) );
          });

          resolve(result);
        }, e => reject(e) );
      } catch(e) { reject(e) } })
    }

    // 리턴 값: 모드에 해당하는 IDBCursor Promise
    this.#getCursor = function(callback, mode = 'readonly') {
      return new Promise( (resolve, reject) => { try {
        const name = it.#storeName;
        const transaction = it.#DBOpenRequest.result.transaction(name, mode);
        transaction.onerror = () => { throw transaction.error };
        const request = transaction.objectStore(name).openCursor();
        request.onerror = () => reject(request.error);

        // 커서를 성공적으로 호출할 경우: 이후 커서 호출을 콜백함수로 지정 후 resolve
        request.onsuccess = (event) => {
          request.onsuccess = callback;
          resolve(event);
        };
      } catch(e) { reject(e) } })
    }

    // 리턴 값: 검색된 문서로 이루어진 배열 Promise
    this.#getDocs = function(queries) {
      return new Promise( (resolve, reject) => { try {
        // keys = 쿼리즈에 해당하는 문서들의 _id 배열
        it.#getKeys(queries).then( keys => {
          const docs = [];

          // 커서 컨트롤러: keys 에 해당하는 문서 수집
          function callback(event) {
            const cursor = event.target.result;
            if (cursor) {
              if ( cursor.value._id === keys[0] ) {
                docs.push( cursor.value );
                keys.shift();
              }

              const _id = keys[0]; // 다음 문서로 이동 할 _id 추출
              if ( _id !== undefined ) {
                cursor.continue( _id ) }
              else { resolve(docs) }
            } else { resolve(docs) }
          }

          it.#getCursor( callback ).then( callback, e => reject(e) );
        }, e => reject(e) );
      } catch(e) { reject(e) } })
    }

    // 리턴 값: 검색된 문서 객체 || undefined
    this.#getDocOne = function(queries) {
      return new Promise( (resolve, reject) => { try {
        // keys = 쿼리즈에 해당하는 문서들의 _id 배열
        it.#getKeys(queries).then( keys => {
          if ( !keys.length ) { return resolve(undefined) }

          const request = it.#getStoreIndex('_id').get(keys[0]);

          it.#requestHandler(request, resolve, reject);
        }, e => reject(e) );
      } catch(e) { reject(e) } })
    }

    // 리턴 값: 없음. request 배열 정렬
    // sorts: {...fields} || [ ['field', i] ... ]
    this.#doSort = function(request, sorts) {
      if ( !sorts || typeof(sorts) !== 'object' ) { return }

      sorts = Array.isArray(sorts) ? sorts : Object.entries(sorts);

      function sameSort(a, b, type, i) {
        if (type === 'number') {
          return (a - b) * i
        } else if (type === 'string') {
          if (a > b) { return 1 * i }
          else if (a < b) { return -1 * i }
          else { return 0 }
        } else if (type === 'array') {
          if (a.length > b.length) { return 1 * i }
          else if (a.length < b.length) { return -1 * i }
          else { return 0 }
        } else {
          if (a === b) { return 0 }
          else if (a > b) { return 1 * i }
          else if (a < b) { return -1 * i }
          else { return 0 }
        }
      }
      function diffSort(a, b, typeA, typeB) {
        if (typeA === 'number') { return -1 }
        else if (typeB === 'number') { return 1 }
        else if (typeA === 'NaN') { return -1 }
        else if (typeB === 'NaN') { return 1 }
        else if (typeA === 'string') { return -1 }
        else if (typeB === 'string') { return 1 }
        else if (typeA === 'boolean') { return -1 }
        else if (typeB === 'boolean') { return 1 }
        else if (typeA === 'array') { return -1 }
        else if (typeB === 'array') { return 1 }
        else if (typeA === 'date') { return -1 }
        else if (typeB === 'date') { return 1 }
        else if (typeA === 'object') { return -1 }
        else if (typeB === 'object') { return 1 }
        else if (typeA === 'null') { return -1 }
        else if (typeB === 'null') { return 1 }
        else { return 0 }
      }
      function getType(value) {
        let type = typeof value;

        if (type === 'number') {
          type = Number.isNaN(value) ? 'NaN' : type;
        } else if (type === 'object') {
          type = Array.isArray(value) ? 'array' :
            value instanceof Date ? 'date' :
              value instanceof Object ? 'object' :
                value === null ? 'null' : type;
        }

        return type;
      }

      request.sort( (a, b) => {
        return sorts.reduce( (acc, cur) => {
          if (acc !== 0) { return acc }

          const field = cur[0];
          const i = cur[1];
          const valueA = a[field];
          const valueB = b[field];
          const typeA = getType(valueA);
          const typeB = getType(valueB);

          if ( typeA === typeB ) { return sameSort(valueA, valueB, typeA, i) }
          else { return diffSort(valueA, valueB, typeA, typeB) }
        }, 0 );
      } );
    }

    // 리턴 값: 없음. request 배열의 0 ~ n 인덱스 요소 삭제
    this.#doSkip = function(request, n) {
      if ( Number.isInteger(n) ) { request.splice(0, n) }
    }

    // 리턴 값: 없음. request 배열의 n 이후 인덱스 요소 삭제
    this.#doLimit = function(request, n) {
      if ( Number.isInteger(n) ) { request.splice(n) }
    }

    // 리턴 값: 큐 예약이 필요할 경우 예약된 promise || 아닌 경우 undefined
    this.#DBQueueAdd = function(methodName, methodArguments) {
      const it = this;
      const storeName = it.#storeName;
      const pass = it.#nicedb.isSuccess;

      return pass ? undefined : new Promise((resolve, reject) => { try {
        const queue = {
          storeName, methodName, methodArguments, resolve
        };
        it.#DBQueue.push(queue);
      } catch(e) { reject(e) } })
    }
  }

  // 쿼리에 해당하는 문서를 모두 조회.
  // 리턴 값: 조회된 문서 객체를 인자로 포함하는 배열
  find( queries, options = {} ) {
    const it = this;

    return this.#DBQueueAdd( 'find', [ ...arguments ] ) ||
      new Promise((resolve, reject) => { try {
        it.#getDocs(queries).then( result => {
          it.#doSort(result, options.sort);
          it.#doSkip(result, options.skip);
          it.#doLimit(result, options.limit);
          resolve(result);
        }, e => reject(e) );
      } catch(e) { reject(e) } })
  }

  // 쿼리에 해당하는 문서를 조회.
  // 리턴 값: 조회된 문서 객체 또는 undefined
  findOne( queries ) {
    const it = this;

    return this.#DBQueueAdd( 'findOne', [ ...arguments ] ) ||
      new Promise((resolve, reject) => { try {
        it.#getDocOne(queries).then( result => {
          resolve(result);
        }, e => reject(e) );
      } catch(e) { reject(e) } })
  }

  // 지쿼리에 해당하는 문서의 개수를 조회.
  // 리턴 값: 조회된 문서 개수
  count( queries ) {
    const it = this;

    return this.#DBQueueAdd( 'count', [ ...arguments ] ) ||
      new Promise((resolve, reject) => { try {
        it.#getKeys(queries).then( result => {
          resolve(result.length);
        }, e => reject(e) );
      } catch(e) { reject(e) } })
  }

  // 저장된 모든 데이터를 지운다
  // 리턴 값: 없음
  clear() {
    const it = this;

    return this.#DBQueueAdd( 'clear', [ ...arguments ] ) ||
      new Promise((resolve, reject) => { try {
        const iDBObjectStore = it.#getStoreIndex('_id', 'readwrite');
        const request = iDBObjectStore.clear();
        it.#requestHandler(request, resolve, reject);
      } catch(e) { reject(e) } })
  }
}

class NiceDB {
  #queue;
  #DBOpenRequest;
  #stores;
  #success;
  #niceStores;

  constructor() {
    this.#queue = [];
    this.#DBOpenRequest = null;
    this.#stores = null;
    this.#success = false;
    this.#niceStores = {};
    this.onblocked = null;
  }

  // indexedDB 사용 가능 여부
  // 리턴 값: Boolean
  get support() { return !!indexedDB; }
  set support(value) { return value; }

  // indexedDB DBOpenRequest.onsuccess 여부
  // 리턴 값: Boolean
  get isSuccess() { return this.#success; }
  set isSuccess(value) { return value; }

  define(stores) {
    const it = this;

    // stores 유효성 검사
    (() => {
      if ( !isObject(stores) || !Object.keys(stores).length ) {
        // 내용: 매개 변수는 IndexedDB의 저장소를 정의하는 객체 여야합니다.
        throw new URIError('The parameter must be an object defining the stores of IndexedDB.');
      }

      const storesNames = [ ...Object.keys(stores) ];
      storesNames.forEach( storeName => {
        let indexes = stores[storeName];

        if ( !Array.isArray(indexes) || !indexes.length ) {
          // 내용: ${storeName} 스토어의 값이 잘못되었습니다. 값은 0보다 긴 길이의 배열이어야 합니다.
          throw new URIError(`The '${storeName}' store's value is invalid. The value must be an array of length greater than 0.`);
        }

        indexes.map( (field, i) => {
          // 내용: 잘못된 값: ${storeName} 스토어의 인덱스 ${i}.
          const errText = `Invalid value: "${i}" index in "${storeName}" store's array.`;

          // 허용되지 않는 필드 데이터 타입 예외처리
          const a = typeof(field) === 'string' && !field.length;
          const b = field === null || Array.isArray(field);
          const c = typeof(field) !== 'object' && typeof(field) !== 'string';
          if (a || b || c) {
            // 내용: 반드시 문자이거나 객체여야 함.
            throw new URIError(`${errText} Must be "String" or "Object".`);
          }

          // field 가 유효한 문자열일 경우 객체 유효성 검사 생략
          if ( typeof(field) === 'string' ) { return }

          // 필드가 객체일 경우 name 속성 여부와 그 값의 허용여부에 따른 예외처리
          if ( !field.name || typeof(field.name) !== 'string' || !field.name.length ) {
            // 내용: 객체의 경우 { name : String }을 포함해야합니다.
            throw new URIError(`${errText} For an object, it must contain { name: String }.`);
          }
        });
      });
    })();

    // 리턴 값: IDBObjectStore.createIndex 에 전달될 옵션 파라미터 포멧 형식의 객체로 이루어진 배열
    function indexExtraction(storeName) {
      let indexes = it.#stores[storeName];

      return indexes.map( (field) => {
        return (typeof(field) === 'string') ?
          { name: field, unique: false, multiEntry: false } :
          { name: field.name, unique: !!field.unique, multiEntry: !!field.multiEntry };
      });
    }

    // indexedDB 버전은 항상 최신 시간 (밀리 초)으로 업데이트 됨.
    const DBOpenRequest = indexedDB.open('niceDB', +new Date());
    this.#stores = JSON.parse(JSON.stringify(stores));
    this.#DBOpenRequest = DBOpenRequest;

    // DBOpenRequest.onerror 콘솔로 애러 출력 처리
    DBOpenRequest.onerror = function() { console.error(DBOpenRequest.error) };

    // 앱이 이미 실행중이고, 새 탭을 열어 추가로 앱을 실행할 경우,
    // 새로 실행 된 앱에서 onblocked 이벤트가 호출됨.
    DBOpenRequest.onblocked = function(event) {
      // 사용자 정의 함수가 있을 경우, 애러를 파라미터로 전달하며 함수를 실행.
      if ( typeof(it.onblocked) === 'function' ) { it.onblocked(event) }
      // 내용: 앱이 다른 곳에서 열려 있기 때문에 데이터베이스 버전을 업그레이드 할 수 없습니다.
      else { console.error("Your database version can't be upgraded because the app is open somewhere else.") }
    };

    // DBOpenRequest 성공 이벤트 헨들러를 사용자 정의 콜백으로 처리.
    DBOpenRequest.onsuccess = function() {
      it.#success = true;

      // onsuccess 이전에 요청된 모든 NiceStore 를 처리한다.
      it.#queue.map((queue) => {
        const { storeName, methodName, methodArguments, resolve } = queue;
        const promise = it.#niceStores[storeName][methodName]( ...methodArguments );
        resolve(promise);
      });
    };

    // 항상 indexedDB 버전 업데이트에 따른 upgradeneeded 이벤트 헨들링 로직.
    // - 더이상 사용되지 않는 스토어 및 필드는 삭제.
    // - 새로운 스토어 및 필드 등록.
    // - 변경된 필드 옵션 업데이트.
    DBOpenRequest.onupgradeneeded = function(event) {try {
      const db = it.#DBOpenRequest.result;
      const newStores = [ ...Object.keys(it.#stores) ];
      const oldStores = [ ...db.objectStoreNames ];
      const removeSList = oldStores.filter( store => !newStores.includes(store) );

      // 더 이상 사용하지 않는 오래된 Store 를 제거.
      removeSList.forEach( store => db.deleteObjectStore(store) );

      // 스토어 및 인덱스 생성 또는 업데이트 로직.
      newStores.forEach( storeName => {
        let objectStore;
        const transaction = event.target.transaction;
        const sOptions = { keyPath: '_id', autoIncrement: true };

        // 새로운 Store 를 작성하거나 이미있는 경우 참조.
        if ( !db.objectStoreNames.contains(storeName) ) {
          objectStore = db.createObjectStore(storeName, sOptions);
        } else {
          objectStore = transaction.objectStore(storeName);
        }

        const newIndexesExtract = indexExtraction(storeName);
        const newIndexes = newIndexesExtract.map( obj => obj.name );
        const oldIndexes = [ ...objectStore.indexNames ];
        // oldIndexes - newIndexes
        const removeIList = oldIndexes.filter( field => !newIndexes.includes(field) );
        // newIndexesExtract - oldIndexes
        const createIList = newIndexesExtract.filter( obj => !oldIndexes.includes(obj.name) );
        // newIndexesExtract ∩ oldIndexes
        const updateIList = newIndexesExtract.filter( obj => oldIndexes.includes(obj.name) );

        // 더 이상 사용하지 않는 이전 인덱스를 제거.
        removeIList.forEach( index => objectStore.deleteIndex(index) );

        // 이전에 사용되지 않은 새 인덱스를 생성.
        createIList.forEach( field => {
          const name = field.name;
          const options = { unique: field.unique, multiEntry: field.multiEntry };

          // _id는 store 에서 사용하는 key 의 별칭으로 필드로 사용 안함
          if (name === '_id') { return }
          objectStore.createIndex(name, name, options)
        });

        // 이미 사용중인 인덱스의 옵션 값을 확인하고
        // 사용자가 선언한 옵션과 이미 사용중인 옵션값이 다를 경우
        // 해당 인덱스를 지웠다가 재생성 하는 방식으로 업데이트를 진행
        updateIList.forEach( field => {
          const index = objectStore.index( field.name );
          if ( field.unique !== index.unique || field.multiEntry !== index.multiEntry ) {
            const name = field.name;
            const options = { unique: field.unique, multiEntry: field.multiEntry };

            objectStore.deleteIndex(name);
            objectStore.createIndex(name, name, options);
          }
        });
      });
    } catch(error) { console.error(error) }};
  }

  // 데이터베이스에서 지정한 스토어를 반환
  // 리턴 값: NiceStore 객체
  getStore(name) {
    const storeList = Object.keys(this.#stores);
    const niceStore = this.#niceStores;

    if ( !storeList.includes(name) ) {
      throw new URIError(`The "${name}" store is undefined.`);
    }

    niceStore[name] = niceStore[name] ?
      niceStore[name] : new NiceStore( name, this, this.#DBOpenRequest, this.#queue );

    return niceStore[name];
  }
}

window.nicedb = new NiceDB();