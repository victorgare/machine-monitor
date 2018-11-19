const os = require('os');
const converter = require('../utils/converter');

module.exports = {

    totalMem() {
        return os.totalmem();
    },

    freeMem() {
        return os.freemem();
    },

    freeMemGb() {
        return converter.convertToGb(this.freeMem());
    },

    totalMemGb() {
        return converter.convertToGb(this.totalMem());
    },

    percentageFree() {
        const totalMem = this.totalMem();
        const freeMem = this.freeMem();
        return ((freeMem * 100) / totalMem).toFixed(2);
    },

    percentageUsed() {
        const totalMem = this.totalMem();
        const freeMem = this.freeMem();
        return (((totalMem - freeMem) * 100) / totalMem).toFixed(2);
    },

    getMemoryInfo() {
        return {
            totalMem: this.totalMem(),
            freeMem: this.freeMem(),
            totalMemGb: this.totalMemGb(),
            freeMemGb: this.freeMemGb(),
            percentageFree: this.percentageFree(),
            percentagemUsed: this.percentageUsed(),
        }
    }
}
