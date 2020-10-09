const udb = new UDB(10,6);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
udb.sort();
console.dir(udb);