var author = require('../config/author');
var config = require('../config/config');
var req = require('request');
//const fstream = require("fs");
var Joi = require('joi');

const routes = [  
    // home 
    {
        method: 'GET',
        path: '/',
        handler: function(request, response) {
            //req(config.restURL+'pets/').pipe(fstream.createWriteStream("temp.json"));
            req(config.restURL+'pets/', function (err, resp, cont) {
                if (!err && resp.statusCode === 200) {
                    response.view('index', {status: resp.statusCode, data: JSON.parse(cont)});
                } else {
                    throw err;
                    console.log(err);
                    response.view('index', {status: resp.statusCode, data: JSON.parse(err)});
                }
            });
        }
    },
    
    // pet details
    {
        method: 'GET',
        path: '/pets/{id}/',
        handler: function(request, response) {
            //response.view('pets', {status: 0, data: 1});
            if(request.params.id > 0) {
                req(config.restURL+'pets/'+request.params.id+'/', function (err, resp, cont) {
                    if (!err && resp.statusCode === 200) {
                        //console.log({status: resp.statusCode, data: JSON.parse(cont)});
                        response.view('pets', {status: resp.statusCode, data: JSON.parse(cont)});
                    } else {
                        throw err;
                        console.log(err);
                        response.view('pets', {status: resp.statusCode, data: err});
                    }
                });
            }
        },
        config: {
            validate: {
                params: {
                    id: Joi.number().integer().min(1)
                }
            }
        }
    },
    
    // add pet
    {
        method: 'GET',
        path: '/pet/add/',
        handler: function(request, response) {
            response.view('pet', {status: 1, actionURL: config.restURL+'pets/'});
        }
    },
    
    // author
    {
        method: 'GET',
        path: '/author/',
        handler: function(request, response) {
            var data = {
                name: author.name,
                phone: author.phone,
                email: author.email
            };

            return response.view('author', data);
        }
    },
    
    // 404 handler
    {  
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: (request, response) => {
            const accept = request.raw.req.headers.accept;
            var errMessage = 'The page your are looking cannot be found!';

            // take priority: check header if there’s a JSON REST request
            if (accept && accept.match(/json/)) {
                return response(Boom.notFound(errMessage));
            }

            response.view('404', {message: errMessage}).code(404);
        }
    },
    
    // --------------------
    // Static file routes
    // ---------------------
    
    // stylesheets
    {
        method: 'GET',
        path: '/css/{style*}',
        handler: {
            directory: {
                path:    __dirname + '/../public/css',
                listing: false,
                index:   false
            }
        }
//        handler: (request, reply) => {
//            reply.file(`./public/css/${request.params.style}`);
//        }
    },
    
    // images
    {
        method: 'GET',
        path: '/images/{image*}',
        handler: {
            directory: {
                path:    __dirname + '/../public/images',
                listing: false,
                index:   false
            }
        }
    },

    // scripts
    {
        method: 'GET',
        path: '/scripts/{script*}',
        handler: {
            directory: {
                path:    __dirname + '/../public/scripts',
                listing: false,
                index:   false
            }
        }
    }
];
module.exports = routes;