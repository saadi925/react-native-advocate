import React from 'react'
import { G, Path, Svg } from 'react-native-svg'
import { COLORS } from '../../../config/constants'

export  function SendIcon({
    size = 32
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" id="send"><Path fill="#4479d8" d="M14.707 9.293a1 1 0 0 0-1.414 0l-3 3a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414Z"></Path><Path  fill={COLORS.surface} d="M21.707 2.293a1 1 0 0 0-1.069-.225l-18 7a1 1 0 0 0 .011 1.868l7.574 2.84 2.84 7.575a1 1 0 0 0 .931.648H14a1 1 0 0 0 .932-.638l7-18a1 1 0 0 0-.225-1.068Zm-7.69 15.9-2.081-5.549a1 1 0 0 0-.585-.585L5.8 9.983l13.444-5.227Z"></Path></Svg>
  )
}



export default function BottomIcon({
  size =24
}) {
  return (
    <Svg width={size} height={size}  viewBox="0 0 32 32" id="bottom-left-arrow"><G><Path fill="#72b6fa" d="M25.55,15.24,21,12.5,19.3,3.84,18.66.54,6.8,22.44l24.64-3.65Z"></Path><Path fill="#478df8" d="M25.55,15.24A6.5,6.5,0,0,1,19.3,3.84L21,12.5Z"></Path></G></Svg>
  )
}
