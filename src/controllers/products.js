import Category from '../models/categories.js';
import Products from '../models/products.js';
import productValid from './../validation/product.js';

const getAll = async (req, res) => {
    try {
        const products = await Products.find();
        if (products.length === 0) {
            res.status(404).json({
                message: "Not found products",
            });
        }
        return res.status(200).json({
            message: "Get successful products",
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const getDetail = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Not found product",
            });
        }
        return res.status(200).json({
            message: "Get successful products",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

const create = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body);
        if (error) {
            return res.status(500).json({
                message: error.details[0].message
            });
        }
        const product = await Products.create(req.body);
        if (!product) {
            return res.status(400).json({
                message: "Product creation failed",
            });
        }
        const updateCategory = await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                productId: product._id
            }
        })
        if (!updateCategory) {
            return res.status(400).json({
                message: "can't add category"
            })
        }
        return res.status(201).json({
            message: "Successfully created product",
            data: product,
        });


    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

const update = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            return res.status(500).json({
                message: error.details[0].message
            });
        }
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!product) {
            return res.status(400).json({
                message: "Product update failed",
            });
        }
        return res.status(201).json({
            message: "Successfully update product",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

}
const remove = async (req, res) => {
    const data = await Products.findByIdAndDelete(req.params.id)
    if (!data) {
        return res.status(400).json({
            message: "Product delete failed"
        })
    }
    return res.status(201).json({
        message: "Successfully delete product"
    })
}

export { getAll, getDetail, create, update, remove }
