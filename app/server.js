'use strict';

var config = require('../config/config');
//import author from '../config/author';
var routes = require('./routes');

const Hapi = require('hapi');   
const server = new Hapi.Server();
const req = require('request');
const Joi = require('joi');
const author = require('../config/author');

// ----------------------------
// Setup configuration settings
// ----------------------------
var connecParams = (config.env === 'production')  ?   { port: process.env.PORT, routes: { cors: true } }
                : {port: config.port, host:config.host, routes: { cors: true }};

// ------------------
// configure the port
// ------------------
server.connection(connecParams);

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
                //helpersPath: 'views/helpers',
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