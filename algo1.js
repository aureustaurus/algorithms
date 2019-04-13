
const _ = require('lodash');

console.log('Start');
let time1 = Date.now();
console.log(time1);
const arrM = {
  m1: {
    status: 'free',
    order: ['w6', 'w4', 'w3', 'w2', 'w5', 'w1']
  },
  m2: {
    status: 'free',
    order: ['w6', 'w2', 'w3', 'w1', 'w5', 'w4']
  },
  m3: {
    status: 'free',
    order: ['w5', 'w6', 'w3', 'w2', 'w4', 'w1']
  },
  m4: {
    status: 'free',
    order: ['w1', 'w2', 'w4', 'w5', 'w3', 'w6']
  },
  m5: {
    status: 'free',
    order: ['w5', 'w3', 'w1', 'w2', 'w4', 'w6']
  },
  m6: {
    status: 'free',
    order: ['w3', 'w5', 'w1', 'w2', 'w4', 'w6']
  },
};

const arrW = {
  w1: {
    status: 'free',
    order: ['m1', 'm4', 'm3', 'm2', 'm5', 'm6']
  },
  w2: {
    status: 'free',
    order: ['m2', 'm1', 'm3', 'm6', 'm5', 'm4']
  },
  w3: {
    status: 'free',
    order: ['m6', 'm4', 'm3', 'm2', 'm5', 'm1']
  },
  w4: {
    status: 'free',
    order: ['m3', 'm2', 'm4', 'm5', 'm1', 'm6']
  },
  w5: {
    status: 'free',
    order: ['m3', 'm5', 'm1', 'm2', 'm4', 'm6']
  },
  w6: {
    status: 'free',
    order: ['m3', 'm5', 'm1', 'm2', 'm4', 'm6']
  },
};


const men = Object.keys(arrM);
const men2 = Object.keys(arrM);
const women = Object.keys(arrW);

const combinePair = (mName, wName) => {
  arrM[mName].status = wName;
  arrW[wName].status = mName;
  return null;
};

const clearPair = name => {
  arrM[name].status = 'free';
}

const createBestPair = (mName, wName) => {
  const mName2 = arrW[wName].status;
  const indexM1 = _.indexOf(arrW[wName].order, mName2);
  const indexM2 = _.indexOf(arrW[wName].order, mName);
  const bestM = indexM1 < indexM2 ? mName2 : mName;
  const freeMan = indexM1 < indexM2 ? mName : mName2;
  console.log('createBestPair', wName, arrW[wName].order, mName2, indexM1, mName, indexM2, bestM, freeMan);
  clearPair(freeMan);
  combinePair(bestM, wName);
  return freeMan;
};

const findPair = (name, i) => {
  const men = arrM[name];
  const bestWomanName = men.order[i];
  const bestW = arrW[bestWomanName];

  if (bestW.status === 'free') {
    combinePair(name, bestWomanName);
  } else {
    const worthM = createBestPair(name, bestWomanName);
    const success = name !== worthM;
    let nextWomenIndex = 0;
    if (success) {
      combinePair(name, bestWomanName);
      nextWomenIndex = _.indexOf(arrM[worthM].order, bestWomanName) + 1;
      findPair(worthM, i + 1);
    } else {
      nextWomenIndex = _.indexOf(arrM[name].order, bestWomanName) + 1;
      findPair(name, nextWomenIndex);
    }
  }
  const pairName = `${name}-${bestWomanName}`
};

//var 1
men.forEach(name => (findPair(name, 0)));


// var 2 take random chain of men
// const getRandomInt = () => {
//   return Math.floor(Math.random() * (men2.length - 0)) + 0;
// };

// for (let index = 0; index < men2.length; index++) {
//   const currentIndex = getRandomInt();
//   findPair(men2[currentIndex], 0);
//   men2.splice(currentIndex, 1);

// }
// end var 2


const bestPairs = _.map(men, name => {
  return `${name}-${arrM[name].status}`;
});

console.log(`Best pairs are: ${bestPairs}`);
const time2 = Date.now()
console.log(time2);
const diffTime = time2 - time1;
console.log('End', diffTime);