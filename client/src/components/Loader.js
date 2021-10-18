import {Spin} from "antd"
import '../styles/Loader.scss'

export const Loader = () => {

  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  )
}