import '../styles/FormRequests.scss'
import {useHttp} from "../hooks/http.hook"
import {useCallback, useEffect, useState} from "react"
import {message, Select} from "antd"

const { Option } = Select

export const FormRequests = (props) => {

  const [list, setList] = useState([])

  const {loading, error, request, clearError} = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  const fetchList = useCallback(async () => {
    try {
      const fetched = await request('/api/data/list', 'POST')
      setList(fetched)
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

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const handleChangeSelect = (id) => {
    fetchDetails(id)
  }

  return (
    <div className="form-requests">

      <h2 className="form-requests__title">Запросы</h2>

      <div className="form-requests__wrapper">

        <div className="form-requests__block">

          Поиск деталей по изделию со стоимостью материалов

          <div className="">

            <Select className="form-requests__select" defaultValue="Выберете изделие" onChange={handleChangeSelect}>
              {
                list && list.length > 0 && list.map((el, i) => (
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

      </div>

    </div>
  )
}