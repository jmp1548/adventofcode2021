const fs = require('fs')

const depths = fs.readFileSync('./input.txt').toString().split('\n').map((item) => parseInt(item, 10));;

//part 1
let counter = 0;
for(let i = 1; i <= depths.length; i++) {
    if (depths[i] > depths[i-1]) {
        counter++;
    }
}

console.log(counter);

//part 2

let counter2 = 0;

let i = 0;

while(i < depths.length) {
    let window1 = 0;
    let window2 = 0;

    for (let n = 0; n < 3; n++) {
        if(depths[i+3] !== undefined) {
            window1 += depths[i+n];
            window2 += depths[i+n+1];
        }
    }
    
    if(window2 > window1) {
        counter2++;
    }

   i++;
}


console.log(counter2);
