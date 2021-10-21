import {useEffect, useState} from "react"
import {Button, Checkbox, Input, Form, InputNumber, Popconfirm} from "antd"
import '../styles/FormGenerator.scss'

const CheckboxGroup = Checkbox.Group
const plainOptions = ['Изделия', 'Детали', 'Материалы']

export const FormGenerator = (props) => {

  const onChange = list => {
    const tables = {
      goods: false,
      details: false,
      materials: false
    }

    if (list.includes('Изделия')) {
      tables.goods = true
    }

    if (list.includes('Детали')) {
      tables.details = true
    }

    if (list.includes('Материалы')) {
      tables.materials = true
    }

    props.setForm({
      ...props.form,
      tables: tables
    })
  }

  return (
    <div className="form">

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Выберете таблицы:"
          name="tables"
          rules={[{ required: true, message: 'Выберете таблицы' }]}
        >
          <CheckboxGroup options={plainOptions} onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Количество записей:"
          name="count"
          //rules={[{ required: true, message: 'Введите количество записей' }]}
        >
          <InputNumber
            min={1}
            max={100000}
            defaultValue={1000}
            onChange={n => props.setForm({
              ...props.form,
              count: n
            })}
          />
        </Form.Item>

        <Form.Item className="form__buttons">
          <Button
            type="primary"
            htmlType="submit"
            onClick={props.handleGenerate}
          >
            Сгенерировать данные
          </Button>

          <Button
            type="primary"
            ghost
            onClick={props.handleLinksGenerate}
          >
            Сгенерировать связи
          </Button>


          <Popconfirm
            placement="top"
            className="confirm"
            title={'Вы уверены что хотите очистить таблицы  базы данных, это приведет к потере всех данных?'}
            onConfirm={props.handleTruncate}
            okText="Да"
            cancelText="Нет">

            <Button
              type="primary"
              danger
              ghost
            >
              Очистить таблицы
            </Button>

          </Popconfirm>

        </Form.Item>
      </Form>

    </div>
  )
}