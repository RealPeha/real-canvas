class Room {
    static goto(roomId) {
        window.location.href = `#${roomId}`
        window.location.reload()
    }

    static broadcast(message) {
        if (message) {
            window.ws.send('chat', { text: message })
        }
    }
}

export default Room
