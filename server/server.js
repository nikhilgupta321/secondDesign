import { config } from './../config/config'
import app from './express'
import { sequelize } from '../config/config'

sequelize.authenticate().then(() => {
  console.log('Database connected successfully')
})
.catch((err) => {
  console.log('Unable to connect to the database:', err)
})

app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})