import author from '../config/author';
import config from '../config/config';
const req = require('request');
//const fstream = require("fs");

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
export default routes;