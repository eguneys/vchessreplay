import { createSignal } from 'solid-js'
import { read, write, owrite } from './play'

export class Replay {

  get moves() {
    return this.a_moves.moves
  }

  set moves(moves: Array<Moves>) {
    this.a_moves.moves = moves
  }

  constructor() {
    this.a_moves = make_moves()


    this.moves = [
      'path', 
      'path', 
      'path',
      'path',
      'path', 
      'path',
      'path {A little comment}', ]
  }
}


const make_moves = () => {
  let _moves = createSignal([])


  return {
    get moves() {
      return read(_moves)
    },
    set moves(moves: Array<Move>) {
      owrite(_moves, moves)
    }
  }
}
