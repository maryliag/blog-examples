# Setup your application

## Database

Start a postgres instance and update its credentials on file backend/database.js

## Backend

```
cd backend
npm install
node index.js
```

## Frontend

```
cd frontend
npm install
npm start
```

Check if your application is working correctly on the browser http://localhost:3000

# OpenTelemetry instrumentation
Stop your backend server and set the environment variables.

```
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otlp-gateway-prod-us-east-0.grafana.net/otlp" <- update to your observability backend endpoint
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic O...==" <- Update to your token
export OTEL_SERVICE_NAME="user-crud-backend"
```

Restart your server with

```
node --require ./instrumentation.js index.js
```

## Check data
Go to your observability vendor and check that the data has arrived