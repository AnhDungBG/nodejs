import mongoose from "mongoose";

const schemaProducts = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
}, {
    timestamps: true,
    versionKey: false
});
const Products = mongoose.model("Products", schemaProducts);
export default Products