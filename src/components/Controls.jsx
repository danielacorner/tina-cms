import React from "react"
import { Switch, Button } from "@material-ui/core"

const ThemeSwitch = ({ setIsLightTheme }) => (
  <div className="themeSwitch">
    <span className="dark">Dark</span>{" "}
    <Switch onChange={() => setIsLightTheme(prev => !prev)} />{" "}
    <span className="light">Light</span>
  </div>
)
export default function ControlsSection({ setIsLightTheme, handleBuild }) {
  return (
    <div className="controls">
      <ThemeSwitch setIsLightTheme={setIsLightTheme}></ThemeSwitch>
      <div className="buildBtn">
        <Button variant="contained" color="primary" onClick={handleBuild}>
          Build
        </Button>
      </div>
    </div>
  )
}
