'use strict';

import routes from './routes';

const Hapi = require('hapi');   
const server = new Hapi.Server();   
const Path = require('path');
const Hoek = require('hoek');

const thisPort = 3000;              

// ------------------
// Configure the port
// ------------------
server.connection({
    host: 'localhost', 
    port: thisPort
});

// -------------------------
// Configure the view engine
// -------------------------
const start = async () => {
    server.register(
        [  
            {
              register: require('vision')  // add template rendering support in hapi
            },
            {
              register: require('inert')  // handle static files and directories in hapi
            }
        ], 
        function(error) {
            if (error) { throw error; }

            // set view configuration in plugin register callback
            server.views({  
                engines: {
                    html: require('handlebars')
                },
                relativeTo: __dirname,
                path: '../views',
                layoutPath: '../views/layout',
                layout: 'default',
                //helpersPath: 'views/helpers',
                //partialsPath: 'views/partials'
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
    console.log(`App running on port ${thisPort}...`);
});
