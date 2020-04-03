import * as mongoose from 'mongoose';

export const ArticleVoteSchema = new mongoose.Schema ({        
    article: {
        type: String,
        required: true        
    },
    user: {
        type: String,
        required: true        
    }
});
