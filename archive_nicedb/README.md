- [English](https://github.com/niceplugin/nicedb)
- [한국어](https://github.com/niceplugin/nicedb/blob/master/docs/readme.ko.md)

* * *

# Simple and easy NiceDB

**NiceDB** is a library for easy and simple use of **IndexedDB**.
Created for use in small **SPA**, **PWA**.
It consists of interfaces similar to **MongoDB**.

Using it has the following advantages:

- The code is concise.
- No need for version control.
- Automatically update store and index settings.

> What is **IndexedDB**? [link](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## Install

### CDN

```html
<script src="https://unpkg.com/nicedb/dist/iife.js"></script>
```
Use in JavaScript files after installation:
```js
nicedb.define( /* Object defining stores */ );
// ...
```

### NPM

```shell
npm install nicedb
```
Use in JavaScript files after installation:
```js
import nicedb from "nicedb"
nicedb.define( /* Object defining stores */ );
// ...
```

## Before reading this document

All functions provided by **NiceDB** are asynchronous, so they return Promise.
Therefore, you need to post-process with `.then()`, `catch()` and `.finally()`.

If it is not an asynchronous function, it is marked as a synchronous function.

> What is `Promise`? [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Word description

To avoid confusion, we define some of the words to be used here.

- Store: A storage is a space for users to store data.
- Document: Data object to be saved or saved by the user.
- Field: The key used in the document (object).
- Query: Conditional statements to find documents.

### Browser support

**IndexedDB** is part of the official web spec.
Therefore, it works in the latest browsers such as `Chrome`, `Firefox`, `Safari`, and `Edge`.
[link](https://caniuse.com/?search=indexeddb)

`IE` does not support it because it uses **IndexedDB 2.0** API.

## Index

- [API `NiceDB class`](#api-nicedb-class)
    - [`define()` sync](#define-sync)
    - [`getStore()` sync](#getstore-sync)
    - [`onblocked`](#onblocked)
- [API `Store class`](#api-store-class)
    - [`find()`](#find)
    - [`findOne()`](#findone)
    - [`count()`](#count)
    - [`insert()`](#insert)
    - [`upsert()`](#upsert)
    - [`remove()`](#remove)
    - [`clear()`](#clear)
- [Comparison query operators](#comparison-query-operators)

* * *

# API `NiceDB class`

## `define()` sync

A method to define the stores before using the library.

### Syntax

```js
define( stores )
```

### Parameters

`stores`(Required - Object)

- Object defining the store.
    - Key: The store's name string.
    - Value: An field_array of "strings or objects defining fields" of the document to be used in the store.
        - objects in field_array: `key=field name`, `value= option_object`

> `_id` cannot be declared as a field name. But you can use it in your query.

> Documents can be saved using field names that are not declared in field_array.
> However, you cannot search by that field.
>
> You can save the document as a Boolean value in the declared field.
> But when searching for Boolean value, the document is not searched.
> Therefore, it is recommended to use 0 and 1 instead of Boolean. [link](https://stackoverflow.com/questions/13672906/indexeddb-boolean-index)

> Option information when an object such as `{ ...options }` is declared instead of a string in field_array.. [link](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex)

### Return value

`resolve`: [IDBRequest success event](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/success_event)

`reject`: [Error event](https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event)

### Example

```js
import nicedb from "nicedb"

const store = {
  // You have defined a store named 'user'.
  // Since you declared 'name','age', and'gender',
  // You can search with this field in the future.
  user: ['name', 'age', 'gender'],

  // You have defined a store named 'car'.
  // The modelNum field used options.
  car: ['name', 'color', {name: 'modelNum', unique: true, multiEntry: false}]
  // ...
};

nicedb.define( store );
```

## `getStore()` sync

Call the store object.
The store object provides methods to create, modify, and delete documents.

### Syntax

```js
getStore( storeName )
```

### Parameters

`storeName`(Required - String)

- The name of the store to be loaded.

### Return value

`Store class` 객체

### Example

```js
import nicedb from "nicedb"

nicedb.define( { /* ... */ } );

const User = nicedb.getStore( "user" );
const Car = nicedb.getStore( "car" );
```

## onblocked

When the app is already running, when running the app in a new tab,
Block the library operation in the app in the new tab and call the `onblocked` event.

Handling the `onblocked` of **IndexedDB**. [link](https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onblocked)

### Syntax

```js
nicedb.onblocked = callback;
```

# API `Store class`

## `find()`

Retrieve all documents corresponding to the query.

### Syntax

```js
find()
find( query )
find( query, options )
```

### Parameters

`query`(Optional - Object)

- Object of `{ field_name1 : value || operator, field_name2 : value || operator, ... }`.
- If omitted, all documents in the store are returned.
- Support for comparison query operators. [link](#comparison-query-operators)

`options`(Optional - Object):

- `sort`(Object || Array)
  - Defines the sorting of the result documents list.
  - `{ field_name1 : number, field_name2 : number }` 형식.
    - number `1`: Ascending
    - number `-1`: Descending
- `skip`(Number)
  - Set the quantity to be omitted from the front of the result value.
- `limit`(Number)
  - Setting the maximum quantity of result values.

> It tries to sort the result list according to the order in which `sort` objects are defined.
>
> In general, modern browsers can detect the order in which objects are defined, but it is not perfect.
>
> In this case, it can be solved by defining `sort` as a two-dimensional array rather than an object.
>
> `[ ['field_name1', number], ['field_name2', number], ... ]`

### Return value

`resolve`: An array of document objects. An empty array if there are no results.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

// Suppose, have the following data in FooStore:
//   { _id: 1, bar: 10, foo: 1 }
//   { _id: 2, bar: 10, foo: 2 }
//   { _id: 3, bar: 22, foo: 3 }
//   { _id: 4, bar: 10, foo: 1 }
//   { _id: 5, bar: 10, foo: 2 }
//   { _id: 6, bar: 33, foo: 3 }
//   { _id: 7, bar: 10, foo: 1 }
//   { _id: 8, bar: 10, foo: 2 }
//   { _id: 9, bar: 44, foo: 3 }
//  { _id: 10, bar: 10, foo: 1 }

const query = {
  _id: { $lte: 9 },
  bar: 10
};
const options = {
  sort: { foo: 1, _id: -1 },
  skip: 1,
  limit: 4
};
FooStore.find( query, options ).then( result => console.log(result) );
// [
//   { _id: 4, bar: 10, foo: 1 },
//   { _id: 1, bar: 10, foo: 1 },
//   { _id: 8, bar: 10, foo: 2 },
//   { _id: 5, bar: 10, foo: 2 },
// ]
```

## `findOne()`

Retrieve one document corresponding to the query.

### Syntax

```js
findOne()
findOne( query )
```

### Parameters

`query`(Optional - Object)

- If omitted, the document with the lowest `_id` value.

### Return value

`resolve`: Document object. If there is no result value, `undefined`.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

// Retrieves and returns documents with bar value of 100 among
// the documents stored in the foo repository.
FooStore.findOne( {bar: 100} )
  .then( result => console.log(result) ); // { _id: 33, bar: 100, ... }
```

## `count()`

Retrieve all documents count number corresponding to the query.

### Syntax

```js
count( query )
```

### Parameters

`query`(Optional - Object)

### Return value

`resolve`: The number of documents corresponding to the query.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

// Returns the number of documents with a field value of 40 or more among
// documents stored in foo store.
FooStore.count( {bar: {$gte: 40} } ); // 13
```

## `insert()`

Save the document to the store.

### Syntax

```js
insert( doc )
```

### Parameters

`doc`(Required - Object)

- The document object to be saved consisting of <br>
  `{ field_name1: value_1, field_name2: value_2, ... }`.

### Return value

`resolve`: The `_id` of the saved document. (Number)

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

const doc = {
  txt: 'text',
  num: 123,
  foo: new Date(),
  ...
};

FooStore.insert( doc ).then( result => console.log(result) ); // 93
```

## `update()`

Update the document that corresponds to the query.

### Syntax

```js
update( query, doc )
update( query, doc, change )
```

### Parameters

`query`(Required - Object)

`doc`(Required - Object)

- The document object to be saved consisting of <br>
  `{ field_name1: value_1, field_name2: value_2, ... }`.

`change`(Optional - Boolean)

- Default: `false`
- If `true`, replace the document corresponding to the query with `doc`.


### Return value

`resolve`: An array of `_id` of the updated document.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

const query = { bar: { $gte: 9 } }; // bar field value is 9 or more
const doc = { bar: 9, etc: 'love' };

// Searches the document corresponding to the query
// and updates it with the field value corresponding to doc.
FooStore.update( query, doc ).then( result => console.log(result) ); // [ 1, 5, 32, 78 ]
```

## `remove()`

Delete the document corresponding to the query.

### Syntax

```js
remove()
remove( query )
```

### Parameters

`query`(Optional - Object)

> If you omit the query, all documents in the store are deleted.
> 
> However, if you need to delete all documents, you should use `clear()` instead of `remove()` for performance reasons.

### Return value

`resolve`: none.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

const query = { bar: 9 };

FooStore.remove( query ).then( result => console.log(result) ); // undefined
```

## `clear()`

Delete all documents stored in the store.

### Syntax

```js
clear()
```

### Parameters

none.

### Return value

`resolve`: none.

`reject`: Related error event object.

### Example

```js
const FooStore = nicedb.getStore( "foo" );

FooStore.clear().then( result => console.log(result) ); // undefined
```

# Comparison query operators

**NiceDB** does not support multi-query,
but it does support some of the comparison query operators used by **MongoDB**.

| Operator       | Description       |
| :---:          | :---:             |
| `$gt`          | query <  result   |
| `$gte`         | query <= result   |
| `$lt`          | query >  result   |
| `$lte`         | query >= result   |

### Syntax

```js
import nicedb from "nicedb"

const store = { foo: ['num'] };
nicedb.define( store );

const FooStore = nicedb.getStore( "foo" );

// Function to print _id of document array
function log( docs ) {
  const ids = docs.map( v => v._id );
  console.log( ids );
}

// Suppose you have the following documents stored in a store called foo:
//
//      { _id: 1, num: 10 }
//      { _id: 2, num: 5  }
//      { _id: 3, num: 15 }
//      { _id: 4, num: 7  }
//      { _id: 5, num: 13 }

FooStore.find( {num: 5} ).then( log );           // 5 === num  →   [ 2 ]
FooStore.find( {num: { $gt: 10 }} ).then( log ); // 10 < num   →   [ 3, 5 ]
FooStore.find( {num: { $lte: 7 }} ).then( log ); // 7 >= num   →   [ 2, 4 ]
FooStore.find( {num: { $gte: 7, $lt: 15 }})
  .then( log );                      // 7 <= num && 15 > num   →   [ 1, 2, 4, 5 ]
```

> All search results are returned sorted by `_id` in ascending order.
















