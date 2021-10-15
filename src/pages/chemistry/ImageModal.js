import React from "react"
import { Modal } from "antd"

import style from "./style"

const ImageModal = ({ imageUrl, setImageUrl }) => {
  return <Modal 
    title="Chemistry image" 
    visible={!!imageUrl} 
    onCancel={() => setImageUrl(null)}
    footer={null}
  >
    <div style={style.modalContainer}>
      {imageUrl && <img src={imageUrl} style={style.image} alt="chemistry-image" />}
    </div>
  </Modal>
}

export default ImageModal