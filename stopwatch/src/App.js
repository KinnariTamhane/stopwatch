
import './input.css';
import {useReducer, useRef} from 'react';

const initalState = {isRunning:false, time:0, laps:[]}

const reducer = (state=initalState,action) => { 
      switch(action.type){
        case "START": 
          return {...state,isRunning:true};
        
        case "STOP": 
          return {...state,isRunning:false};
        
        case "TICK": 
          return {...state,time:state.time + 1};
        
        case "RESET": 
          return {isRunning:false, time:0, laps:[]};
        
        case "LAPS": 
          return {...state,laps:[...state.laps,state.time]};
        
          default:
            return state;
        
      }
}
function App() {

  const Timer = useRef(null);
  const [state,dispatch] = useReducer(reducer, initalState);


  const handleStartStop = () =>{
      if(state.isRunning){
        clearInterval(Timer.current);
        dispatch({type:'STOP'})
      }
      else{
        Timer.current = setInterval(()=>{
          dispatch({type:'TICK'})
        },1000)
        dispatch({type:'START'})
      }
  }

  const handleReset = () =>{
      clearInterval(Timer.current);
      dispatch({type:'RESET'})
  }

  const handleLaps = () =>{
    if (state.isRunning) {
      dispatch({type:'LAPS'})
    }
  }

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  return (
    <div className="App bg-black text-white">
      <div className='grid place-content-center h-[100vh]'>
        <h1 className='text-center text-4xl mb-5'>Stopwatch</h1>
        <div className='w-[220px] border border-gray-600 rounded-full p-2 mx-auto my-0'>
            <div className='stop-watch'> 
              {formatTime(state.time)}
            </div>
        </div>
        <div className='mt-10 grid space-y-5 md:space-y-0 md:space-x-8 md:flex md:justify-center'>
          <button  className='button' onClick={handleStartStop}> {state.isRunning ? 'Stop' : 'Start'}</button>
          <button  className='button'  onClick={handleReset}>Reset</button>
          <button  className='button' onClick={handleLaps}>Lap</button>
        </div>
        {
        state.laps.length > 0 &&
        <ul className='grid grid-cols-2 md:grid-cols-5 mt-10'>
          {state.laps.map((lap,index)=>{
            return(
              <li key={index} className='border-2 border-white w-[150px] rounded-xl text-center mt-5 mr-3'>Lap {index+1} : {formatTime(lap)}</li>
            )
          })
          }
        </ul>
      }
      </div>
    </div>
  );
}

export default App;
