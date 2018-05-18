'use strict';

import config from '../config/config';
//import author from '../config/author';
import routes from './routes';

const Hapi = require('hapi');   
const server = new Hapi.Server();   
const Path = require('path');
const Hoek = require('hoek');

// ------------------
// Configure the port
// ------------------
server.connection({
    host: config.host, 
    port: config.port
});

// --------------------------------------
// Register and configure the view engine
// --------------------------------------
const start = async () => {
    server.register(
        [  
            {
              register: require('vision')  // add template rendering engine
            },
            {
              register: require('inert')  // handler for static files/directories
            }
        ], 
        function(error) {
            if (error) { throw error; }

            // views configuration
            server.views({  
                engines: {
                    html: require('handlebars')
                },
                relativeTo: __dirname,
                path: '../views',
                layoutPath: '../views/layout',
                layout: 'default',
                helpersPath: '../views/helpers',
                partialsPath: '../views/partials'
            });
        }
    );
};
start();


// --------------
// Load Routes
// -------------- 
routes.forEach(route => {
    console.log(`attaching ${route.path}`);
    server.route(route);
});

// ------------------
// Start The Server
// ------------------
server.start(error => {  
    if (error) {
        console.error(error);
    }
    console.log(`Server started at ${server.info.uri }`);
    console.log(`App running on port ${config.port}...`);
});
