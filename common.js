const udb = new UDB(8,6);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
udb.sort();
console.dir(udb);
// console.dir(udb.db.get(5));
// test(udb.db.get(5)[404].log);

function test(arr) {
  arr.forEach((cur, i, a)=>{
    a[i] = cur.split('-').map((cur, i, a)=>{
      return a[i] = JSON.parse(`[${cur}]`);
    });
  });

  console.log(arr)
  arr.forEach((cur)=>{
    const x = cur[0][0];
    const reg = new RegExp(`(\\s+\\-*[0-9]+\\,){${x}}`, 'g');
    let str = cur[1].toString();
    str = ' ' + str;
    str = str.replace(/\,/g, ', ');
    str = str.replace(/\s[0-9]{2}/g, ' $&');
    str = str.replace(/(\s[0-9]{1}\,)|(\s[0-9]{1})$/g, '  $&');
    str = str.replace(/\s\-[0-9]{1}\,/g, ' $&');
    str = str.replace(reg, '$&\n');
    str = str.replace(/\,\n/g, '\n');
    str = str.replace(/\,/g, '');
    console.log(str);
  });
}