import { message, Row, Col } from 'antd'
import '../styles/Generator.scss'
import {FormGenerator} from "./FormGenerator"
import {generateDetails} from "../functions/generateDetails"
import {useCallback, useEffect, useState} from "react"
import {ViewData} from "./ViewData";
import {generateGoods} from "../functions/generateGoods";
import {generateMaterials} from "../functions/generatorMaterials";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";

export const Generator = () => {

  const [form, setForm] = useState({
    count: 1000,
    tables: {
      goods: false,
      details: false,
      materials: false
    }
  })

  const [goods, setGoods] = useState([])
  const [details, setDetails] = useState([])
  const [materials, setMaterials] = useState([])

  const handleTruncate = (e) => {
    fetchTruncate()
  }

  const handleGenerate = (e) => {

    setGoods([])
    setDetails([])
    setMaterials([])

    if (form.tables.goods) {
      setGoods(generateGoods(form.count))
    }

    if (form.tables.details) {
      setDetails(generateDetails(form.count))
    }

    if (form.tables.materials) {
      setMaterials(generateMaterials(form.count))
    }

    message.success('Данные сгенерированы!');
  }

  const {loading, error, request, clearError} = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  const fetchTruncate = useCallback(async () => {
    try {
      const fetched = await request('/api/truncate', 'POST')

      if (fetched.success === true) {
        message.success('Таблицы были очищены!');
      } else {
        message.error('Что-то пошло не так, попробуйте позже ...');
      }

    } catch (e) {}
  }, [request])

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/links', 'POST')

      if (fetched.success === true) {
        message.success('Связи были установлены!');
      } else {
        message.error('Что-то пошло не так, попробуйте позже ...');
      }

    } catch (e) {}
  }, [request])

  const handleLinksGenerate = () => {
    fetchLinks()
  }

  const fetchData = useCallback(async (goods, details, materials) => {
    try {
      const fetched = await request('/api/add', 'POST', {
        goods,
        details,
        materials
      })

      if (fetched.success === true) {
        message.success('Данные добавлены в базу данных!');
      } else {
        message.error('Что-то пошло не так, попробуйте позже ...');
      }

    } catch (e) {}
  }, [request])

  const sendData = () => {
    fetchData(goods, details, materials)
  }

  return (
    <div className="generator">

      <Row>
        <Col span={24}>
          <header className="generator__header">

            <h1 className="generator__title">Генератор данных</h1>

          </header>
        </Col>
      </Row>

      <Row className="generator__main">

        { loading ? <Loader /> : null}

        <Col span={12}>

          <FormGenerator
            handleGenerate={handleGenerate}
            handleLinksGenerate={handleLinksGenerate}
            handleTruncate={handleTruncate}
            setForm={setForm}
            form={form}
          />

        </Col>

        <Col span={24}>

          <ViewData
            goods={goods}
            details={details}
            materials={materials}
            sendData={sendData}
          />

        </Col>
      </Row>

    </div>
  )
}