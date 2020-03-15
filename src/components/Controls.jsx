import React from "react"
import { Button } from "@material-ui/core"
import styled from "styled-components/macro"

const CONTROLS_HEIGHT = 20

const ControlsStyles = styled.div`
  .btnsWrapper {
    position: fixed;
    bottom: ${CONTROLS_HEIGHT}px;
    right: ${CONTROLS_HEIGHT}px;
    z-index: 999;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 12px;
  }
`

export default function ControlsSection({
  handleBuild,
  handleEdit,
  isEditing,
}) {
  return (
    <ControlsStyles className="controls">
      <div className="btnsWrapper">
        <Button variant="contained" color="primary" onClick={handleEdit}>
          {isEditing ? "Preview" : "Edit"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleBuild}>
          Build
        </Button>
      </div>
    </ControlsStyles>
  )
}
