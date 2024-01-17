const jwt = require('jsonwebtoken');
const { getUser } = require('../controllers/userController');

function authFilter(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {

    if (err) {
      console.log("Error while verifying JWT token", err)
      return res.sendStatus(403)
    }

    req.discordId = decoded.discordId

    next()
  })
}

const checkUser = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    if (user.discordId === req.discordId) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = {authFilter, checkUser};