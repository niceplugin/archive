export const user = {
  /// ...
  avatar: String, // base64
  level: Number, // 0: admin, 1: user
}

export const rooms = {
  _id: String,
  lastUserId: String,
  lastUserName: String,
  lastUserAvatar: String,
  lastMessage: String,
  updatedAt: Date,
  joiner: Array( /* userId */ ),
}

export const messages = {
  _id: String,
  roomId: String,
  userId: String,
  username:String,
  userAvatar: String,
  userLevel: Number,
  createdAt: Date,
  message: String,
}

export const read = {
  _id: String,
  userId: String,
  roomId: String,
  lastAt: Date,
  updatedAt: Date,
}