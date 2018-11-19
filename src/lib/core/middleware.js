const netstat = require('node-netstat');
const fastify = require('fastify')({
    logger: false
});

let hostList = [];

function getHostList() {
    if (hostList.length > 0) {
        hostList = [];
    }

    netstat({
        sync: true,
        protocol: "tcp"
    }, function (data) {
        if (data.local.address === null && data.remote.address === null) {
            hostList.push(data);
        }
    });

    return hostList;
}

function configMiddleware() {
    // executa essa função primeiro para atualizar a lista de hostt
    getHostList();

    for (var host in hostList) {
        let port = hostList[host].local.port;
        console.log(port);
        fastify.use("*", function () {

            console.log("pingou:  " + port);
        }).listen(port);
    }
}

module.exports = {
    hostList() {
        return getHostList();
    },

    config() {
        // executa esse metodo primeiro para 
        configMiddleware();
    }
}