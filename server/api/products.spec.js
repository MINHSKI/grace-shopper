
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET ROUTES', () => {
    const sampleProduct = {
      title: 'Prius',
      description: 'fastest car alive',
      price: 10.5,
      inventoryQuantity: 1,
      photo: 'photoTest',
      averageRating: 3.5
    }

    beforeEach(() => {
      return Product.create(sampleProduct)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('Prius')
        })
    })

    it('GET /api/products/:id', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal('Prius')
        })
    })

  })
})
