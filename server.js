'use strict'

const express = require('express')
const { resourceUsage } = require('process')

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
const CONTENT_TYPE_HTML = 'text/html'



const {
    connect,
    disconnect,
    query
} = require('./src/server')



app.get('/playlists', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    connect()
    query( "SELECT * FROM playlist ", [], (result)=>{
        response.end(JSON.stringify(result))
        disconnect()
    } )
 })

 app.get('/playlists/:id', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    connect()
    query( "SELECT * FROM playlist WHERE id = "+parseInt(request.params.id), [], (result)=>{
        response.end(JSON.stringify(result))
        disconnect()
    } )
 })
/*
connect()



disconnect()*/

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
