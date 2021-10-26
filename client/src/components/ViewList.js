import {Button, Table} from "antd"
import '../styles/ViewList.scss'
import {Loader} from "./Loader";

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

const goodsColumns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Масса материала',
    dataIndex: 'count',
    key: 'count',
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
            disabled={props.loading}
          >
            Удалить результаты запроса
          </Button>

        </div>

      </div>

      <div className="view-list__wrapper">

        {
          props.loading &&
            <Loader />
        }

        {
          props.type &&
          <Table columns={props.type === 'details' ? detailsColumns : props.type === 'goods' ? goodsColumns : null} dataSource={props.list} />
        }

      </div>


    </div>
  )
}