import './index.css'
import { render } from 'solid-js/web'

import App from './view'

import { Replay } from './replay'

export default function VChessreplay(element: HTMLElement, options = {}) {

  let replay = new Replay(_ => options.on_hover?.(_))
  render(App(replay), element)

  return {
    set moves(moves: Array<Move>) {
      replay.moves = moves
    }
  }
}
