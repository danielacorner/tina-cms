import { graphql, navigate } from "gatsby"

import React, { useState } from "react"

import { ControlledEditor } from "@monaco-editor/react"
import styled from "styled-components/macro"
import { useHistory } from "react-router-dom"
import { useLocalJsonForm, useGlobalJsonForm } from "gatsby-tinacms-json"
import ControlsSection from "../components/Controls"

// import qs from "query-string";

const AppStyles = styled.div`
  * {
    box-sizing: border-box;
  }
`

export default ({ data, location }) => {
  const [{ author, social }] = useLocalJsonForm(data.author, {
    label: "Author bio",
    fields: [
      { name: "rawJson.author", label: "Author Name", component: "text" },

      {
        name: "rawJson.social",
        label: "Social Info",
        component: "group",
        fields: [{ label: "@Twitter", name: "twitter", component: "text" }],
      },
    ],
  })
  console.log("⚡🚨: data", data)
  // const parsed = qs.parse(window.location.search);
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/hooks.md#uselocation
  // console.log("⚡🚨: parsed", parsed);
  const [value, setValue] = useState(decodeURI(location.search.slice(1))) // slice off the question mark
  console.log("⚡🚨: location", location)
  const [isLightTheme, setIsLightTheme] = useState(false)

  const handleEditorChange = (ev, value) => {
    setValue(value)
    navigate(`/?${encodeURI(value)}`, { replace: true })
  }
  const handleBuild = () => {
    navigate(`/deck-preview?${encodeURI(value)}`)
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
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    author: dataJson(pk: { eq: "author" }) {
      title
      author
      description
      siteUrl
      social {
        twitter
      }
      ###############
      # Tina Fields #
      ###############
      fileRelativePath
      rawJson
    }
  }
`
