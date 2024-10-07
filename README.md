# tamagotchiAPI

tamagotchiAPI is a simple API made with express used to power a community tamagotchi. This is a supplementary project to [website](https://github.com/psikoo/website).

## Running the API

**Usage information:**

This script runs with Node.js and npm. To run the script you must install Node.js and npm.

**Before running:**

- You need to install the needed dependencies by running the following command:

```bash
npm install
```

### Actually running the API

**start.cmd:**

It starts the proxy server on port 3000.
```bash
.\start.cmd
```

## API routs

### GET:
- /getTamagotchi > returns a json containing the tamagotchi's information.
- /play > increases the tamagotchi's hapiness and reduces it's energy.
- /feed > increases the tamagotchi's food (hunger) and increases it's energy.
- /rest > increases the tamagotchi's energy and reduces it's food (hunger).

### POST:
- /postTamagotchi > post a tamagotchi in a json format.
- /reload > recalculates the tamagotchi's stats since the last update.
