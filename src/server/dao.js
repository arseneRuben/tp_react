
'use strict'

const { Client } = require('pg')

let client = {}

function connect () {
    client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'structure_logicielle',
        user: 'postgres',
        password: 'postgres'
    })

    client.connect((error) => {
        if (error) {
            console.error('connexion error', error.stack)
        } else {
            console.log('connected')
        }
    })
    
}

function query (query, values, resultCallback) {
    client.query(query, values, (error, result) => {
        //console.log(error)
        if (error) {
            throw error
        }
        resultCallback(result)
    })
}


function disconnect () {
   
    client.end()
}

module.exports = {
    connect,
    disconnect,
    query
}
