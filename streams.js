//Buffer:useful when you want to work with data in smaller, manageable pieces.
//Streams:useful when dealing with large files or network data where loading everything into memory at once is not practical.
const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data', chunk => { // chunk is a peice of data 
  console.log('---- NEW CHUNK ----');
   //console.log(chunk);
   //console.log(chunk.length);
  writeStream.write('\nNEW CHUNK:\n');
  writeStream.write(chunk);
});

// piping
 //readStream.pipe(writeStream); // the same code but shorter 