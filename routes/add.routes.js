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

// /api/add
router.post(
  '/',
  [],
  async (req, res) => {
    try {
      let query
      let connection

      if (req.body.goods && req.body.goods.length > 0) {
        query = 'INSERT INTO `goods` (`idGoods`, `name`, `price`, `manufacturer`) VALUES'

        for (let i = 0; i < req.body.goods.length; i++) {
          query += ` (NULL, '${req.body.goods[i].name}', '${req.body.goods[i].price}', '${req.body.goods[i].manufacturer}'),`
        }

        query = query.substring(0, query.length - 1) + ';'

        connection = initializeConnection(configDB)

        connection.query(query, (err, rows) => {
          connection.end()

          if (err) {
            throw err
          }

        })
      }

      if (req.body.details && req.body.details.length > 0) {
        query = 'INSERT INTO `details` (`idDetails`, `name`, `manufacturer`, `color`, `guarantee`) VALUES'

        for (let i = 0; i < req.body.details.length; i++) {
          query += ` (NULL, '${req.body.details[i].name}', '${req.body.details[i].manufacturer}', '${req.body.details[i].color}', '${req.body.details[i].guarantee}'),`
        }

        query = query.substring(0, query.length - 1) + ';'

        //console.log(query)

        connection = initializeConnection(configDB)

        connection.query(query, (err, rows) => {
          connection.end()

          if (err) {
            throw err
          }

        })
      }

      if (req.body.materials && req.body.materials.length > 0) {
        query = 'INSERT INTO `materials` (`idMaterials`, `name`, `price`) VALUES'

        for (let i = 0; i < req.body.materials.length; i++) {
          query += ` (NULL, '${req.body.materials[i].name}', '${req.body.materials[i].price}'),`
        }

        query = query.substring(0, query.length - 1) + ';'

        connection = initializeConnection(configDB)

        connection.query(query, (err, rows) => {
          connection.end()

          if (err) {
            throw err
          }

        })
      }

      res.json({
        success: true
      })

    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

export default router