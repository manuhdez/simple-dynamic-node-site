const fs = require('fs');

function mergeValues(values, content) {
  // Cycle over the keys
  for (let key in values) {
    // Replace all {{keys}} with the value from values object
    content = content.replace(`{{${key}}}`, values[key]);
  }
  // return merged content
  return content;
}

function view(templateName, values, response) {
  // Read from the template files
  let fileContent = fs.readFileSync(`./views/${templateName}.html`, {encoding: "utf8"});

  // Insert values into the content
  fileContent = mergeValues(values, fileContent);
  // Write out to the response
  response.write(fileContent);
}

module.exports.view = view;