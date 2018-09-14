## Backend EPIGram

### Server init

Install sequelize-cli:

    npm install -g sequelize-cli

Edit Sequelize configuration in:

    config/config.json

Create the database then apply all pending migrations to create the database scheme:

    sequelize db:create
    sequelize db:migrate

### Run server

    npm start

### Enable production mode

This mode disable sequelize logging

Linux

    export NODE_ENV=production
    npm start

Windows

    set NODE_ENV=production
    npm start