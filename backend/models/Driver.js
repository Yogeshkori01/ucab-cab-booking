import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cabDetails: {
      plateNumber: { type: String, required: true },
      type: { type: String, enum: ['Mini', 'Sedan', 'SUV'], required: true },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0], // Longitude, Latitude
      },
      address: {
        type: String,
      }
    }
  },
  { timestamps: true }
);

// Important for geo-queries
driverSchema.index({ location: '2dsphere' });

driverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
