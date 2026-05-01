import { Schema, model, models, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  id?: string;
  eventId: Types.ObjectId;
  slug: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event id is required'],
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Event slug is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });
BookingSchema.index({ slug: 1, createdAt: -1 });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
