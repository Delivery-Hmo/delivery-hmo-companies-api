import { Schema, model, SchemaOptions } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile } from '../constants';
import { UserSeller } from '../interfaces';

const schema = new Schema<UserSeller>(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true, maxlength },
    email: { type: String, required: true, maxlength, unique: true },
    phone: { type: Number, required: true, maxlength: 10, minlength: 10 }, 
    active: { type: Boolean, required: true, default: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice', required: true },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin', required: true },
    description: { type: String },
    image: { type: String, maxlength: maxlengthImage, default: urlImageDefaultProfile },
    role: { type: String, required: true, maxlength: 13 }
  }, 
  optionsModel as SchemaOptions<UserSeller>
);

export default model<UserSeller>('UserSeller', schema);
