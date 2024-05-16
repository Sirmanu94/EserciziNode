import { createServer } from "node:http";

const server = createServer((request, response)=>{
 console.log("request receveid");

 response.statusCode = 200; // Significa ok, risposta positiva

 response.setHeader('Content-Type', 'text/html');
 // Qui restituiamo una risposta di tipo "contenuto" e gli diciamo che sarà in html

 response.end("<html><body><h1>This Page is made with node  </h1></body></html>"); //Questo sarà il corpo della risposta.


})


server.listen(3000, ()=>{
    console.log(`server running at http://localhost:3000`);
});