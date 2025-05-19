import { IList } from '@/interfaces/List';
import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IFavorite extends Document {
  uid: string;
  name: string;
  list: IList[];
}

const favoriteSchema = new Schema<IFavorite>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  list: {
    type: [{}],
    required: false,
    default: [],
  }
});

const Favorite: Model<IFavorite> = mongoose.models.Favorite ||
  mongoose.model<IFavorite>('Favorite', favoriteSchema);

export default Favorite;