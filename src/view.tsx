
const App  = replay => props => {
  return (<>
   <vchessreplay>
     <moves>
       <For each={replay.tree}>{ node =>
         <>
         <Move move={{}}/>
         <For each={console.log(node.m_cs())||node.m_cs()}>{ child =>
           <Move move={{}}/>
         }</For>
         </>
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
