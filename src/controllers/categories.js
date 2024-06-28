import Category from "../models/categories.js"
import categoryValid from './../validation/category.js';


const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length == 0) {
            return res.status(404).json({
                message: "Not found categories"
            })
        }
        return res.status(200).json({
            message: " Get successfully",
            data: categories
        })


    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

}
const getDetail = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: "Not found category",
            })
        }
        return res.status(200).json({
            message: "Get successful category",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

const create = async (req, res) => {
    try {
        const { error } = categoryValid.validate(req.body);
        if (error) {
            return res.status(404).json({
                message: error,
            })
        }
        const newCategory = await Category.create(req.body);
        if (!newCategory) {
            return res.status(404).json({
                message: "Can't create category"
            })
        }
        return res.status(200).json({
            message: 'Create successful',
            data: newCategory
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}
const update = async (req, res) => {
    try {
        const { error } = categoryValid.validate(res.body);
        if (error) {
            return res.status(404).json({
                message: "information error"
            })
        }
        const updateCategory = await Category.updateOne(req.params.id, res.body, { new: true });
        if (!updateCategory) {
            return res.status(404).json({
                message: " can't update category"
            })
        }
        return res.status(200).json({
            message: "update successful"
        })
    } catch (error) {
        return req.status(200).json({
            message: error
        })
    }
}
const remove = async (req, res) => {

    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        if (!data) {

        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })

    }
}

export { getAll, getDetail, create, update, remove }
