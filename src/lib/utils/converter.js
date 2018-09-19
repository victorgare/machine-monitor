"use strict";

module.exports = {

    convertToGb(totalSpaceInBytes, decimalAmount = 2) {
        if (isNaN(decimalAmount) || decimalAmount < 0){
            decimalAmount = 2;
        }
            return (totalSpaceInBytes / 1024 / 1024 / 1024).toFixed(decimalAmount);
    }
}
