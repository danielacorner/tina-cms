import { graphql } from "gatsby"

import React, { useState } from "react"

import { ControlledEditor } from "@monaco-editor/react"
import styled from "styled-components/macro"
import { Switch, Button } from "@material-ui/core"
import useReactRouter from "use-react-router"
// import qs from "query-string";

const CONTROLS_HEIGHT = 20
const AppStyles = styled.div`
  * {
    box-sizing: border-box;
  }
  .controls {
    /* position: relative;
    height: ${CONTROLS_HEIGHT}px;
    display: flex;
    padding: 0.5em;
    align-items: center;
    justify-content: space-around; */
  }
  .buildBtn {
    position: fixed;
    bottom: ${CONTROLS_HEIGHT}px;
    right: ${CONTROLS_HEIGHT}px;
    z-index: 999;
  }
  .themeSwitch {
    z-index: 999;
    position: fixed;
    bottom: ${CONTROLS_HEIGHT}px;
    left: ${CONTROLS_HEIGHT}px;
    .dark {
      color: white;
    }
    .light {
      color: black;
    }
  }
`

export default ({ data }) => {
  console.log("⚡🚨: data", data)
  // const parsed = qs.parse(window.location.search);
  const { location, history } = useReactRouter()
  // console.log("⚡🚨: parsed", parsed);
  const [value, setValue] = useState(decodeURI(location.search.slice(1))) // slice off the question mark
  console.log("⚡🚨: location", location.search)
  const [isLightTheme, setIsLightTheme] = useState(false)

  const handleEditorChange = (ev, value) => {
    setValue(value)
    history.push(`/?${encodeURI(value)}`)
  }
  const handleBuild = () => {
    history.push(`/deck/${encodeURI(value)}`)
  }

  return (
    <AppStyles>
      <ControlsSection
        setIsLightTheme={setIsLightTheme}
        handleBuild={handleBuild}
      ></ControlsSection>
      <ControlledEditor
        value={value}
        onChange={handleEditorChange}
        height={`100vh`}
        language="markdown"
        theme={isLightTheme ? "light" : "dark"}
        options={{ wordWrap: "on" }}
      />
    </AppStyles>
  )
}

const ThemeSwitch = ({ setIsLightTheme }) => (
  <div className="themeSwitch">
    <span className="dark">Dark</span>{" "}
    <Switch onChange={() => setIsLightTheme(prev => !prev)} />{" "}
    <span className="light">Light</span>
  </div>
)

function ControlsSection({ setIsLightTheme, handleBuild }) {
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slugz
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
