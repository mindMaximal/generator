import {Router} from 'express'
import {initializeConnection} from "../functions/initializeConnection.js"
import config from "config";

const router = Router()

const configDB = {
  host: config.get('host'),
  user: config.get('user'),
  password: config.get('password'),
  port: config.get('portDB'),
  database: config.get('database')
}

// /api/trancate
router.post(
  '/',
  [],
  async (req, res) => {
    try {
      let query
      let connection

      const goods = []
      const details = []
      const materials = []

      query = 'SELECT `idGoods` FROM `goods`'

      connection = initializeConnection(configDB)

      connection.query(query, (err, rows) => {

        if (err) {
          throw err
        }
        goods.concat(rows)
      })

      query = 'SELECT `idDetails` FROM `details`'

      connection.query(query, (err, rows) => {

        if (err) {
          throw err
        }
        details.concat(rows)
      })

      query = 'SELECT `idMaterials` FROM `materials`'

      connection.query(query, (err, rows) => {

        if (err) {
          throw err
        }
        materials.concat(rows)
      })

      connection.end()

      res.json({
        success: true
      })

    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })

export default router