import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function FlagIcon({
    size = 24,
}) {
  return (
    // @ts-ignore
    <Svg width={size} height={size} viewBox="0 0 36 36"  aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet"><Path fill="#004600" d="M32 5H9v26h23a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4zm-9.5 20.472a7.5 7.5 0 0 1-7.5-7.5c0-3.72 2.711-6.799 6.263-7.39A6.496 6.496 0 0 0 24 22.972a6.496 6.496 0 0 0 5.89-3.763c-.591 3.553-3.67 6.263-7.39 6.263zm5.11-10.424l-1.213 2.022l-.208-2.349l-2.298-.528l2.17-.924l-.207-2.349l1.548 1.779l2.17-.924l-1.212 2.023l1.548 1.779l-2.298-.529z"></Path><Path fill="#EEE" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h5V5H4z"></Path><Path fill="#FFF" d="M29.572 11.775l-2.17.924l-1.548-1.779l.207 2.349l-2.17.924l2.298.528l.208 2.349l1.213-2.022l2.298.529l-1.548-1.779z"></Path><Path fill="#FFF" d="M24 22.972a6.496 6.496 0 0 1-2.737-12.39c-3.552.592-6.263 3.671-6.263 7.39a7.5 7.5 0 0 0 7.5 7.5c3.72 0 6.799-2.711 7.39-6.263A6.494 6.494 0 0 1 24 22.972z"></Path></Svg>
  )
}
