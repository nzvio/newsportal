import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const ParseerrorSchema = new mongoose.Schema ({                
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },   
    target: {
        type: ObjectId,
        ref: "Target"        
    },
    message: String,    
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
