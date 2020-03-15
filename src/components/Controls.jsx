import React from "react"
import { Switch, Button } from "@material-ui/core"
import styled from "styled-components/macro"

const CONTROLS_HEIGHT = 20

const ControlsStyles = styled.div`
  .themeSwitch {
    z-index: 999;
    position: fixed;
    bottom: ${CONTROLS_HEIGHT}px;
    left: ${CONTROLS_HEIGHT}px;
    .dark {
      color: black;
    }
    .light {
      color: white;
    }
  }
  .buildBtn {
    position: fixed;
    bottom: ${CONTROLS_HEIGHT}px;
    right: ${CONTROLS_HEIGHT}px;
    z-index: 999;
  }
`

export default function ControlsSection({ setIsLightTheme, handleBuild }) {
  return (
    <ControlsStyles className="controls">
      <div className="themeSwitch">
        <span className="dark">Dark</span>{" "}
        <Switch onChange={() => setIsLightTheme(prev => !prev)} />{" "}
        <span className="light">Light</span>
      </div>
      <div className="buildBtn">
        <Button variant="contained" color="primary" onClick={handleBuild}>
          Build
        </Button>
      </div>
    </ControlsStyles>
  )
}
