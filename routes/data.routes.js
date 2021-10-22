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

// /api/data/list
router.post(
  '/list',
  [],
  async (req, res) => {
    try {
      let connection

      connection = initializeConnection(configDB)

      connection.query('SELECT `idGoods`, `name` FROM `goods`', (err, rows) => {
        connection.end()

        if (err) {
          throw err
        }

        res.status(200).json(rows)

      })


    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /api/data/details
router.post(
  '/details',
  [],
  async (req, res) => {
    try {
      let connection

      connection = initializeConnection(configDB)

      connection.query(
        'SELECT `details - goods`.`idGoods`, `details`.`name`, (SELECT SUM(`materials`.`price`) FROM `materials - details` RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials` WHERE `materials - details` .`idDetails` = `details - goods`.`idDetails`) AS `price`' +
        ' FROM `details - goods`' +
        ' RIGHT JOIN `details` ON `details - goods`.`idDetails` = `details`.`idDetails`' +
        ' WHERE `details - goods`.`idGoods` = ' + req.body.id +
        ' ORDER BY `details`.`name`',
        (err, rows) => {
        connection.end()

        if (err) {
          throw err
        }

        res.status(200).json(rows)

      })


    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })

export default router

/*

SELECT `details - goods`.`idGoods`, `details`.`name`, `materials`.`name`, `materials`.`price`
FROM `details - goods`
RIGHT JOIN `details` ON `details - goods`.`idDetails` = `details`.`idDetails`
RIGHT JOIN `materials - details` ON `details`.`idDetails` = `materials - details`.`idDetails`
RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials`
WHERE `details - goods` .`idGoods` = 13
ORDER BY `details - goods`.`idGoods`

SELECT `details - goods`.`idGoods`, `details`.`name`
FROM `details - goods`
RIGHT JOIN `details` ON `details - goods`.`idDetails` = `details`.`idDetails`
ORDER BY `details - goods`.`idGoods`

SELECT * FROM `materials - details`
RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials`
WHERE `materials - details` .`idDetails` = 5

SELECT SUM(`materials`.`price`) FROM `materials - details`
RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials`
WHERE `materials - details` .`idDetails` = 5
 ================ 393

SELECT `details - goods`.`idGoods`, `details`.`name`, (SELECT SUM(`materials`.`price`) FROM `materials - details` RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials` WHERE `materials - details` .`idDetails` = `details - goods`.`idDetails`) AS `price`
FROM `details - goods`
RIGHT JOIN `details` ON `details - goods`.`idDetails` = `details`.`idDetails`
ORDER BY `details`.`name`

SELECT `details - goods`.`idGoods`, `details`.`name`, (SELECT SUM(`materials`.`price`) FROM `materials - details` RIGHT JOIN `materials` ON `materials - details`.`idMaterials` = `materials`.`idMaterials` WHERE `materials - details` .`idDetails` = `details - goods`.`idDetails`) AS `price`
FROM `details - goods`
RIGHT JOIN `details` ON `details - goods`.`idDetails` = `details`.`idDetails`
WHERE `details - goods`.`idGoods` = 5
ORDER BY `details`.`name`

 */