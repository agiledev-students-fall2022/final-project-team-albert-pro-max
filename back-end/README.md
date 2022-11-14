# Albert Pro Max Backend

## Run the back-end

Navigate into the `back-end` directory and...

### Setup environmental variables

Create the `.env` file in the `back-end` directory, using the sample `.env` file posted in the [Discord channel](https://discord.com/channels/1014892476584165470/1031969758838530088/1041570759878914108).

### Install dependencies

```bash
npm install
```

### Install nodemon

Use the `-g` flag to install nodemon globally:

```bash
npm install -g nodemon
```

### Start the back-end app

Start the express server using `nodemon`:

```bash
nodemon app.js
```

The back-end will run at port 3001.

### Test the back-end app

Run unit tests:

```bash
npx mocha
```

Run code coverage:

```bash
npx nyc mocha
```
