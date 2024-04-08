import mongoose, { Schema } from 'mongoose';

const TokenSchema = mongoose.Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires:300,
        default: Date.now
    }
});

export default mongoose.model('UserToken', TokenSchema);