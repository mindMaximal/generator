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
      let connection, goods, details, materials

      connection = initializeConnection(configDB)

      const goodsPromise = () => {
        return new Promise((res, rej) => {
          connection.query('SELECT `idGoods` AS `id` FROM `goods`', (err, rows) => {
            if (err) {
              throw err
            }
            goods = Object.values(JSON.parse(JSON.stringify(rows)))

            return res(goods)
          })
        })
      }

      const detailsPromise = () => {
        return new Promise((res, rej) => {
          connection.query('SELECT `idDetails` AS `id` FROM `details`', (err, rows) => {
            if (err) {
              throw err
            }
            goods = Object.values(JSON.parse(JSON.stringify(rows)))

            return res(goods)
          })
        })
      }

      const materialsPromise = () => {
        return new Promise((res, rej) => {
          connection.query('SELECT `idMaterials` AS `id` FROM `materials', (err, rows) => {
            if (err) {
              throw err
            }
            goods = Object.values(JSON.parse(JSON.stringify(rows)))

            return res(goods)
          })
        })
      }

      const promises = [goodsPromise(), detailsPromise(), materialsPromise()]

      const detailsGoods = []
      const materialsDetails = []

      try {
        let data = await Promise.all(promises)

        connection.end()

        goods = data[0]
        details = data[1]
        materials = data[2]

        for (const good of goods) {
          const n = Math.floor(Math.random() * (10) + 3)

          for (let i = 0; i < n; i++) {
            const m = Math.floor(Math.random() * details.length)

            detailsGoods.push([
              null,
              Math.floor(Math.random() * (30) + 1),
              good.id,
              details[m].id
            ])
          }

        }

        for (const detail of details) {

          const n = Math.floor(Math.random() * (10) + 3)

          for (let i = 0; i < n; i++) {
            const m = Math.floor(Math.random() * details.length)

            materialsDetails.push([
              null,
              Math.floor(Math.random() * (30) + 1),
              detail.id,
              materials[m].id
            ])
          }
        }

      } catch (e) {
        console.log(e)
      }

      connection = initializeConnection(configDB)

      connection.query('INSERT INTO `details - goods` (`id`, `count`, `idDetails`, `idGoods`) VALUES ?', [detailsGoods], (err) => {if (err) throw err})
      connection.query('INSERT INTO `materials - details` (`id`, `count`, `idMaterials`, `idDetails`) VALUES ?', [materialsDetails], (err) => {if (err) throw err})

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