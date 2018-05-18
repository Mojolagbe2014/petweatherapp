import author from '../config/author';

const routes = [  
    {
        method: 'GET',
        path: '/',
        handler: function(request, response) {
            var data = {
                title: 'Pet Weather App',
                message: 'Welcome to Pet Weather App'
            };

            return response.view('index', data);
        }
    },
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
    }
];
export default routes;