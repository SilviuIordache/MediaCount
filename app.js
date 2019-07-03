const readline = require('readline');
const fs = require('fs');

let t0 = new Date().getTime();
let line_no = 0;
let mediaCount = {}

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
  //input: fs.createReadStream('test.txt')
});


//Counts occurences of an object's keys inside an array and stores them to the corresponding key;
let countOccurences = (arr, countObj) => {

  mediaName = arr[2].replace(/("|')/g, "");

  if (countObj.hasOwnProperty(mediaName)) {
    countObj[mediaName]++;
  } else {
    countObj[mediaName] = 1;
  }
}


// event is emitted after each line
rl.on('line', function (line) {
  line_no++;
  
  let arr = line.split(',');
  //console.log(arr);
  countOccurences(arr, mediaCount);
});


// End
rl.on('close', 
  function (line) {
    

    //list mediaCount object when file is done reading
    //console.log(mediaCount);

    let t1 = new Date().getTime();
    //display duration:
    console.log(`PROCESS DURATION: ${(t1-t0) / 1000} s `);

    // let mediaTotal = 0;
    for (let key in mediaCount) {
      console.log(`${key}: ${mediaCount[key]}`);
      mediaTotal += mediaCount[key];
    }

    console.log(`Lines total : ${line_no}`);
    console.log(`Media total: ${mediaTotal}`);
    
  }
);

