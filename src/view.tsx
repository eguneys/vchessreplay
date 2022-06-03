
const App  = replay => props => {
  return (<>
   <vchessreplay>
     <moves>
       <For each={replay.moves}>{ move =>
         <Move move={move}/>
       }</For>
     </moves>
   </vchessreplay> 
      </>)
}

const Move = props => {
  return (<move>
      <Show when={props.move.index}>{ index =>
        <index>{index}</index>
      }</Show>
      {props.move.move}
      </move>)
}

export default App
