const express = require('express');
const router = express.Router()
const Review = require('../db/models/review')

// GET - /api/reviews
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll()
    res.json(allReviews)
  } catch (err) { next(err) }
})

// GET /api/review/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleReview = await Review.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(singleReview)
  } catch (err) { next(err) }
})

// POST /api/review
// router.post('/', async (req, res, next) => {
//   try {
//     const createdReview = await Review.create({
//       content: req.body.content,
//       rating: req.body.rating
//     })
//     res.json(createdReview)
//   } catch (err) { next(err) }
// })

module.exports = router
