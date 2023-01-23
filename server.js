const {
    connect,
    disconnect,
    query
} = require('./src/server')

'use strict'


const assert = require('assert').strict

connect()

query('SELECT * FROM playlist', [], (result) => {
    assert.strictEqual(result.command, 'SELECT')
  
})


//disconnect()
