import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const ArticleSchema = new mongoose.Schema ({        
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    contentshort: String,
    content: String,
    h1: String,
    title: String,
    keywords: String,
    description: String,
    img: String,
    img_s: String,
    slug: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    source: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },    
    category: {
        type: ObjectId
    },
    lang: {
        type: ObjectId
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
