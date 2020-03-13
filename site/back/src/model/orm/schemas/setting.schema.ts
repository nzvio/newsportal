import * as mongoose from 'mongoose';

export const SettingSchema = new mongoose.Schema ({
    p: {
        type: String,
        trim: true
    },
    v: {
        type: String,
        trim: true
    },
    c: {
        type: String,
        trim: true
    },
    pos: {
        type: Number,
        required: true,
        default: 0
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
