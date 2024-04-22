import React from 'react'
import { Svg ,Path} from 'react-native-svg'

export default function CaseIcon({size=32}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" id="breifcase"><Path fill="none" stroke="#000" stroke-miterlimit="10" d="M16.5 15.5h-12c-.5 0-1-.4-1-1v-7c0-.6.5-1 1-1h12c.5 0 1 .5 1 1v7c0 .6-.5 1-1 1z"></Path><Path d="M13 6.5c-.3 0-.5-.2-.5-.5V5h-4v1c0 .3-.2.5-.5.5s-.5-.2-.5-.5V4.5c0-.3.2-.5.5-.5h5c.3 0 .5.2.5.5V6c0 .3-.2.5-.5.5z"></Path><Path fill="none" stroke="#000" stroke-miterlimit="10" d="M11.5 10.5h5c.6 0 1-.4 1-1M3.5 9.5c0 .6.4 1 1 1H9"></Path><Path fill="none" stroke="#000" stroke-miterlimit="10" d="M12 11c0 .3-.2.5-.5.5h-2c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1z"></Path></Svg>
  )
}
