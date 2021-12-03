const fs = require('fs')

const positions = fs.readFileSync('./input.txt').toString().split('\n');

//part 1
const positionsObj = positions.reduce((acc, position) => {
    const [key, value] = position.split(' ');
    
    return {...acc, [key]: (acc[key] || 0) + parseInt(value)}
}, {});

const divePosition = (positionsObj['down'] - positionsObj['up'])* positionsObj['forward']

console.log(divePosition)

//part 2
let horizontalPos = 0;
let depth = 0;
let aim = 0;

positions.forEach(position => {
    const [key, value] = position.split(' ');
    const valueInt = parseInt(value);

    switch(key) {
        case 'forward':
            horizontalPos += valueInt;
            depth += valueInt*aim;
            break
        case 'up':
            aim -= valueInt;
            break
        case 'down':
            aim += valueInt;
            break
    }
})

const accurateDivePostion = horizontalPos*depth;

console.log(accurateDivePostion)

