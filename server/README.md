# Discord OAuth2 Instructions

OAuth2 is an authentication protocol based on a third-party engine (In this case, Discord).

To use Discord OAuth2 locally, you need to:

1. Create a Discord Developer account, based on your current account (you should have one cuz you're the member of LLC server).
2. Create a new Application in Discord Developer UI.
3. Click onto your newly created app to modify a few settings. Select the `OAuth2` section.
![DiscordDevAppbar.png](assets/DiscordDevAppbar.png)
4. Copy the value of "client id" and "client secret" and copy into your application. **Warning**: the client secret is shown only once after each reset.
5. Add a Redirect URL with value `http://localhost:3001/callback` in `DISCORD_REDIRECT_URI` in `.env` and Redirects in OAuth2 -> General
![OAuth2.png](assets/OAuth2.png)

For the `PORT` field, should be the same as the port that the back-end run on your machine (default: `3000`).

For the `TOKEN_SECRET`, put anything in. (e.g.: "eiwolxxx9000")

For the `POSTGRES_URL`, should be in the form of:

`postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`.

## Have fun developing! :D
