import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { IEvent } from '../../domain/entities/event.entity';

export interface IEventModel extends Omit<IEvent, 'id'>, Document {
  _id: ObjectId;
}

const eventSchema = new Schema<IEventModel>(
  {
    organizer_id: { type: String, required: true, ref: 'Organizer' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    floor_details: { type: String },
    date: { type: Date, required: true },
    is_paid: { type: Boolean, required: true },
    price: { type: Number },
    food_available: { type: Boolean, required: true },
    food_options: {
      morning: { type: Boolean },
      noon: { type: Boolean },
      evening: { type: Boolean }
    },
    guests: [
      {
        email: { type: String },
        name: { type: String }
      }
    ],
    judges: [
      {
        email: { type: String },
        name: { type: String }
      }
    ],
    max_tickets: { type: Number, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

eventSchema.index({ title: 'text', location: 'text', description: 'text' });

export const EventModel = mongoose.model<IEventModel>('Event', eventSchema);
