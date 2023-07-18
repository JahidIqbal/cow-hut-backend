import mongoose, { Document } from 'mongoose';
import { Admin, Name } from './admin.interface';

const adminSchema = new mongoose.Schema<Admin & Document>({
  role: {
    type: String,
    enum: ['admin'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:0
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const AdminModel = mongoose.model<Admin & Document>('Admin', adminSchema);

export default AdminModel;
