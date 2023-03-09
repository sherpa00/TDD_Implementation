const express = require("express");

const router = express.Router();

const createError = require("http-errors");

// db similar collections
const products = [
    {
        id: "1",
        name: "PlayStation 5",
        inStock: false
    },
    {
        id: "2",
        name: "Steam Deck",
        inStock: true
    }
];

// GET / -> get all products
router.get("/",(req,res,next) => {
    res.json(products);
})

// GET /:id -> get by id
router.get("/:id",(req,res,next) => {
    let product = products.find((prod) => prod.id === String(req.params.id));

    if (!product) {
        return next(createError(404,"Not Found"));
    }

    res.json(product);
});


// POST / -> add product
router.post("/",(req,res,next) => {
    let {body} = req;

    if (typeof body.name !== 'string') {
        return next(createError(400,"Validation Error"))
    }

    let product = {
        id: String(+products.length+1),
        name: body.name,
        inStock: false
    }

    products.push(product);

    res.status(201).json(product);
});

module.exports = router;