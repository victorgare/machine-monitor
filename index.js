const memoryMonitor = require('./src/lib/core/memory-monitor');
const diskMonitor = require('./src/lib/core/disk-monitor');
const middleware = require('./src/lib/core/middleware');
const os = require('os');

const fastify = require('fastify')({
    logger: false
});

// rota da API
///Node/machine-monitor/index.js/api
fastify.get('/machine-monitor/api', function (request, reply) {

    const memoryInfo = memoryMonitor.getMemoryInfo();
    const diskInfo = diskMonitor.getDiskInfo();
    const type = os.type();
    reply.send({
        memoryInfo: memoryInfo,
        diskInfo: diskInfo,
        type: type
    });
});

var _port = process.env.PORT || 3000;
// process.env.PORT <- Colocar isso no lugar da porta 3000
fastify.listen(_port, (err, address) => {
    if (err) {
        throw err;
    };

    fastify.log.info(`server listening on ${address}`);
});

// middleware.config();