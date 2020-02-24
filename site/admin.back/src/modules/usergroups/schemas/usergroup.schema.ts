import * as mongoose from 'mongoose';

export const UsergroupSchema = new mongoose.Schema ({        
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});