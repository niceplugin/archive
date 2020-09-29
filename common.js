const udb = new UDB(0,9,6);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
console.dir(udb);