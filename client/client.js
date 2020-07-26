const { Client } = require('pg')

const config = {
    connectionString: process.env.DATABASE_URL || 'postgres://zhsuczgrrvsbgw:a7a2192991ba857fe02fcaadb0edfd54cde7590bd832560fb0d279b77f6489cf@ec2-23-20-129-146.compute-1.amazonaws.com:5432/ddv0d3s6fp9vef',
    ssl: {
      rejectUnauthorized: false,
  },
  }

const client = new Client(config)
client.connect()

module.exports = client