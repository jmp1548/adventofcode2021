const fs = require('fs')

const rates = fs.readFileSync('./input.txt').toString().split('\n').map(val => val.split(''));

//part 1
const getRate = (rates, rateType, index = 0, calRate = '') => {
    let mcb = {};
    
    rates.map(val => {
        if(mcb[val[index]]) {
            mcb[val[index]]++;
        } else {
            mcb[val[index]] = 1;
        }
    })

    calRate += Object.keys(mcb).reduce((a, b) => {
        if(rateType === 'gamma') {
            return mcb[a] > mcb[b] ? a : b;
        } 
        else if (rateType === 'epsilon') {
            return mcb[a] < mcb[b] ? a : b;
        }
    }); 
    
    if(index >= rates[0].length -1) {
        return parseInt(calRate, 2);
    } else {
        return getRate(rates, rateType, index+1, calRate);
    }
}

const gammaRate = getRate(rates, 'gamma');
const epsilonRate = getRate(rates, 'epsilon');

console.log(gammaRate*epsilonRate);

//part 2
const getRating = (rates, rateType, index = 0) => {
    let mcb = {};

    rates.map(val => {
        if(mcb[val[index]]) {
            mcb[val[index]]++;
        } else {
            mcb[val[index]] = 1;
        }
    })

    const value = Object.keys(mcb).reduce((a, b) => {
        if(rateType === 'oxygen') {
            if(mcb[a] === mcb[b]) {
                return '1';
            }
            else if(mcb[a] > mcb[b]) {
                return a;
            } else return b;
        } 
        else if (rateType === 'CO2') {
            if(mcb[a] === mcb[b]) {
                return '0';
            }
            else if(mcb[a] < mcb[b]) {
                return a;
            } else return b;
        }
    }); 

    const filterRates = rates.filter(val => val[index] === value);

    if(filterRates.length === 1) {
        return parseInt(filterRates[0].join(''), 2);
    } else {
        return getRating(filterRates, rateType, index+1);
    }
}

const oxygenGeneratorRating = getRating(rates, 'oxygen');
const cO2ScrubberRating = getRating(rates, 'CO2');

console.log(cO2ScrubberRating*oxygenGeneratorRating);