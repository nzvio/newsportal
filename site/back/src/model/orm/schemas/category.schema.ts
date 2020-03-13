import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

export const CategorySchema = new mongoose.Schema ({        
    name: {
        type: Mixed,
        required: true,
        default: {}
    },
    h1: {
        type: Mixed,
        required: true,
        default: {}
    },
    contentshort: {
        type: Mixed,
        required: true,
        default: {}
    },
    content: {
        type: Mixed,
        required: true,
        default: {}
    },
    title: {
        type: Mixed,
        required: true,
        default: {}
    },
    keywords: {
        type: Mixed,
        required: true,
        default: {}
    },
    description: {
        type: Mixed,
        required: true,
        default: {}
    },
    img: String,
    img_s: String,
    parent: ObjectId,
    slug: {
        type: String,
        trim: true,        
        unique: true,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
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
}, 
{minimize: false}); // use minimize=false to prevent "undefined" values instead of empty multilingual parameters
