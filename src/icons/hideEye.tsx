import React from 'react'
import { Svg, LinearGradient, Path, Stop, G, Circle } from 'react-native-svg'

export default function hideEye({size =32 , fill = '#fff'}) {
  return (
    <Svg width={size} height={size}  fill={fill} enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="hide"><LinearGradient id="a" x1=".01" x2="23.327" y1="12" y2="12" gradientUnits="userSpaceOnUse"><Stop offset="0" stop-color="#1f4c73"></Stop><Stop offset="1" stop-color="#6dbff2"></Stop></LinearGradient><Path fill="url(#a)" d="M18.4,7l3.3-3.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L16.6,6c-1.4-0.6-3-1-4.6-1c-4.4,0-8.4,2.7-9.9,6.6
	c-0.1,0.2-0.1,0.5,0,0.7c0.7,1.9,2,3.5,3.6,4.6l-3.3,3.3c-0.4,0.4-0.4,1,0,1.4C2.5,21.9,2.7,22,3,22s0.5-0.1,0.7-0.3L7.4,18
	c1.4,0.6,3,1,4.6,1c4.4,0,8.4-2.7,9.9-6.6c0.1-0.2,0.1-0.5,0-0.7C21.2,9.8,20,8.2,18.4,7z"></Path></Svg>
  )
}



export  function ShowEye({size = 32 , fill = '#fff'}) {
  return (
    <Svg width={size} height={size} fill={fill} viewBox="0 0 33.91 23.12" id="show-eye"><G><G><Path d="M17 0A18.23 18.23 0 0 0 0 11.56a18.21 18.21 0 0 0 33.91 0A18.22 18.22 0 0 0 17 0Zm0 20a15 15 0 0 1-13.6-8.48 15.14 15.14 0 0 1 27.19 0A15 15 0 0 1 17 20Z"></Path><Circle cx="16.96" cy="11.56" r="6.94"></Circle></G></G></Svg>
  )
}
