import * as mongoose from 'mongoose';

export const LangSchema = new mongoose.Schema ({        
    name: {
        type: String,
        required: true,        
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,        
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,        
    }, 
    img: String,
    img_s: String,
    pos: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    sluggable: {
        type: Boolean,
        required: true,
        default: false
    },
    dir: {
        type: String,
        required: true,
        default: "ltr"
    },    
    defended: {
        type: Boolean,
        required: true,
        default: false
    },
    phrases: {
        type: [{
            text: {
                type: String,
                trim: true
            },
            mark: {
                type: String,
                trim: true
            },
            note: {
                type: String, 
                trim: true
            },
            pos : {
                type: Number,
                required: true,
                default: 0
            }
        }],
        required: true
    }
}, 
{minimize: false}); // use minimize=false to prevent "undefined" values instead of empty "phrases" parameter
