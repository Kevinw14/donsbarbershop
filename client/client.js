const { Client } = require('pg')

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }

const client = new Client(config)
client.connect()

module.exports = client