const fs = require('fs');// module filesystem

// reading files
fs.readFile('./docs/blog.txt', (err, data) => { // asynchronous function
  if (err) {
    console.log(err);
  }  
  console.log(data.toString());
});

// console.log('last line'); // this function is called befoe the readfile bcz it is async

// writing files
fs.writeFile('./docs/blog.txt', 'hello, world', () => {
  console.log('file was written');
});

fs.writeFile('./docs/blog2.txt', 'hello, again Khayri ', () => {
  console.log('file was written');
});

// directories
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', err => {
    if (err) {
      console.log(err);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', err => {
    if (err) {
      console.log(err);
    }
    console.log('folder deleted');
  });
}

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', err => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}