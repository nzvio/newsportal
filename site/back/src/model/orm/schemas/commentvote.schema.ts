import * as mongoose from 'mongoose';

export const CommentVoteSchema = new mongoose.Schema ({        
    comment: {
        type: String,
        required: true        
    },
    user: {
        type: String,
        required: true        
    }
});
