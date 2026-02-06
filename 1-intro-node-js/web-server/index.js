// Server
const http = require('http');
const url = require('url');
const fs = require('fs');

const { replaceTemplate } = require('./modules/renderFunction');

const slugify = require("slugify");

// Lee el archivo JSON correctamente
const data = fs.readFileSync(`${__dirname}/dev-data/fruits.json`, 'utf-8');

// read templates
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const productsObject = JSON.parse(data);

// Tabla de rutas (lookup table)
const pathName = {
  '/overview': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = productsObject.map((element) => replaceTemplate(templateCard, element)).join('') // .join('') convierte un array de strings en un solo string concatenado, sin separadores.

    const ouput = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(ouput);
  },
  '/product': (req, res) => {
    const { query } = url.parse(req.url, true);
    const product = productsObject.find(element => element.ID === Number(query.id));
    const productPage = replaceTemplate(templateProduct, product);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(productPage);
  },
  '/api': (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productsObject));
  },
  '/': (res) => {
    res.writeHead(200, { 
        'Content-Type': 'text/html',
        'my-own-header': 'Hello baby, can you see me ñ.ñr?'
     });
    res.end(templateOverview);
  },
};

// Using sluggy

console.log(slugify("Fresh WEED", { lower: true } )); 

// Crear el servidor
const server = http.createServer((req, res) => {
  // console.log(req.url)
  // const parsedUrl = url.parse(req.url, true)
  // console.log(parsedUrl.query);
  
  const { query, pathname: nameOfURl } = url.parse(req.url, true);
  
  const page = pathName[nameOfURl]; // Busca la ruta en el objeto
  
  if (page) {
    page(req, res);
  } else {
    // I need to define the http status code and the header before to send the response
    res.writeHead(404, { 
      'Content-Type': 'text/html',
      'secret-message': 'No este molestando mijo deje mamar, no hay nada, lalalalal'
     });
    res.end('<h1>404 Not Found</h1>');
  }
});

// Iniciar el servidor
server.listen(9222, 'localhost', () => {
  console.log("I'm alive bitch!! xd http://localhost:9222");
});
