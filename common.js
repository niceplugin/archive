const udb = new UDB(5,5);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
udb.sort();
console.dir(udb);