const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('foods/index.ejs', {
      foods: currentUser.foods,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  res.render('foods/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    req.body.date = new Date(req.body.date)
    currentUser.foods.push(req.body)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodId)
    res.render('foods/show.ejs', {
      food,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.foods.id(req.params.foodId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.food.id(req.params.foodId)
    res.render('foods/edit.ejs', {
      food,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router