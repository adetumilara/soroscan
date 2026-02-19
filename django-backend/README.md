# SoroScan Django Backend

REST and GraphQL API for indexing Soroban smart contract events.

## Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## Environment Variables

Create a `.env` file:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgres://user:pass@localhost:5432/soroscan
REDIS_URL=redis://localhost:6379/0

# Stellar
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
SOROSCAN_CONTRACT_ID=CCAAAA...
INDEXER_SECRET_KEY=SCXXXX...
```

## Running Celery Workers

```bash
# Start worker
celery -A soroscan worker -l info

# Start beat scheduler
celery -A soroscan beat -l info
```

## Logging and Sentry

- **Log format**: Set `LOG_FORMAT=json` to emit structured JSON logs (one JSON object per line). Omit or leave unset for human-readable logs. Each JSON line includes `timestamp`, `levelname`, `name` (logger), and `message`; ingest logs also include `request_id`, `contract_id`, and `ledger_sequence` when available.
- **Sentry**: Optional. Set `SENTRY_DSN` to enable error and performance monitoring. If unset, the application starts normally and Sentry is not initialised. Celery task failures are reported to Sentry with task name context when the integration is enabled.
- **Performance traces**: When Sentry is enabled, `SENTRY_TRACES_SAMPLE_RATE` defaults to `0.1` (10%) to control cost; set in `.env` if needed.
- **PII**: Do not log personally identifiable information. Keep log messages and structured fields free of user emails, secret keys, or other sensitive data.

## API Endpoints

- `POST /api/ingest/record/` - Record a new event
- `GET /api/events/` - List events
- `GET /api/contracts/` - List tracked contracts
- `POST /graphql/` - GraphQL endpoint
