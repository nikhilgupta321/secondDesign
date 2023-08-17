import { transactiondb, sequelize, config } from './../config/config'
import app from './express'

sequelize.authenticate().then(() => {
  console.error('Database connected successfully')
})
.catch((err) => {
  console.error('Unable to connect to the database:', err)
})
//sushil change
transactiondb.authenticate().then(() => {
  console.error('Database connected successfully')
})
.catch((err) => {
  console.error('Unable to connect to the database:', err)
})

app.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('Server started on port %s.', config.port)
})