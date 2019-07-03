const readline = require('readline');
const fs = require('fs');

let t0 = new Date().getTime();
let line_no = 0;
let mediaCount = {
  'BOOK': 0,
  'EBOOK': 0,
  'AUDIOBOOK': 0,
  'VIDEODISC': 0,
  'SOUNDDISC': 0,
  'SONG': 0
}

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
  //input: fs.createReadStream('test.txt')
});


//Counts occurences of an object's keys inside an array and stores them to the corresponding key;
let countOccurences = (arr, countObj) => {
  arr.forEach((el) => {
    if (countObj.hasOwnProperty(el)) {
      countObj[el]++;
    }
  })
}


// event is emitted after each line
rl.on('line', function (line) {
  line_no++;
  
  let arr = line.split(',');
  //console.log(arr);
  countOccurences(arr, mediaCount);
});

// end
rl.on('close', function (line) {
  console.log('Total lines : ' + line_no);

  //List mediaCount object when file is done reading
  console.log(mediaCount);

  let t1 = new Date().getTime();
  //Display duration:
  console.log(`Reading process took ${(t1- t0)} ms`);
});

