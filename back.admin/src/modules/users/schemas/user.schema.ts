import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema ({        
    name: {
        type: String,
        required: true,                
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,        
    }, 
    password: {
        type: String,
        required: true        
    },
    img: String,
    img_s: String,
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    usergroup: {
        type: String,
        required: true,
        default: "default"
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
