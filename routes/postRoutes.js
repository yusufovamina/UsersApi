const express = require('express');
const Post = require('../models/post'); 
const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user'); 
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving posts', error: err });
  }
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The post created
 */
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ message: 'Title, content, and userId are required' });
  }

  try {
    const newPost = new Post({ title, content, user: userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
});

module.exports = router;
