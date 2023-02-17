module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`val-queue is ready!`)
    }
}