import React, { useState } from "react"
import styled from "styled-components/macro"
import { useEventListener } from "../utils/customHooks"

const SlideStyles = styled.div`
  height: 100vh;
  width: 100vw;
  background: hsla(0, 0%, 10%, 1);
  color: white;
  display: grid;
  place-items: center;
  font-size: 3em;
  font-family: "Sen", sans-serif;
`

export default function Deck({ location, ...props }) {
  console.log("⚡🚨: Deck -> props", props)

  const deckData = location.search.slice(1)
  const deckDataDecoded = decodeURI(deckData)

  const slides = deckDataDecoded.split("---")

  const [slideIndex, setSlideIndex] = useState(0)

  const handleKeyDown = event => {
    console.log("⚡🚨: handleKeyDown -> event", event)
    if (event.key === "ArrowRight") {
      setSlideIndex(slideIndex + 1)
    }
    if (event.key === "ArrowLeft") {
      setSlideIndex(slideIndex - 1)
    }
  }

  useEventListener("keydown", handleKeyDown)

  return (
    <div>
      <SlideStyles dangerouslySetInnerHTML={{ __html: slides[slideIndex] }} />
    </div>
  )
}
