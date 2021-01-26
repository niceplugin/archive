import Collections from '/imports/common/collections'
import Validation from '/imports/common/schema'
import digits from '/imports/server/62digits'

Meteor.methods({
  addGuest(id) {
    const options = { sort: { count: -1 } };
    let { count } = Collections.Guest.findOne({}, options) || {};
    count = count ? ++count : 1;

    const name = `손님${count}`;
    let doc = { id, count, name };

    doc = Validation('Guest', doc);

    Meteor.call('addNotice', `${name} 님이 방에 입장`);
    Collections.Guest.insert(doc);
  },
  removeGuest(id) {
    const { name } = Collections.Guest.findOne({ id }) || {};

    Meteor.call('addNotice', `${name} 님이 방에서 퇴장`);
    Collections.Guest.remove({ id });
  },
  changeGuestName(id, name, old_name){
    const already = Collections.Guest.findOne({ name });

    if (!already) {
      const text = `${old_name} 님이 ${name} (으)로 이름 변경`;
      let doc = { $set: { name } };
      doc = Validation('Guest', doc);

      Meteor.call('addNotice', text);
      Collections.Guest.update({ id }, doc);
      return;
    }
    throw new Meteor.Error('변경불가', '이미 사용중인 이름입니다.');
  },

  addMsg(text) {
    const id = this.connection.id;
    const { name } = Collections.Guest.findOne({ id });
    let doc = { id, name, text };
    doc = Validation('ChatText', doc);

    Collections.ChatText.insert(doc);
  },
  addNotice(text) {
    let doc = { notice:true, text };
    doc = Validation('ChatText', doc);

    Collections.ChatText.insert(doc);
  },

  getUrl(code) {
    return Collections.ShortUrl.findOne({ code });
  },
  zipUrl(url) {
    let { zip } = Collections.ShortUrl.findOne({ url }) || {};

    if (zip) {return zip; }

    let doc = { url, zip: digits(+new Date()) };
    doc = Validation('ShortUrl', doc);
    Collections.ShortUrl.insert(doc);

    return doc.zip;
  }
});