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

      connection = initializeConnection(configDB)

      connection.query('SET FOREIGN_KEY_CHECKS = 0;', (err, rows) => {

        connection.query('TRUNCATE TABLE `details - goods`;', (err) => {if (err) {throw err}})
        connection.query('TRUNCATE TABLE `materials - details`;', (err) => {if (err) {throw err}})
        connection.query('TRUNCATE TABLE `goods`;', (err) => {if (err) {throw err}})
        connection.query('TRUNCATE TABLE `details`;', (err) => {if (err) {throw err}})
        connection.query('TRUNCATE TABLE `materials`;', (err) => {if (err) {throw err}})

        connection.query('SET FOREIGN_KEY_CHECKS = 0;', (err) => {if (err) {throw err}})

        connection.end()

        if (err) {
          throw err
        }

        res.json({
          success: true
        })
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })

export default router