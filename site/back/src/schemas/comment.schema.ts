import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const CommentSchema = new mongoose.Schema ({        
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    article: {
        type: ObjectId,
        ref: "Article"
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
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
