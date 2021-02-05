function isObject(obj) {
  return obj !== null && !Array.isArray(obj) && typeof(obj) === 'object';
}
function isBoolean(boo) {
  return typeof(boo) === 'boolean';
}

class NiceStore {
  #storeName;
  #DBOpenRequest;
  #defQuery;

  #getObjectStore;
  #getRange;
  #requestHandler;
  #processReadonly;

  constructor(storeName, DBOpenRequest) {
    const it = this;
    const name = storeName;

    this.#storeName = storeName;
    this.#DBOpenRequest = DBOpenRequest;
    this.#defQuery = {_id: {$gt: 0}};

    // 해당하는 이름의 objectStore 와 필드네임을 리턴
    this.#getObjectStore = function(query, mode) {
      const transaction = it.#DBOpenRequest.result.transaction(name, mode);
      transaction.onerror = function() {throw transaction.error; }
      let objectStore = transaction.objectStore(name);
      const field = Object.keys(query)[0];
      objectStore = field === '_id' ? objectStore : objectStore.index(field);
      return { objectStore, field }
    }

    // 쿼리를 해석해 IDBKeyRange 객체를 리턴
    this.#getRange = function(query) {
      // 쿼리 식별자: $lt, $lte, $gt, $gte
      //            upperBound, lowerBound
      //                     bound
      const queryKey = Object.keys(query)[0];
      const queryValue = query[queryKey];

      // 쿼리가 논리적인 범위를 나타내야 할 경우
      if ( isObject(queryValue) ) {
        const keys = Object.keys(queryValue);
        const options = {};

        keys.forEach(key=>{
          const value = queryValue[key];
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
        return IDBKeyRange.only(queryValue);
      }
    }

    // 요청에 대한 성공 애러 이벤트 핸들러
    this.#requestHandler = function(request, resolve, reject) {
      request.onsuccess = function() {resolve(request.result); };
      request.onerror = function() {reject(request.error); };
    }

    this.#processReadonly = function(type, query, limit) {return new Promise((resolve, reject)=>{try {
      let { objectStore } = it.#getObjectStore(query, 'readonly');
      const range = it.#getRange(query);
      const request = (limit && limit > 0) ?
        objectStore[type](range, limit) : objectStore[type](range);
      it.#requestHandler(request, resolve, reject);
    } catch (e) {reject(e); }})}
  }

  // 스토어 이름 조회
  // 리턴 값: 스토어 이름 문자열
  get name() {
    return this.#storeName;
  }

  // 인덱스 keyPath 를 조회한다.
  // 리턴 값: keyPath 를 인자로 하는 배열
  get indexList() {
    const objectStore = this.#getObjectStore(this.#defQuery, 'readonly').objectStore;
    return [ ...objectStore.indexNames ];
  }

  // indexList 의 상세정보
  // 리턴 값: keyPath 의 상세정보 객체를 인자로 하는 배열
  get indexInfo() {
    const objectStore = this.#getObjectStore(this.#defQuery, 'readonly').objectStore;
    const indexList = [ ...objectStore.indexNames ];

    return indexList.map(name => {
      const { keyPath, multiEntry, unique } = objectStore.index(name);
      return { field: keyPath, multiEntry, unique };
    });
  }

  set name(value) {return value; }
  set indexList(value) {return value; }
  set indexInfo(value) {return value; }

  // 쿼리에 해당하는 문서를 모두 조회.
  // 리턴 값: 조회된 문서 객체를 인자로 포함하는 배열
  find(query = this.#defQuery, limit = 0) {
    if (typeof(query) === 'number') {
      limit = query;
      query = this.#defQuery;
    }
    if (!query) {
      query = this.#defQuery;
    }
    return this.#processReadonly('getAll', query, limit);
  }

  // 쿼리에 해당하는 문서를 조회.
  // 리턴 값: 조회된 문서 객체 또는 undefined
  findOne(query = this.#defQuery) {
    return this.#processReadonly('get', query);
  }

  // 지쿼리에 해당하는 문서의 개수를 조회.
  // 리턴 값: 조회된 문서 개수
  count(query = this.#defQuery) {
    return this.#processReadonly('count', query);
  }

  // 문서를 추가.
  // 리턴 값: 추가된 문서의 _id 반환
  insert(doc) {return new Promise((resolve, reject)=>{try {
    // doc 데이터 타입 예외처리.
    if ( !isObject(doc) ) {
      // 내용: 두 번째 인자는 반드시 객체여야 합니다.
      reject(new URIError('The second argument must be an object.'));
    }
    delete doc._id;
    if (Object.keys(doc).length === 0) {
      // 내용: 삽입 할 문서는 빈 개체 일 수 없습니다.
      reject(new URIError('The document to be inserted cannot be an empty object.'));}


    let { objectStore } = this.#getObjectStore(this.#defQuery, 'readwrite');
    const request = objectStore.add(doc);
    this.#requestHandler(request, resolve, reject);
  } catch (e) {reject(e); }})}

  // 쿼리에 해당하는 문서를 업데이트.
  // change === true 일 경우, 해당하는 문서를 doc 으로 교체.
  // 리턴 값: 업데이트 된 문서의 _id 를 인자로 가지는 배열 반환
  // update(query = this.#defQuery, doc, change = false) {return new Promise((resolve, reject)=>{try {
  update( ...arg ) {return new Promise((resolve, reject)=>{try {
    let query = this.#defQuery, doc, change = false;
    let single = null; // 값이 false 일 경우 커서를 사용해야 함을 의미.

    // 파라미터 유효성 검사
    if (arg.length === 0) {
      // 내용: 파라미터가 없습니다.
      return reject(new URIError('There are no parameters.'));
    }
    // update( doc )
    else if (arg.length === 1) {
      if ( !isObject(arg[0]) ) {
        // 내용: doc 파라미터는 반드시 객체여야 합니다.
        return reject(new URIError('"doc" parameter must be an object.'));
      }
      doc = arg[0];
      single = false;
    }
    // update( doc, change )
    // update( query, doc )
    else if (arg.length === 2) {
      if ( isBoolean(arg[1]) ) { // update( doc, change )
        if ( !isObject(arg[0]) ) {
          // 내용: doc 파라미터는 반드시 객체여야 합니다.
          return reject(new URIError('"doc" parameter must be an object.'));
        }
        doc = arg[0];
        change = !!arg[1];
        single = false;
      }
      else { // update( query, doc )
        if ( !isObject(arg[0]) || !isObject(arg[1]) ) {
          // 내용: doc 파라미터는 반드시 객체여야 합니다.
          return reject(new URIError('"query" and "doc" parameters must be an object.'));
        }
        query = arg[0];
        doc = arg[1];
      }
    }
    // update( query, doc, change )
    else {
      if ( !isObject(arg[0]) || !isObject(arg[1]) ) {
        // 내용: doc 파라미터는 반드시 객체여야 합니다.
        return reject(new URIError('"query" and "doc" parameters must be an object.'));
      }
      query = arg[0];
      doc = arg[1];
      change = !!arg[2];
    }

    let { objectStore, field } = this.#getObjectStore(query, 'readwrite');
    single = single === null ? field === '_id' : single;
    const range = this.#getRange(query);
    const request = single ? objectStore.get(range) : objectStore.openCursor(range);
    const cursorResult = [];
    delete doc._id;

    request.onerror = function() {reject(request.error); };
    request.onsuccess = function() {
      // put 또는 update 메서드를 부르기 위한 객체를 cursor 에 할당.
      const cursor = single ? objectStore : request.result;
      // 커서가 없을 경우 cursor.continue() 의 결과가 더는 없음을 의미.
      if (!cursor) {return resolve(cursorResult); }
      // 갱신 할 문서의 원본.
      const oldDoc = single ? request.result : cursor.value;
      // single === true 일 경우에만 해당하는 조건문으로, query 결과가 없음을 의미.
      if (oldDoc === undefined) {return resolve(cursorResult); }
      // 문서의 일부 필드만 갱신 또는 문서 자체 교체에 따른 새로운 문서.
      const newDoc = change ? { _id: oldDoc._id, ...doc } : { ...oldDoc, ...doc };

      /* Important ===============================================================
      ** 이러한 조건문 로직이 들어간 이유는 커서가 중복으로 도는 경우가 있기때문.
      ** 아래 내용은 그 예시와 경우를 설명.
      ** query = {key: {$gt:5}}, update = {key: 9, foo: 'bar'} 일때
      ** 쿼리에 해당하고 업데이트 될 값 9 미만인 키값을 가지는 문서들이
      ** 내부적으로 루프가 key===9 를 확인하기 전 값이 갱신되기 때문에
      ** 이후 cursor.continue() 에 의해 루프가 key===9 를 확인 할 때
      ** 업데이트 되었던 문서들이 한 번 더 노출 됨.
      ** 이러한 경우 의미없는 update() 수행을 막기 위해 return 으로 함수실행을 종료시키지만
      ** 이 때 cursor.continue() 를 호출하는 이유는
      ** 원래부터 key===9 였던 다른 문서들의 foo 필드 값을 'bar' 로 갱신하기 위함임. */
      if (!single && cursorResult.indexOf(cursor.primaryKey) !== -1) {return cursor.continue(); }

      // 갱신 메서드 호출 후 받는 IDBRequest 객체를 updated 에 할당.
      const updated = single ? cursor.put(newDoc) : cursor.update(newDoc);

      updated.onerror = function(event) {reject(event.target.error); }
      updated.onsuccess = function() {
        if (single) {resolve([updated.result]); }
        else { // 커서를 사용해서 갱신했을 경우, 다음 커서로 이동
          cursorResult.push(cursor.primaryKey);
          cursor.continue();
        }
      }
    };
  } catch (e) {reject(e); }})}

  // query 에 해당하는 모든 문서를 지운다.
  // 리턴 값: 없음
  remove(query = this.#defQuery) {return new Promise((resolve, reject)=>{try {
    let { objectStore, field } = this.#getObjectStore(query, 'readwrite');
    const single = field === '_id'; // 값이 false 일 경우 커서를 사용해야 함을 의미.
    const range = this.#getRange(query);
    const request = single ? objectStore.delete(range) : objectStore.openCursor(range);

    if (single) {
      this.#requestHandler(request, resolve, reject);
    } else {
      request.onerror = function() {reject(request.error); };
      request.onsuccess = function() {
        const cursor = request.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      }
    }
  } catch (e) {reject(e); }})}

  // 저장된 모든 데이터를 지운다
  // 리턴 값: 없음
  clear() {return new Promise((resolve, reject)=>{try {
    let { objectStore } = this.#getObjectStore(this.#defQuery, 'readwrite');
    const request = objectStore.clear();
    this.#requestHandler(request, resolve, reject);
  } catch (e) {reject(e); }})}
}

class NiceDB {
  #DBOpenRequest;
  #stores;

  constructor() {
    this.#DBOpenRequest = null;
    this.#stores = null;
    this.onversionchange = null;
    this.onblocked = null;
  }

  // DB를 사용하기 전 초기화 하는 함수.
  // 리턴 값: DBOpenRequest.onsuccess event
  define(stores) {return new Promise((resolve, reject)=>{

    function indexExtraction(storeName) {
      // init 함수에서 전달받은 stores 객체의 각각의 프로퍼티(스토어)에서
      // 사용할 각각의 필드를 createIndex 파라미터로 전달할 포멧에 객체화 하여
      // 각 객체를 프로퍼티로 하는 배열로 리턴
      let indexes = it.#stores[storeName];

      if (!Array.isArray(indexes) || !indexes.length) {
        // 내용: ${storeName} 스토어의 필드가 잘못되었습니다. 필드는 배열이어야 합니다.
        throw new URIError(`The field of store '${storeName}' is invalid. Field must be an array.`);
      }

      // indexes 배열의 인자들을 정제된 데이터 인자로 변환하여 반환하는 로직
      // 정제된 데이터 포멧(obj): {field: String, unique: Boolean, multiEntry: Boolean}
      // 리턴 데이터 예시: [obj, obj, ...]
      return indexes.map(function (field, i) {
        // 내용: ${storeName} 스토어의 필드 배열의 인덱스 ${i}에 문제가 있습니다.
        const errIText = `The index in problem is ${i} of the field array of '${storeName}' store.`;

        // 허용되지 않는 필드 데이터 타입 예외처리
        const a = typeof(field) === 'string' && !field.length;
        const b = field === null || Array.isArray(field);
        const c = typeof(field) !== 'object' && typeof(field) !== 'string';
        if (a || b || c) {
          // 내용: 필드 배열의 속성들은 '1보다 긴 문자열' 또는 객체로 구성되야 합니다.
          throw new URIError(`The properties of the Field array, must be 'strings of longer then 1' or object. ${errIText}`);
        }

        // 필드가 문자열일 경우 기본값 객체로 리턴
        if (typeof(field) === 'string') {
          return {name: field, unique: false, multiEntry: false};
        }

        // 필드가 객체일 경우 name 속성 여부와 그 값의 허용여부에 따른 예외처리
        if (!field.name || typeof(field.name) !== 'string' || !field.name.length) {
          // 내용: 필드 배열의 속성이 객체인 경우, 1이상 길이의 문자열을 값으로 가지는 name 속성이 있어야합니다.
          throw new URIError(`If the property of the field array is an object, it must have name property with a string of longer than 1. ${errIText}`);
        }

        return {name: field.name, unique: !!field.unique, multiEntry: !!field.multiEntry};
      });
    }

    // 파라미터 데이터 타입 예외처리
    if (!indexedDB) {
      // 내용: IndexedDB를 지원하지 않는 환경입니다.
      throw new ReferenceError('IndexedDB is not supported at this runtime.');
    }
    if ( !isObject(stores) || !Object.keys(stores).length ) {
      // 내용: 매개 변수는 IndexedDB의 저장소를 정의하는 객체 여야합니다.
      throw new URIError('The parameter must be an object defining the stores of IndexedDB.');
    }

    const it = this;
    this.#stores = JSON.parse(JSON.stringify(stores));
    // onupgradeneeded 핸들러를 호출하기 위해 indexedDB 버전은
    // 항상 최신 시간 (밀리 초)으로 업데이트됩니다.
    this.#DBOpenRequest = indexedDB.open('niceDB', +new Date());

    // NiceDB 에서 DBOpenRequest 프로세스 예외 처리.
    this.#DBOpenRequest.onerror = function() {
      reject(it.#DBOpenRequest.error);
    };

    // 앱이 이미 실행중이고, 새 탭을 열어 추가로 앱을 실행할 경우,
    // 새로 실행 된 앱에서 onblocked 이벤트가 호출됨.
    this.#DBOpenRequest.onblocked = function() {
      // 내용: 앱이 다른 곳에서 열려 있기 때문에 데이터베이스 버전을 업그레이드 할 수 없습니다.
      const err = new Error("Your database version can't be upgraded because the app is open somewhere else.");
      // 사용자 정의 함수가 있을 경우, 애러를 파라미터로 전달하며 함수를 실행.
      if (typeof(it.onblocked) === 'function') {it.onblocked(err); }
      else {reject(err); }
    };

    // NiceDB 에서 DBOpenRequest 프로세스 성공 이벤트 헨들러를 사용자 정의 콜백으로 처리.
    this.#DBOpenRequest.onsuccess = function(event) {
      resolve(event);
    };

    // NiceDB 에서 DBOpenRequest 의 upgradeneeded 이벤트 헨들링 로직.
    // - 더이상 사용되지 않는 스토어 및 필드는 삭제.
    // - 새로운 스토어 및 필드 등록.
    // - 변경된 필드 옵션 업데이트.
    this.#DBOpenRequest.onupgradeneeded = function(event) {try {
      const db = it.#DBOpenRequest.result;

      // 사용자 정의 onversionchange 핸들러가있는 경우에만 호출.
      db.onversionchange = function (event) {
        if (typeof (it.onversionchange) === 'function') {
          it.onversionchange(event);
        }
      };

      const newStores = [...Object.keys(it.#stores)];
      const oldStores = [...db.objectStoreNames];
      const removeSList = oldStores.filter(store => !newStores.includes(store));

      // 더 이상 사용하지 않는 오래된 Store 를 제거.
      removeSList.forEach(store => db.deleteObjectStore(store));

      // 스토어 및 인덱스 생성 또는 업데이트 로직.
      newStores.forEach(function (store) {
        let objectStore;
        const transaction = event.target.transaction;
        const sOptions = {keyPath: '_id', autoIncrement: true};

        // 새로운 Store 를 작성하거나 이미있는 경우 참조.
        if (!db.objectStoreNames.contains(store)) {
          objectStore = db.createObjectStore(store, sOptions);
        } else {
          objectStore = transaction.objectStore(store);
        }

        const newIndexesExtract = indexExtraction(store);
        const newIndexes = newIndexesExtract.map(obj=>obj.name);
        const oldIndexes = [...objectStore.indexNames];
        const removeIList = oldIndexes.filter(field => !newIndexes.includes(field));
        const createIList = newIndexesExtract.filter(obj => !oldIndexes.includes(obj.name));
        const updateIList = newIndexesExtract.filter(obj=>oldIndexes.includes(obj.name));

        // 더 이상 사용하지 않는 이전 인덱스를 제거.
        removeIList.forEach(index => objectStore.deleteIndex(index));

        // 이전에 사용되지 않은 새 인덱스를 생성.
        createIList.forEach(function(field) {
          const name = field.name;
          const options = {unique: field.unique, multiEntry: field.multiEntry};

          // _id는 store 에서 사용하는 key 의 별칭으로 필드로 사용 안함
          if (name === '_id') {return; }
          objectStore.createIndex(name, name, options)
        });

        // 이미 사용중인 인덱스의 옵션 값을 확인하고
        // 사용자가 선언한 옵션과 이미 사용중인 옵션값이 다를 경우
        // 해당 인덱스를 지웠다가 재생성 하는 방식으로 업데이트를 진행
        updateIList.forEach(function (field) {
          const index = objectStore.index(field.name);
          if (field.unique !== index.unique || field.multiEntry !== index.multiEntry) {
            const name = field.name;
            const options = {unique: field.unique, multiEntry: field.multiEntry};

            objectStore.deleteIndex(name);
            objectStore.createIndex(name, name, options);
          }
        });
      });
    }catch (error) {reject(error); }};
  })}

  // 데이터베이스에서 지정한 스토어를 반환
  // 리턴 값: NiceStore 객체 || null
  getStore(name) {
    const db = this.#DBOpenRequest.result;
    const storeList = [ ...db.objectStoreNames ];

    return storeList.includes(name) ? new NiceStore(name, this.#DBOpenRequest) : null;
  }
}

export default new NiceDB;