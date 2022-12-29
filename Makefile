# Essential Commands

# When first running this project, the builder image must be ran first.
builder:
	docker compose --file=docker-compose.init.yml build

build-dev:
	docker compose up --build

dev:
	docker compose up

build-prod:
	docker compose -f docker-compose.prod.yml up --build

prod:
	docker compose -f docker-compose.prod.yml up

into-commonwealth:
	docker exec -it commonwealth-commonwealth-1 sh 

into-chain-events:
	docker exec -it commonwealth-chain-events-1 sh

into-db:
	docker exec -it commonwealth-db-1 sh

# DB Commands
#
# N.B. If your DB is ever broken, run these commands against the running 
# commonwealth container in order to reconstruct:
# 1. make reset-db
# 2. make migrate-db
# 3. make load-db
# 4. make migrate-db

reset-db:
	docker exec -it commonwealth-commonwealth-1 sh -c "psql -h db -d postgres -U commonwealth -c 'DROP DATABASE commonwealth WITH (FORCE);'"

create-db:
	docker exec -it commonwealth-commonwealth-1 sh -c "psql -h db -d postgres -U commonwealth -c 'CREATE DATABASE commonwealth;'"

load-db:
	docker exec -it commonwealth-commonwealth-1 sh -c "psql -h db -d commonwealth -U commonwealth -W -f ./packages/commonwealth/latest.dump"

migrate-db:
	docker exec -it commonwealth-commonwealth-1 sh -c "yarn migrate-db"

dump-db:
	docker exec -it commonwealth-commonwealth-1 sh -c "pg_dump -h db $(heroku config:get HEROKU_DB_URI -a commonwealthapp) --verbose --exclude-table-data=\"public.\\\"Subscriptions\\\"\" --exclude-table-data=\"public.\\\"Sessions\\\"\" --exclude-table-data=\"public.\\\"DiscussionDrafts\\\"\" --exclude-table-data=\"public.\\\"LoginTokens\\\"\" --exclude-table-data=\"public.\\\"Notifications\\\"\" --exclude-table-data=\"public.\\\"SocialAccounts\\\"\" --exclude-table-data=\"public.\\\"Webhooks\\\"\" --exclude-table-data=\"public.\\\"NotificationsRead\\\"\" --no-privileges --no-owner -f latest.dump"

# Test Commands
test-api:
	docker exec -it commonwealth-commonwealth-1 sh -c "yarn test-api"
