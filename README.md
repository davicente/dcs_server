# dcs_server
Metric logging and reporting service that sums metrics by time window for the most
recent hour

## Common setup
Clone the repo and install the dependencies.

```bash
git clone https://github.com/davicente/dcs_server.git
cd dcs_server
```

```bash
npm install
```

## Running server
```bash
npm run start
```

## Launching unit tests
```bash
npm run test
```

A folder called coverage appears with an index.html file with the coverage.

## Configuration
Some values of the server are configurable in .env file, like port (SERVER_PORT), logs file and folder (LOGS_FILE_NAME and LOGS_DIR_NAME), time that metrics are in the server (SECONDS_TO_REMOVE_METRIC)
