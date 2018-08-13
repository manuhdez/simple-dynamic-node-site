const fs = require('fs');

function view(templateName, values, response) {
  // Read from the template files
  const fileContent = fs.readFileSync(`./views/${templateName}.html`);

  // Insert values into the content
  // Write out to the response
  response.write(fileContent);
}

module.exports.view = view;