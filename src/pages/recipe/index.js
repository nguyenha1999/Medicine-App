import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button, notification } from "antd"
import ParentSize from "@visx/responsive/lib/components/ParentSize"

import Layout from "../../layout/layout"
import ConfirmModal from "../../component/ConfirmModal"
import RecipeGroup from "./RecipeGroup"
import { remove } from "../../api/recipe"

import style from "./style"

const Recipe = () => {
  const history = useHistory()
  const { id } = useParams()
  const [visible, setVisible] = useState(false)

  const onRemove = async () => {
    try {
      await remove(id)
      notification.success({
        message: "Remove recipe successfully",
      })
      history.push("/")
    } catch (err) {
      notification.error({
        message: err.message,
      })
    }
  }

  return (
    <Layout>
      <div style={style.container}>
        <div style={style.header}>
          <h2>{!!id ? "Recipe" : "Create recipe"}</h2>
          {!!id && (
            <Button size="small" type="danger" onClick={() => setVisible(true)}>
              Remove this recipe
            </Button>
          )}
        </div>
        <ParentSize>
          {({ width, height }) => <RecipeGroup width={width} height={height} />}
        </ParentSize>
      </div>
      <ConfirmModal
        visible={visible}
        title="Remove confirmation"
        message="Do you want to remove this recipe?"
        onOk={onRemove}
        onCancel={() => setVisible(false)}
      />
    </Layout>
  )
}

export default Recipe
