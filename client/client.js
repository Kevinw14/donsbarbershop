const { Client } = require('pg')

const config = {
    connectionString: process.env.DATABASE_URL || 'postgres://fsvnsfxpdpdmmw:994b7c064b799a5ca7bd79d63215578855fb243437c9ab2a73c4a973b8a873c0@ec2-18-213-176-229.compute-1.amazonaws.com:5432/dbhdg0n5he980e',
    ssl: true
  }

const client = new Client(config)
client.connect()

module.exports = client