const apiRouter = require('express').Router();
const userController = require('./controllers/userController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res) => res.json('Hello, from backend!'));
apiRouter.post('/register', userController.apiRegister);

module.exports = apiRouter;