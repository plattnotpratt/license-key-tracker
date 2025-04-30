const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  res.json({message: "This is a product"})  
});

router.get('/:id', async (req, res) => {
  res.json({message: "this is a product"})
});

router.post('/', async (req, res, next) => {
  res.json({message: "this is a product"})

});

router.put('/:id', async (req, res, next) => {
  res.json({message: "this is a product"})

});
  

router.delete('/:id', async (req, res, next) => {
  res.json({message: "this is a product"})

});

module.exports = router;
