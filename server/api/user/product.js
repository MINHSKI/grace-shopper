const express = require('express');
const router = express.Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')


router.get('/', async (req, res, next) => {
    try {
      const allProducts = await Product.findAll({
        include: [{model: Category}]
      })
      res.json(allProducts)
    } catch (err) {
      next(err)
    }
  })
  
  router.get('/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const foundProduct = await Product.findById(id)
      res.json(foundProduct)
    } catch (err) {
      next(err)
    }
  })