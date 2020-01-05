// const data = require('AIUCD_2020_volume_BOZZA.txt')
// var data = fs.readFileSync('AIUCD_2020_volume_BOZZA.txt');

var fs = require('fs');
fs.readFile(__dirname + '/AIUCD_2020_volume_BOZZA.txt', function (err, file) {
    if (err) {
        throw err
    }
    //   console.log(file.toString())

    let data
    // console.log(typeof(file), file)

    data = file.toString().split('Bibliografia')

    console.log(data.length)

});