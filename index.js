const memoryMonitor = require('./src/lib/memory-monitor');
const diskMonitor = require('./src/lib/disk-monitor');
const os = require('os');

const fastify = require('fastify')({
    logger: true
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

// process.env.PORT <- Colocar isso no lugar da porta 3000
fastify.listen(3000, (err, address) => {
    if (err) {
        throw err;
    };

    fastify.log.info(`server listening on ${address}`);
});
