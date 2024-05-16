// importo il modulo
const fs = require('fs');

// file path e contenuto
const filePath = 'example.txt';
const fileContent = 'This is the content of the text file .';

//scrivo il file
fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    // If an error occurs, log it
    console.error('Error writing to file:', err);
  } else {
    // If no error, log a success message
    console.log('File successfully written:',filePath);
  }
});

//Commento aggiunto per rifare il push