const fs = require('fs');


// BLoking, syncronous way


// const textContent = fs.readFileSync('./text.txt', 'utf8'); 
// console.log(textContent);
// const moreText = `Beyond their nutritional value, avocados are incredibly versatile in the kitchen. They can be used in savory dishes like guacamole, salads, and sandwiches, or blended into smoothies and desserts for their creamy texture. They're also known for being a healthy addition to toast, making the perfect base for a variety of toppings.`;
// const textOut = `${textContent}
// ${moreText}
// Date: ${Date.now()} 
// `;
// fs.writeFileSync('./text.txt', textOut);



// Non-bloking, asynchronous way
const camusPoem = '"En las profundidades del invierno, finalmente aprendí que en mi interior habitaba un verano invencible." 🌿';

fs.readFile('./poem.txt', 'utf-8',(err, data) => {

    if(err) return console.log('error: 🤢');
    
    console.log(data);
    fs.readFile('./aforismo.txt', 'utf-8', function (err, data1) {
        fs.writeFile('./long-text.txt', `${data}\n${data1} \n created at: ${Date.now()}`, (err) => {
            console.log('The file has been written :D');
            console.log(data1);
            
        })
    });
});

console.log("xd baby");
