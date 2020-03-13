import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const TargetSchema = new mongoose.Schema ({            
    donor: {
        type: ObjectId,
        ref: "Donor",
        required: true
    },
    rss: {
        type: String,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    lang: {
        type: ObjectId,
        ref: "Lang",
        required: true
    },    
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});