const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const makeHastagCloud = require('./app/makeHashtagCloud');
const hashtags = require('./hashtags.json');

let options;

/**
 * custom options
 */ 
if (argv.f){
    options = require(`./${argv.f}`);
} else {
    options = require('./options.json');
}

const output = makeHastagCloud(hashtags, options);

/**
 * (optional) write to file
 */
fs.writeFile('hashcloud.txt', output.join(" "), (err) => {
    if (err) {
        console.log(err);
    }
});


/**
 * (default) copy to clipboard
 */
console.log(output.join(" "));

const pbTest = output.join(" ");

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); proc.stdin.write(data); proc.stdin.end();
}

pbcopy(pbTest);

