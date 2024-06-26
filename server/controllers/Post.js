// Imports
const url = require('url');
const query = require('querystring');
const models = require('../models');

const { Post } = models;

const homePage = async (req, res) => {
  res.render('home');
};

const creatorPage = async (req, res) => {
  res.render('creator');
};

const makePost = async (req, res) => {
  // Check if the post has a title, an author, genres, or a body
  if (!req.body.title || !req.body.author || !req.body.body || !req.body.background) {
    return res.status(400).json({ error: 'A title, author, genre, and body is required' });
  }

  // Create the post data
  const postData = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    background: req.body.background,
    id: Math.floor(Math.random() * 1000000),
  };

  let posts = null;

  // Compare posts
  try {
    // Try to get the posts for the account id
    posts = await Post.find().select('title author id').lean().exec();
  } catch (err) {
    // Log any errors and return a status code
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving posts!' });
  }

  // Check if the title is unique
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === postData.title) {
      return res.status(400).json({ error: 'The title is already taken.' });
    }
  }

  // Check if the id is unique
  let uniqueID = false;
  while (!uniqueID) {
    // If there are no posts, the unique ID is guaranteed
    if (posts.length === 0) {
      uniqueID = true;
    }

    // Compare IDs
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postData.id) {
        uniqueID = false;
      } else {
        uniqueID = true;
      }
    }

    // Set a new id
    postData.id = Math.floor(Math.random() * 10000);
  }

  try {
    // Create and save the post using the data and the post model
    const newPost = new Post(postData);
    await newPost.save();

    // Once complete, redirect to the maker page
    return res.status(201).json(
      {
        title: newPost.title,
        author: newPost.author,
        message: 'Submitted post!'
      },
    );
  } catch (err) {
    // If there's an error, log it
    console.log(err);

    // If the post already exists, then return a status code
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Post already exists!' });
    }

    // Return a general status code
    return res.status(500).json({ error: 'An error occurred making a Post!' });
  }
};

const getPosts = async (req, res) => {
  try {
    // Try to get the posts for the account id
    const docs = await Post.find().select('title body author background id').lean().exec();

    // Only return public posts
    return res.json({ posts: docs });
  } catch (err) {
    // Log any errors and return a status code
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving posts!' });
  }
};

const getPost = async (req, res) => {
  const parsedURL = url.parse(req.url);
  const params = query.parse(parsedURL.query);

  try {
    let postQuery;
    if (params.owner) {
      postQuery = { id: params.id, owner: params.owner };
    } else {
      postQuery = { id: params.id };
    }
    const docs = await Post.find(postQuery).select('title body author background id').lean().exec();

    if (params.owner) {
      if (params.owner === req.session.account._id) {
        docs[0].isCurrentUser = true;
      } else {
        docs[0].isCurrentUser = false;
      }
    }

    // Return the post in a json
    return res.json({ post: docs });
  } catch (err) {
    // Log any errors and return a status code
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving posts!' });
  }
};

// Exports
module.exports = {
  homePage,
  creatorPage,
  makePost,
  getPosts,
  getPost,
};
