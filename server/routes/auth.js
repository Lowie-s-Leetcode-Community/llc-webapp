const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { getUserIdFromDiscordId } = require('../controllers/userController');

const router = express.Router();

require('dotenv').config();

async function generateAccessToken(discordId) {
  return jwt.sign({
    discordId,
  }, process.env.TOKEN_SECRET);
}

router.get('/discord/login', (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&scope=identify+guilds.members.read`;

  res.redirect(url);
});

router.post('/discord/callback', async (request, response) => {
  const { code } = request.body;
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/x-www-form-urlencoded',
  };

  try {
    const res = await axios.post(
      'https://discord.com/api/oauth2/token',
      params,
      {
        headers,
      },
    );
    const { access_token } = res.data;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...headers,
      },
    });

    const token = await generateAccessToken(userResponse.data.id);
    const userId = await getUserIdFromDiscordId(userResponse.data.id);
    response.json({token, access_token, user_id: userId, discord_id:  userResponse.data.id, username: userResponse.data.username, avatar: userResponse.data.avatar});
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;
