const fs = require("fs");
const http = require("http");
const url = require("url");
const fillUserTemplate = require("./module/helper");

/*const fillUserTemplate = (template, data) => {
    let output = template.replace(/{%NAME%}/g, data.name);
    output = output.replace(/{%AGE%}/g, data.age);
    return output;
};*/

const usersData = fs.readFileSync("./data/users.json", "utf-8");
const userDataArray = JSON.parse(usersData);
const baseTemplate = fs.readFileSync("./template/base.html", "utf-8");
const userTemplate = fs.readFileSync("./template/user.html", "utf-8");

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  let output = "";

  switch (pathname) {
    case "/":
      response.end("Homepage...");
      break;

    case "/user":
      response.writeHead(200, {
        "Content-type": "text/html"
      });

      //hell
      output = baseTemplate.replace("{%TITLE%}", "Our user");

      const id = query.id ? query.id : 1;

      output = output.replace(
        "{%CONTENT%}",
        `<div>Hello, it's user...${userDataArray[id].name}</div>`
      );

      response.end(output);
      break;

    case "/users":
      response.writeHead(200, {
        "Content-type": "text/html"
      });

      //console.log(userDataArray);

      const usersHtml = userDataArray
        .map(user => fillUserTemplate(userTemplate, user))
        .join("");

      output = baseTemplate.replace("{%TITLE%}", "Our users");

      output = output.replace("{%CONTENT%}", `<ul>${usersHtml}</ul>`);

      response.end(output);
      break;

    default:
      {
        response.writeHead(404, {
          "Content-type": "text/html"
        });
        response.end("<h5>Oppss....</h5>");
      }
      break;
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on port 3000");
});
