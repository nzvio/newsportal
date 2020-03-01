import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const TargetSchema = new mongoose.Schema ({            
    donor: {
        type: ObjectId,
        ref: "Donor"
    },
    rss: {
        type: String,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    lang: {
        type: ObjectId,
        ref: "Lang"
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