import React, {useRef, useContext} from 'react';
import UserContext from './UserContext';

export default function Answer(props){
  const context = useContext(UserContext);
  let btnRef = useRef();

  return (<button ref={btnRef} onClick={((event)=>{
    console.log("clicked", props.correct);
    context.setAnswered(true);
    context.setWhichAns(props.index);
    if(btnRef.current){
      btnRef.current.setAttribute("disabled", "disabled");
    }
    if(props.correct){
      context.sendAns(context.gamerTag, props.score);
    }
  })}>
      {/* {". "} */}
      {props.content}
    </button>)
}