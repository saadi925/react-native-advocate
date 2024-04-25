import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function SendIcon({
    size = 32
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" id="send"><Path fill="#4479d8" d="M14.707 9.293a1 1 0 0 0-1.414 0l-3 3a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414Z"></Path><path fill="#231f20" d="M21.707 2.293a1 1 0 0 0-1.069-.225l-18 7a1 1 0 0 0 .011 1.868l7.574 2.84 2.84 7.575a1 1 0 0 0 .931.648H14a1 1 0 0 0 .932-.638l7-18a1 1 0 0 0-.225-1.068Zm-7.69 15.9-2.081-5.549a1 1 0 0 0-.585-.585L5.8 9.983l13.444-5.227Z"></path></Svg>
  )
}
