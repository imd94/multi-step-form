const apiRouter = require('express').Router();
const userController = require('./controllers/userController');
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000', 'https://imd94.github.io'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

apiRouter.use(cors(corsOptions));

apiRouter.get('/', (req, res) => res.json('Hello, from backend!'));
apiRouter.post('/register', userController.apiRegister);

module.exports = apiRouter;