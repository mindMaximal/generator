import {Button, Collapse, Space, Table} from "antd"
import '../styles/ViewData.scss'

const { Panel } = Collapse

export const ViewData = (props) => {

  const detailsColumns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Производитель',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Цвет',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Гарантия',
      dataIndex: 'guarantee',
      key: 'guarantee',
    }
  ]

  const goodsColumns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Производитель',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    }
  ]

  const materialsColumns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена за грамм',
      dataIndex: 'price',
      key: 'price',
    }
  ]

  return (
    <div className="view-data">

      <div className="flex">

        <h2>Сгенерированные данные</h2>

        <div className="view-data__buttons">
          <Space size={'small'}>
            <Button
              type="primary"
              onClick={props.sendData}
            >
              Добавить в базу данных
            </Button>

            <Button
              type="primary"
              danger
              ghost
              onClick={props.clearData}
            >
              Очистить данные
            </Button>
          </Space>
        </div>

      </div>

      <Collapse accordion>

        {
          props.goods && props.goods.length > 0 ?
            <Panel header="Изделия" key="1">

              <Table columns={goodsColumns} dataSource={props.goods} />

            </Panel>
            : null
        }

        {
          props.details && props.details.length > 0 ?
            <Panel header="Детали" key="2">

              <Table columns={detailsColumns} dataSource={props.details} />

            </Panel>
            : null
        }

        {
          props.materials && props.materials.length > 0 ?
            <Panel header="Материалы" key="3">

              <Table columns={materialsColumns} dataSource={props.materials} />

            </Panel>
            : null
        }

      </Collapse>
    </div>
  )
}