// Local imports - imports controllers/index.js
const controllers = require('./controllers');

const router = (app) => {
  app.get('/getPost', controllers.Post.getPost);
  app.get('/getPosts', controllers.Post.getPosts);
  app.post('/postwork', controllers.Post.makePost);

  app.get('/creator', controllers.Post.creatorPage);
  app.get('/', controllers.Post.homePage);
};

// Exports
module.exports = router;
