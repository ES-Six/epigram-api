## Backend EPIGram

### Project description

Epigram is a simple project that consists of merging an instagram-like with a chat system, allowing users to chat live about their latest posts and thus create a chat room linked to a category.

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

### Read the doc online using github pages

Just click this link :

[https://es-six.github.io/epigram-api/](https://es-six.github.io/epigram-api/)
    
### Generate documentation

    npm install -g apidoc http-server
    apidoc -i routes -o docs
    cd docs && http-server -o
