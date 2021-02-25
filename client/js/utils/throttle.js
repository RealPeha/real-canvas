const throttle = (callback, limit) => {
    let lastTime = 0

    return (...args) => {
        const now = Date.now()

        if ((now - lastTime) >= limit) {
            callback(...args)
            lastTime = now
        }
    }
}

export default throttle
