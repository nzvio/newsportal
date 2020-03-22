import * as mongoose from 'mongoose';

export const UsercodeSchema = new mongoose.Schema ({        
    email: {
        type: String,
        required: true,                
        trim: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    }
});
