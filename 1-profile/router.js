const homeRoute = (request, response) => {
  if (request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write('Search\n');
    response.end('Hello World!\n');
  }
}

const userRoute = (request, response) => {
  let username = request.url.replace('/', '');
  if (username.length > 0) {
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    reponse.write(`${username}\n`);
    response.end('Footer\n');
  }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;