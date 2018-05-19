import author from '../config/author';
const http = require('request');

const routes = [  
    // home 
    {
        method: 'GET',
        path: '/',
        handler: function(request, response) {
            http('http://www.google.com', function (err, resp, body) {
                if (!err && resp.statusCode === 200) {
                    console.log(resp.statusCode); // Show the HTML for the Google homepage.
                }
             });
            
            var data = {
                title: 'Pet Weather App',
                message: 'Welcome to Pet Weather App'
            };

            return response.view('index', data);
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