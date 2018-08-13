const Profile = require('./profile');

const home = (request, response) => {
  if (request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write('Search\n');
    response.end('Hello World!\n');
  }
}

const user = (request, response) => {
  let username = request.url.replace('/', '');
  if (username.length > 0) {
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    // Get profile data from treehouse
    let studentProfile = new Profile(username);
    // on end
    studentProfile.on('end', (profileJSON) => {
      // show profile
      // Store the values we need
      let values = {
        avatarURL: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      // simple response
      response.write(`${values.username} has ${values.badges} badges\n`);
      response.end('Footer\n');
    });

      // on error
      studentProfile.on('error', error => {
        // show error
        // console.error(error.message);
        response.write(error.message + "\n");
        response.end('Footer\n');
      });

  }
}

module.exports.home = home;
module.exports.user = user;