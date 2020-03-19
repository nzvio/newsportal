import * as mongoose from 'mongoose';

export const VoteSchema = new mongoose.Schema ({        
    article: {
        type: String,
        required: true        
    },
    user: {
        type: String,
        required: true        
    }
});
