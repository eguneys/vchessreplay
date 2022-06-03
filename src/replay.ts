import { createEffect, createSignal, createMemo, mapArray } from 'solid-js'
import { read, write, owrite } from './play'

export class Replay {

  get tree() {
    return this.a_moves.tree
  }

  set moves(moves: Array<Moves>) {
    this.a_moves.moves = moves
  }

  constructor() {
    this.a_moves = make_moves()


    this.moves = [
      'pa',
      'path', 
      'path', 
      'path',
      'path',
      'path', 
      'path',
      'path {A little comment}', ]
  }
}

const make_move = (_path: string) => {
  let _comments = _path.match(/([^ ]*) \{([^\}]*)\}/)
  let comments,
    path
  if (_comments) {
    path = _comments[1]
    comments = _comments[2]
  } else {
    path = _path
  }

  let base = path.slice(0, -2),
  move = path.slice(-2)

  return {
    path,
    base,
    move,
    comments
  }
}

const make_moves = () => {
  let _moves = createSignal([])

  let a_moves = createMemo(mapArray(_moves[0], make_move))

  function make_nodes(path: string) {
    return createMemo(() => 
      a_moves().filter(_ => _.base === path).map(a_move => ({
        a_move,
        m_cs: make_nodes(a_move.path)
      })))
  }

  let m_tree = make_nodes('')

  return {
    get tree() {
      return m_tree()
    },
    set moves(moves: Array<Move>) {
      owrite(_moves, moves)
    }
  }
}
