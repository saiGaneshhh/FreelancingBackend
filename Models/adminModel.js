import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String }, // New field for reset token
    resetPasswordExpires: { type: Date }, // New field for token expiration
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User; // This is the default export
