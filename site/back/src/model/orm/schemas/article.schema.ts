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
    contentshort: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
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
    top: {
        type: Boolean,
        required: true,
        default: false,
    },
    main: {
        type: Boolean,
        required: true,
        default: false,
    }, 
    popular: {
        type: Boolean,
        required: true,
        default: false,
    }, 
    recommended: {
        type: Boolean,
        required: true,
        default: false,
    }, 
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    lang: {
        type: ObjectId,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },    
    tags: {
        type: [{
            type: ObjectId,
            ref: "Tag"
        }],        
    },
    viewsq: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    votesq: {
        type: Number,
        required: true,
        default: 0
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
