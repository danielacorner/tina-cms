import React, { useState } from "react"
import styled from "styled-components/macro"
import { useEventListener } from "../utils/customHooks"
import { useSwipeable } from "react-swipeable"

const SlideStyles = styled.div`
  height: 100vh;
  width: 100vw;
  background: hsla(0, 0%, 10%, 1);
  color: white;
  display: grid;
  place-items: center;
  font-size: 3em;
  font-family: "Sen", sans-serif;
  user-select: none;
`

export default function Deck({ deckData, location, ...props }) {
  console.log("⚡🚨: Deck -> props", props)

  const deckDataFromLocation = location && location.search.slice(1)
  const deckDataDecoded = deckData || decodeURI(deckDataFromLocation)

  const slides = deckDataDecoded.split("---")
  console.log("⚡🚨: Deck -> slides", slides)

  const [slideIndex, setSlideIndex] = useState(0)

  const stepBack = () => setSlideIndex(slideIndex - 1)
  const stepForward = () => setSlideIndex(slideIndex + 1)

  const handleKeyDown = event => {
    console.log("⚡🚨: handleKeyDown -> event", event)
    if (event.key === "ArrowRight") {
      stepForward()
    }
    if (event.key === "ArrowLeft") {
      stepBack()
    }
  }

  useEventListener("keydown", handleKeyDown)

  const swipeConfig = {
    trackMouse: true, // track mouse input
    preventDefaultTouchmoveEvent: true,
  }
  const swipeHandlers = useSwipeable({
    onSwipedLeft: stepBack,
    onSwipedRight: stepForward,
    ...swipeConfig,
  })

  return (
    <div {...swipeHandlers}>
      <SlideStyles dangerouslySetInnerHTML={{ __html: slides[slideIndex] }} />
    </div>
  )
}
