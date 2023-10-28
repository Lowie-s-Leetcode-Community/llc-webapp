# LLC WebApp

This is the Webapp for the Lowie's Leetcode Community.

Quick link for team members: [Trello](https://trello.com/b/uYL1a8Bd/llc-web-agile-board).

## Quick description on Architecture

My (Lowie's) plan is to combine both the front-end and back-end into one same repo, since with the current scalings, the smoothness of our team workflow should be prioritize, rather than scalings in the (far) future.

Therefore, you can find every code related to the back-end (uses ExpressJS), in `server`. All other files in the directory belongs to the front-end (which uses `ReactJS`).

I followed [this guide](https://burkeholland.dev/posts/express-react-starter-refresh/) while set up this project.

## Boot up

### 0. First time installation/pulling new feature
```
cd server
npm i
cd ..
npm i
```
### 1. Start the back-end

```
cd server
npm start
```

Verify initiation successfully: [localhost:3000](http://localhost:3000)

### 2. Start the front-end
```
npm start
```
Verify initiation successfully: [localhost:3001](http://localhost:3001)

**Notes** (on Ports): I added `PORT` environment variable in the `start` script for the front-end. If it works, you can start both modules in any order. But in case it doesn't (usually, causing the back-end can't start), you should stop any process on port 3000, and start the back-end first, before starting the front-end.

### 3. Update new code

Hot-reload is implemented in the React module in this project, so any changes on the UI level is updated immediately. Only if you had just installed new modules, you'll have to restart this module.

The Express back-end, however, haven't got it (yet). So, restart it after an update.

## Linting & Clean code & Workflow

Linting is enforced on all front-end code and adhere to the [AirBNB guidelines](https://airbnb.io/javascript/). Or, their [github link](https://github.com/airbnb/javascript).

The branch `main` (on remote) will be locked so you can't commit to it directly. Please, check out to your own branch and create pull request. The best: one branch/one feature. :)

### Have fun developing! :D
