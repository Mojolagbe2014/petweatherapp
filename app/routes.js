
const routes = [  
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            // Render the view with the custom greeting
            var data = {
                title: 'This is Index!',
                message: 'Hello, World. You crazy handlebars layout'
            };

            return reply.view('index', data);
        }
    }
];
export default routes;