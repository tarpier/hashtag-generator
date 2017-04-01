const hashtags = require('./hashtags.json');
const fs = require('fs');

const options = {
    'must-haves': 2,
    festivals: 9,
    places: 2,
    genres: 3,
    ig: 4,
    randoms: 1
};


function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let makeHastagCloud = (jsonInput, options) => {

    const keys = Object.keys(jsonInput);

    let hashtagCloud = [];

    for (let a = 0; a < keys.length; a++){
        let categoryOfHashtag = keys[a];
        const array = shuffle(jsonInput[categoryOfHashtag]);

        for(let i = 0; i < options[categoryOfHashtag]; i++){
            hashtagCloud.push(array[i]);
        }
    }
    return hashtagCloud;
    
};

const output = makeHastagCloud(hashtags, options);

fs.writeFile('hashcloud.txt', output.join(" "), (err) => {
    if(err){
        console.log(err);
    }
});

