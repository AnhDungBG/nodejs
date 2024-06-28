import mongoose from "mongoose";

const schemaCategory = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});
const Category = mongoose.model("Category", schemaCategory);
export default Category