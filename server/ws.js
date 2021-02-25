const WebSocket = require('ws')

const Client = require('./Client')
const Room = require('./Room')
const jsonSafeParse = require('./utils/jsonSafeParse')

const rooms = new Map()

const getOrCreateRoom = roomId => {
    let room = rooms.get(roomId)

    if (!room) {
        room = new Room(roomId)

        rooms.set(roomId, room)
    }

    return room
}

const listen = server => {
    const wsServer = new WebSocket.Server({
        server,
        clientTracking: false
    })

    wsServer.on('connection', (socket, req) => {
        const [, roomId = 'global'] = req.url.split('=')

        const room = getOrCreateRoom(roomId)
        const client = new Client(socket)

        client.send({
            type: 'clients',
            id: client.id,
            data: {
                clients: [...room.clients].map(client => client.serialize()),
                client: client.serialize(),
            }
        })

        room.clients.add(client)

        room.broadcast(client, 'new-client', client.serialize())

        socket.on('message', message => {
            try {
                const { type, data } = jsonSafeParse(message)

                switch (type) {
                    case 'mouse':
                        client.mouse.x = data.x
                        client.mouse.y = data.y

                        if (data.isDrawing) {
                            let strokes = client.strokes[client.strokes.length - 1]

                            // if (!strokes) {
                            //     strokes = { points: [] }

                            //     client.strokes[client.strokes.length - 1] = strokes
                            // }

                            strokes.points.push({
                                x: data.x,
                                y: data.y,
                            })
                        }
                        
                        room.broadcast(client, 'mouse', data)
                        break
                    case 'startDraw':
                        client.strokes.push({ points: [] })

                        room.broadcast(client, 'startDraw')
                        break
                }
            } catch (err) {
                console.log('err')
            }
        })

        socket.on('close', () => {
            room.broadcast(client, 'close')

            room.clients.delete(client)

            if (!room.clients.size) {
                rooms.delete(roomId)
            }
        })
    })
}

module.exports = { listen }