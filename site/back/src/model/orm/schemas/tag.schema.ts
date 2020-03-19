import * as mongoose from 'mongoose';

const Mixed = mongoose.Schema.Types.Mixed;

export const TagSchema = new mongoose.Schema ({
    name: {
        type: Mixed,
        required: true,
        default: {}
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },  
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
}, {minimize: false}); // use minimize=false to prevent "undefined" values instead of empty multilingual parameters
