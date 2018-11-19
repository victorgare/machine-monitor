const osType = require('os').type();
var spawnSync = require('child_process').spawnSync;
var path = require('path');
const converter = require('../utils/converter');


const diskLabel = osType === "Windows_NT" ? __dirname.charAt(0) : "/";

function getInfo() {
    let result = {};
    if (osType === "Windows_NT") {
        result = spawnSync(path.join(__dirname, '../../bin/drivespace.exe'), ["drive-" + diskLabel]);

        if (result.error) {
            throw result.error;
        } else {
            const disk = result.stdout.toString().trim().split(',');

            return {
                total: disk[0],
                free: disk[1],
                status: disk[2]
            }
        }
    } else {
        result = spawnSync("df -k '" + diskLabel.replace(/'/g, "'\\''") + "'");

        if (result.error) {
            throw result.error;
        } else {
            const lines = result.stdout.toString().trim().split("\n");
            const strDisk = lines[lines.length - 1].replace(/[\s\n\r]+/g, ' ');
            const disk = strDisk.split(' ');

            return {
                total: disk[1] * 1024,
                free: disk[3] * 1024,
                status: "READY"
            }
        }
    }

}

module.exports = {
    totalSpace() {
        return getInfo().total;
    },

    freeSpace() {
        return getInfo().free;
    },

    usedSpace() {
        const total = this.totalSpace();
        const free = this.freeSpace();

        return total - free;
    },

    totalSpaceGb() {
        return converter.convertToGb(this.totalSpace());
    },

    usedSpaceGb() {
        return converter.convertToGb(this.usedSpace());
    },

    freeSpaceGb() {
        return converter.convertToGb(this.freeSpace());
    },

    percentageFree() {
        const totalSpace = this.totalSpace();
        const freeSpace = this.freeSpace();
        return ((freeSpace * 100) / totalSpace).toFixed(2);
    },

    percentageUsed() {
        const totalSpace = this.totalSpace();
        const freeSpace = this.freeSpace();
        return (((totalSpace - freeSpace) * 100) / totalSpace).toFixed(2);
    },

    getDiskInfo() {
        return {
            totalSpace: this.totalSpace(),
            freeSpace: this.freeSpace(),
            usedSpace: this.usedSpace(),
            totalSpaceGb: this.totalSpaceGb(),
            freeSpaceGb: this.freeSpaceGb(),
            usedSpaceGb: this.usedSpaceGb(),
            percentageFree: this.percentageFree(),
            percentageUsed: this.percentageUsed()
        }
    }
}
