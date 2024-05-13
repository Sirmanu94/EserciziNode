import { createServer } from "node:http";

const server = createServer((request, response)=>{
 console.log("request receveid");

 response.statusCode = 200; // Significa ok, risposta positiva

 response.setHeader('Content-Type', 'application/json');
 // Qui restituiamo una risposta di tipo "contenuto" e gli diciamo che sarà in html

 const jsonResponse = JSON.stringify({location: "Mars"})

 response.end(jsonResponse); //Questo sarà il corpo della risposta.


})


server.listen(3000, ()=>{
    console.log(`server running at http://localhost:3000`);
});