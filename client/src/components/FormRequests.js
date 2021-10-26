import '../styles/FormRequests.scss'
import {useHttp} from "../hooks/http.hook"
import {useCallback, useEffect, useState} from "react"
import {message, Select} from "antd"

const { Option } = Select

export const FormRequests = (props) => {

  const [listGoods, setListGoods] = useState([])
  const [listMaterials, setListMaterials] = useState([])

  const {loading, error, request, clearError} = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  const fetchListGoods = useCallback(async () => {
    try {
      const fetched = await request('/api/data/list/goods', 'POST')
      setListGoods(fetched)
    } catch (e) {}
  }, [request])

  const fetchListMaterials = useCallback(async () => {
    try {
      const fetched = await request('/api/data/list/materials', 'POST')
      console.log(fetched)
      setListMaterials(fetched)
    } catch (e) {}
  }, [request])

  const fetchDetails = useCallback(async (id) => {
    try {
      const fetched = await request('/api/data/details', 'POST', {id})

      if (fetched && fetched.length > 0) {
        message.success('Запрос выполнен!');
        props.setList(fetched)
      } else {
        message.error('Что-то пошло не так, попробуйте позже ...');
      }
    } catch (e) {}
  }, [request])

  const fetchGoods = useCallback(async (id) => {
    try {
      const fetched = await request('/api/data/goods', 'POST', {id})

      if (fetched && fetched.length > 0) {
        message.success('Запрос выполнен!');
        props.setList(fetched)
      } else {
        message.error('Что-то пошло не так, попробуйте позже ...');
      }
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchListGoods()
  }, [fetchListGoods])

  useEffect(() => {
    fetchListMaterials()
  }, [fetchListMaterials])

  const handleChangeSelectDetails = (id) => {
    console.log('details id', id)
    props.setType('details')
    fetchDetails(id)
  }

  const handleChangeSelectGoods = (id) => {
    console.log('goods id', id)
    props.setType('goods')
    fetchGoods(id)
  }

  useEffect(() => {
    props.setLoading(loading)
  }, [loading])

  return (
    <div className="form-requests">

      <h2 className="form-requests__title">Запросы</h2>

      <div className="form-requests__wrapper">

        <div className="form-requests__block">

          <div className="form-requests__title">
            Поиск деталей по изделию со стоимостью материалов
          </div>

          <div>

            <Select className="form-requests__select" defaultValue="Выберете изделие" onChange={handleChangeSelectDetails}>
              {
                listGoods && listGoods.length > 0 && listGoods.map((el, i) => (
                  <Option
                    key={i}
                    value={el.id}
                  >
                    {el.name}
                  </Option>
                ))
              }
            </Select>

          </div>

        </div>

        <div className="form-requests__block">

          <div className="form-requests__title">
            Поиск изделий по материалу, из которых они изготовлены
          </div>

          <div>

            <Select className="form-requests__select" defaultValue="Выберете изделие" onChange={handleChangeSelectGoods}>
              {
                listMaterials && listMaterials.length > 0 && listMaterials.map((el, i) => (
                  <Option
                    key={i}
                    value={el.idMaterials}
                  >
                    {el.name}
                  </Option>
                ))
              }
            </Select>

          </div>

        </div>

      </div>

    </div>
  )
}