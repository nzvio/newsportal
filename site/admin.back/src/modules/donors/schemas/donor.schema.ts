import * as mongoose from 'mongoose';

export const DonorSchema = new mongoose.Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    encoding: {
        type: String,
        trim: true,
        required: true,
        default: "utf-8",
    },
    selector_content: {
        type: String,
        trim: true,
    },
    selector_img: {
        type: String,
        trim: true,
    },
    defended: {
        type: Boolean,
        required: true,
        default: false
    }
});
       