import { Row, Col } from 'antd'
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

  useEffect(() => {
    console.log(goods)
  }, [goods])

  const handleGenerate = (e) => {

    console.log(form)

    if (form.tables.goods) {
      setGoods(generateGoods(form.count))
    }

    if (form.tables.details) {
      setDetails(generateDetails(form.count))
    }

    if (form.tables.materials) {
      setMaterials(generateMaterials(form.count))
    }

  }

  const {loading, error, request, clearError} = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/links', 'POST')

      console.log('Данные отправлены - связи', fetched)

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

      console.log('Данные отправлены', fetched)

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