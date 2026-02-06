const fs = require("fs").promises;

const { config } = require("../1-intro-node-js/config/");


// Using Promises

/* fs.readFile(`${__dirname}/cat.txt`, "utf-8")
  .then(breedId => {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId.trim()}`, {
      headers: { "x-api-key": config.apiKeyCats }
    });
  })
  .then(res => res.json())
  .then(json => {
    console.log(...json);

    if (!json || json.length === 0) {
      throw new Error("Breed of cat not found");
    }

    return fs.writeFile("cat-image.txt", json[0].url);
  })
  .then(() => {
    console.log("URL de la imagen guardada en cat-image.txt");
  })
  .catch(err => {
    console.error("Error:", err);
  }); */

// Using async/await and EIIF

(async () => {
  try {
    // leer el archivo con await (promesa)
    const data = await fs.readFile(`${__dirname}/cat.txt`, "utf-8");
    console.log(`Cat breed id: ${data}`);

    // dispara 3 requests en paralelo
    const requests = [
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
        headers: { "x-api-key": config.apiKeyCats }
      }),
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
        headers: { "x-api-key": config.apiKeyCats }
      }),
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
        headers: { "x-api-key": config.apiKeyCats }
      })
    ];

    // esperar todas las respuestas
    const responses = await Promise.all(requests);
    console.log("Resolving promises");
    console.log(responses);
    
    // convertir cada response a JSON
    const jsons = await Promise.all(responses.map(r => r.json()));
    console.log("Making json the results about the promises");
    console.log(jsons);
    
    // jsons es un array de arrays, porque la API devuelve `[ { url: "..."} ]`
    const urls = jsons.map(arr => arr[0].url);
    console.log("Showing the urls in an array");
    console.log(urls);
    
    // escribir todas las urls en el archivo
    await fs.writeFile("cat-image.txt", urls.join("\n"));

    console.log("URLs de las imágenes guardadas en cat-image.txt");
  } catch (err) {
    console.error("Error:", err);
  }
})();


/* const asynFunction = async () => {
    try {
    // leer el archivo con await (promesa)
    const data = await fs.readFile(`${__dirname}/caaaat.txt`, "utf-8");
    console.log(`Cat breed id: ${data}`);
    
    // fetch devuelve promesa
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
      headers: { 
            "x-api-key": config.apiKeyCats 
        }
    });

    const json = await res.json();
    console.log(...json);

    if (!json || json.length === 0) {
      return console.log("Breed of cat not found");
    }

    // escribir archivo con promesa
    const imageUrl = json[0].url;
    await fs.writeFile("cat-image.txt", imageUrl);

    return "Spet 2: URL de la imagen guardada en cat-image.txt";

  } catch (err) {
    throw(err);
  }
}

 */
console.log("Step 1: Running JS code");

/* 
asynFunction()
  .then( x => {
    console.log(x);
    console.log("Step 3: Done all the work");
  })
  .catch( err => {
    console.log("Error nigga")
  })

 */