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
      'd4 d4',
      'd4d5 d5',
      'd4d5f4 Bf4',
      'd4d5f4c5 c5',
      'd4d5f4c5e3 e3',
      'd4d5f4c5e3d4 cxd4',
      'd4d5f4c5e3d4d4 exd4',
      'd4d5f4c5e3b6 Qb6',
      'd4d5f4c5e3b6c3 Nc3',
      'd4d5f4c5e3b6c3e6 e6',
      'd4d5f4c5e3b6c3e6f3 Nf3',
      'd4d5f4c5e3b6c3e6f3e7 Be7 { Hello world }',
      'd4d5f4c5e3b6c3e6f3c4 c4',

      'd4d5f4c5e3b6c3e6f3e7a5 a5 { What s up ok ok ok ook }',
      'd4d5f4c5e3b6c3e6f3e7a5d8 Qd8',


      'd4d5f4c5e3b6c3e6f3c4b3 b3',
      'd4d5f4c5e3b6c3e6f3c4b3b5 b5',

      'd4d5f4c5e3b6c3e6f3c4b3b5b1 Rb1',
      'd4d5f4c5e3b6c3e6f3c4b3b5b1a5 Qa5',

      'd4d5f4c5e3b6c3e6f3c4b3b5b1a5b7 Rxb7',
      'd4d5f4c5e3b6c3e6f3c4b3b5b1a5b7c3 Qxc3',

      'd4d5f4c5e3b6c3e6f3c4b3b5b1a5c4 Bxc4',
      'd4d5f4c5e3b6c3e6f3c4b3b5b1a5c4c7 Qxc7',


      'd4d5f4c5e3b6c3e6f3c4b3b5b1d7 Qd7',
      'd4d5f4c5e3b6c3e6f3c4b3b5b1d7e5 Ne5',
    ]
  }
}

const make_move = (_path: string) => {
  let _comments = _path.match(/([^ ]*) ([^ ]*) \{([^\}]*)\}/)
  let comments,
    path,
    move
  if (_comments) {
    path = _comments[1]
    move = _comments[2]
    comments = _comments[3]
  } else {
    [path, move] = _path.split(' ')
  }

  let base = path.length === 2 ? '' : path.slice(0, -2)

  let ply = path.length / 2
  return {
    ply,
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
    return createMemo(() =>  {
      let children = a_moves().filter(_ => _.base === path)
      
      let is_branch = children.length > 1

      return children.map(a_move => {
        let m_cs = make_nodes(a_move.path)

        let cs = m_cs()
        let main_children_and_rest
        if (cs.length > 0) {
          main_children_and_rest = [
            cs[0],
            cs.slice(1)
          ]
        }

        let i_continue = a_move.ply % 2 === 0
        let index = Math.ceil(a_move.ply / 2) + (i_continue ? '...' : '.')

        let show_index = is_branch || !i_continue

        return {
          a_move,
          index,
          show_index,
          main_children_and_rest
        }
      })
    })
  }

  let m_tree = make_nodes('')

  return {
    hover_path(path: string) {
      console.log(path)
    },
    hover_off() {
      console.log('off')
    },
    get tree() {
      return m_tree()
    },
    set moves(moves: Array<Move>) {
      owrite(_moves, moves)
    }
  }
}
