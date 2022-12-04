window.nicedb = nicedb;
nicedb.onblocked = ()=>console.log('blocked');

nicedb.define({
   test: [ {name: 'a',multiEntry: true}, 'b', 'c' ]
});

(() => {
   window.test = nicedb.getStore('test');

   test.clear();

   test.insert({ a: 1, b: 1, c: 1, d: 1 });
   test.insert({ a: 2, b: 2, c: 2, d: true });
   test.insert({ a: 3, b: 1, c: 3, d: 2 });
   test.insert({ a: 4, b: 2, c: 1, d: 'x' });
   test.insert({ a: 5, b: 1, c: 2, d: 3 });
   test.insert({ a: 6, b: 2, c: 3, d: new Date(999) });
   test.insert({ a: 7, b: 1, c: 1, d: {$:null} });
   test.insert({ a: 8, b: 2, c: 2, d: new Date(9999) });
   test.insert({ a: 9, b: 1, c: 3, d: [1,2,3] });
   test.insert({ a: 10, b: 1, c: 3, d: NaN });
   test.insert({ a: 11, b: 1, c: 3, d: [1,2] });
   test.insert({ a: 12, b: 1, c: 3, d: false });
   test.insert({ a: 13, b: 1, c: 3, d: null });
   test.insert({ a: 14, b: 1, c: 3, d: 'a' });
   test.insert({ a: 15, b: 1, c: 3 });
})();

test.find({}, {
  limit: 6,
  skip: 1,
  sort: {
    b: 1,
    d: -1
  }
}).then(r=>console.log('find: ',r))

test.findOne({a:{$gt:3}}).then(r=>console.log('findOne: ',r))

test.count({b:2}).then(r=>console.log('count: ',r))

test.remove({a: {$gt:7, $lte:10}}).then(r=>console.log('remove: ',r))

test.update({b: 2}, {z:'xxx'}, true).then(r=>console.log('update: ',r))