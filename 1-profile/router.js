const Profile = require('./profile');
const renderer = require('./renderer');

const commonHeaders = { 'Content-Type': 'text/html'}

const home = (request, response) => {
  if (request.url === '/') {
    response.statusCode = 200;
    response.writeHead(200, commonHeaders);
    renderer.view('header', null, response);
    renderer.view('search', null, response);
    renderer.view('footer', null, response);
    response.end();
  }
}

const user = (request, response) => {
  let username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', null, response);
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
      renderer.view('profile', values, response);
      renderer.view('footer', null, response);
      response.end();
    });

    // on error
    studentProfile.on('error', error => {
      // show error
      // console.error(error.message);
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', null, response);
      renderer.view('footer', null, response);
      response.end();
    });

  }
}

module.exports.home = home;
module.exports.user = user;