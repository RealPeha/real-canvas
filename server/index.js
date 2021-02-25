const server = require('./server')
const ws = require('./ws')

server.listen(3000)
ws.listen(server)
