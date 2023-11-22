const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('dotenv').config();

async function generateAccessToken(username) {
  return jwt.sign({
    username,
  }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 60 });
}

router.get('/discord/login', (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&response_type=code&scope=identify%20guilds`;

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
    // eslint-disable-next-line camelcase
    const { access_token } = res.data;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...headers,
      },
    });

    const token = await generateAccessToken(userResponse.data.username);
    console.log(token);
    response.send({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
