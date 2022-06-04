
function non_empty_array<A>(arr: Array<A>) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr
  }
}

const App  = replay => props => {

  let on_hover = (path: string) => {
    replay.a_moves.hover_path(path)
  }


  return (<>
   <vchessreplay>
     <moves>
       <For each={replay.tree}>{ node =>
         <>
           <Move on_hover={on_hover} {...node}/>
           <MainChildrenAndRest on_hover={on_hover} mcr={node.main_children_and_rest}/>
         </>
       }</For>
     </moves>
   </vchessreplay> 
      </>)
}

const MainChildrenAndRest = props => {
  if (!props.mcr) {
    return (<></>)
  }
  return (<>
    <Show when={props.mcr[1].length}
    fallback = {<>
      <Move on_hover={props.on_hover} {...props.mcr[0]}/>
      <MainChildrenAndRest on_hover={props.on_hover} mcr={props.mcr[0].main_children_and_rest}/>
      </>
    }>
      <lines>
        <line->
          <Move on_hover={props.on_hover} {...props.mcr[0]}/>
          <MainChildrenAndRest on_hover={props.on_hover} mcr={props.mcr[0].main_children_and_rest}/>
        </line->
        <For each={props.mcr[1]}>{ child =>
         <line->
           <Move on_hover={props.on_hover} {...child}/>
           <MainChildrenAndRest on_hover={props.on_hover} mcr={child.main_children_and_rest}/>
         </line->
        }</For>
      </lines> 
    </Show>
     </>)
}

const Move = props => {
  return (<><move onMouseOver={_ => props.on_hover(props.a_move.path)}>
      <Show when={props.show_index}>
        <index>{props.index}</index>
      </Show>
      {props.a_move.move}
      </move>
      <comment>{props.a_move.comments}</comment>
      </>)
}

export default App
