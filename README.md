# Otherhalf Nest
## Initial setup

The assumption is that you have already ran the docker compose file that is ouside of this folder. So you should have the containers running.

Now, for the steps:
- Go inside **"otherhalf-db"** container
- Create a new postgresql DB named "otherhalf-nest"(You can choose a different name, just make sure you update the env file as well)
- Open a terminal inside the docker container "otherhalf-nest"
- Run ```npm run init```
- Wait for the migrations and seeders to finish
- Now you can choose any of the users in the users table, and log in with its default password **123456**

## Migrations
### Creating Migrations
- Go into the "otherhalf-nest" container
- run npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/YourMigrationName
- Other option(not always working) - run ```npm run migration:generate --name=<your_migration_name>```

### Running Migrations
- Go into the "otherhalf-nest" container
- run ```npm run migrate```