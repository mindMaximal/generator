import express from 'express'
import path from 'path'
import config from 'config'

const app = express()
const __dirname = path.resolve()

import apiAdd from './routes/add.routes.js'
import apiTruncate from './routes/truncate.routes.js'
import apiLinks from './routes/links.routes.js'
//import apiMapFilter from './routes/filter.routes.js'

app.use(express.json({
  extended: true,
  limit: '50mb'
}))

app.use('/api/add', apiAdd)
app.use('/api/truncate', apiTruncate)
app.use('/api/links', apiLinks)
//app.use('/api/map', apiMap)

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode')
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.use('/test', (req, res, next) => {
    console.log('Test log')
    res.status(200).send('Test ok!');
  })

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`))