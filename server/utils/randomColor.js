const r = () => Math.floor(Math.random() * 225)

const randomColor = () => {
    return `rgb(${[r(), r(), r()].join(',')})`
}

module.exports = randomColor
