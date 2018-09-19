var osType = require('os').type();
var exec = require('child_process').exec;
var execFile = require('child_process').spawnSync;
var path = require('path');

var result = {};
result.total = 0;
result.used = 0;
result.free = 0;
result.status = null;

const teste = execFile(path.join(__dirname, '/node_modules/diskspace/drivespace.exe'), ["drive-C"]);


console.log(teste.stdout.toString());
// execFile(path.join(__dirname, 'drivespace.exe'), ["drive-C"], null, function (error, stdout, stderr) {
//     if (error) {
//         result.status = 'STDERR';
//     }
//     else {
//         var disk_info = stdout.trim().split(',');

//         result.total = disk_info[0];
//         result.free = disk_info[1];
//         result.used = result.total - result.free;
//         result.status = disk_info[2];

//         if (result.status === 'NOTFOUND') {
//             error = new Error('Drive not found');
//         }

//     }

//     return result;
// });
