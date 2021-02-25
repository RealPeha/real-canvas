const path = require('path')
const http = require('http')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../client')))

const server = http.createServer(app)

module.exports = server
