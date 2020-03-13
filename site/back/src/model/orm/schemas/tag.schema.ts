import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const TagSchema = new mongoose.Schema ({
    name: {
        type: String,        
        trim: true,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },  
    lang: {
        type: ObjectId,
        required: true
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
