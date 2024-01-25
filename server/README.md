# Back-end environment setup

## Step 1: Create the `.env` file

To configure the back-end environment, follow these steps:

1. Clone the `.env.template` file and rename it to `.env`.
2. Open the `.env` file and modify the necessary configurations described below.

## Step 2: Configure Discord OAuth2

OAuth2 is an authentication protocol based on a third-party engine (In this case, Discord).

To use Discord OAuth2 locally, you need to:

1. Create a Discord Developer account, based on your current account (you should have one cuz you're the member of LLC server).
2. Create a new Application in [Discord Developer Portal](https://discord.com/developers/applications).
3. Click onto your newly created app to modify a few settings. Select the `OAuth2` section.

<div style="display: flex; justify-content: center;">
    <img src="assets/DiscordDevAppbar.png" alt="Discord Developer Appbar" width="300">
</div>

4. Copy the value of "client id" and "client secret" and copy into your application. **Warning**: the client secret is shown only once after each reset.
5. Add a Redirect URL with value `http://localhost:3001/callback` in `DISCORD_REDIRECT_URI` in `.env` and Redirects in OAuth2 -> General

<div style="display: flex; justify-content: center;">
    <img src="assets/OAuth2.png" alt="OAuth2 Image">
</div>

## Step 3: Configure the remaining environment variables

For the `PORT` field, it should be the same as the port that the back-end runs on your machine (default: `3000`).

For the `TOKEN_SECRET`, put anything in. (e.g.: `eiwolxxx9000`)

For the `POSTGRES_URL`, it should be in the form of:

`postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`.

## Have fun developing! :D
