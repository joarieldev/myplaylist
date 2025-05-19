import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  uid: string
  name: string
  email: string
}

const userSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
