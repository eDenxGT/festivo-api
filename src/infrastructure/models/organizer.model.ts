import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { IOrganizer } from '../../domain/entities/organizer.entity';

export interface IOrganizerModel extends Omit<IOrganizer, 'id'>, Document {
  _id: ObjectId;
}

const organizerSchema = new Schema<IOrganizerModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_company: { type: Boolean, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export const OrganizerModel = mongoose.model<IOrganizerModel>(
  'Organizer',
  organizerSchema
);
