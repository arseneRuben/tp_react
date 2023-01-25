'use strict'

const express = require('express')
// const { resourceUsage } = require('process')

const app = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// CORS for development
// https://enable-cors.org/server_expressjs.html
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Credentials', 'false')
    next()
})

// parse application/json
app.use(express.json())

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const dao = require('./src/server')

// Get all playlist
app.get('/playlists', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dao.connect()
    dao.query('SELECT * FROM playlist ', [], (result) => {
        response.end(JSON.stringify(result))
        dao.disconnect()
    })
})

// Get details of a playlist
app.get('/playlists/:id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dao.connect()
    dao.query('SELECT * FROM playlist WHERE id = $1', [parseInt(request.params.id)], (result) => {
        response.end(JSON.stringify(result))
        dao.disconnect()
    })
})

// Get all tracks of a playlist
app.get('/playlists/:id/tracks', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dao.connect()
    dao.query('SELECT * FROM track WHERE playlist_id = ?', [parseInt(request.params.id)], (result) => {
        response.end(JSON.stringify(result))
        dao.disconnect()
    })
})

// Get all tracks of or database
app.get('/tracks', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dao.connect()
    dao.query('SELECT * FROM track', [], (result) => {
        response.end(JSON.stringify(result))
        dao.disconnect()
    })
})

// Add track in a specifig playlist
app.post('/playlists/:playlist_id/tracks/', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dao.connect()
    dao.query('INSERT INTO track (playlist_id, title, uri, master_id) VALUES ($1, $2, $3, $4)', [parseInt(request.params.playlist_id), request.body.title, request.body.uri, parseInt(request.body.master_id)], (error, result) => {
        if (error) {
            throw error
        }
        dao.disconnect()
    })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
