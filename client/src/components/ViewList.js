import {Button, Table} from "antd"
import '../styles/ViewList.scss'

const detailsColumns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Общая цена материалов',
    dataIndex: 'price',
    key: 'price',
  }
]

export const ViewList = (props) => {
  return (
    <div className="view-list">

      <div className="flex">

        <h2>Результаты запроса</h2>

        <div className="view-list__buttons">

          <Button
            type="primary"
            danger
            ghost
            onClick={e => props.setList([])}
          >
            Удалить результаты запроса
          </Button>

        </div>

      </div>

      <Table columns={detailsColumns} dataSource={props.list} />

    </div>
  )
}