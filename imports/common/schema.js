import SimpleSchema from 'simpl-schema'

const Schema = {
  ShortUrl: new SimpleSchema({
    url: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      label: '올바른 URL 형식이 아닙니다.'
    },
    zip: {type: String}
  }),
  ChatText: new SimpleSchema({
    createdAt: {
      type: Date,
      autoValue: function(){
        // 이 앱에서는 활용하지 않지만 $set에 의해 문서를 수정할 경우
        // 해당 문서에 createdAt 필드가 없을 경우.
        // clean() 메서드에 의해 값이 입력됨을 방지하기 위한 로직 (예시)
        return this.isModifier ? undefined : new Date();
      }},
    notice: {type: Boolean, defaultValue: false},
    id: {type: String, defaultValue: ''},
    name: {type: String, defaultValue: ''},
    text: {type: String}
  }),
  Guest: new SimpleSchema({
    id: {type: String},
    name: {type: String},
    count: {type: SimpleSchema.Integer}
  })
};

// 생성/수정 할 문서의 무결설 확인 후 문서 리턴
//   name: 컬렉션명, doc: 문서
//   생성의 경우 누락된 필드는 자동완성 됨 (설정한 경우)
export default function a(name, doc) {
  const scm = Schema[name];

  if (!scm) {
    throw new Meteor.Error(`ServerError', 'Undefined schema: ${name}`);
  }

  const option = { modifier: '$set' in doc };
  doc = scm.clean(doc);

  try {scm.validate(doc, option); }
  catch (e) {throw new Meteor.Error(e.errorType, e.error, e.details); }

  return doc;
}