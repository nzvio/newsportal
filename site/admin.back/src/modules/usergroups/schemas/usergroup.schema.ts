import * as mongoose from 'mongoose';

export const UsergroupSchema = new mongoose.Schema ({        
    name: {
        type: String,
        required: true,
        unique: true,
    },
    title: String,
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});