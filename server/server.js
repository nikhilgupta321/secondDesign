import { transactiondb, sequelize, config } from './../config/config'
import app from './express'

sequelize.authenticate().then(() => {
  console.error('Database connected successfully')
})
.catch((err) => {
  console.error('Unable to connect to the database:', err)
})

transactiondb.authenticate().then(() => {
  console.error('Database connected successfully')
})
.catch((err) => {
  console.error('Unable to connect to the database:', err)
})
// Vipin
app.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('Server started on port %s.', config.port)
})