
import type {Dispatch } from 'react'
import type { TimeState, TimeAction } from "@/utils/matchScout/time"
import type {MatchAction, MatchEventsState } from "@/utils/matchScout/events"

import EndgameButton from 'src-components/endgameButton'


interface EndgameProps {

    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>,

    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
}

export const EndgameScout: React.FC<EndgameProps> = (props: EndgameProps) => {
  
const {
    matchEvents,
    matchDispatch,
    timeState,
    timeDispatch
    } = props
  
return (
<div className="flex justify-center w-full pt-[35px] "> 
  <div className='flex flex-col w-1/2 items-center justify-center'>
    <div className='flex justify-center items-center font-bold text-xl pb-[26px]'>Start Position</div>  
    <div className='bg-endgame-red w-[427px] h-[500px] bg-contain bg-no-repeat bg-center'></div>  
  </div>                          
  <div className='flex flex-col w-1/2 justify-between'>
    <div className='flex flex-col gap-y-6 justify-center items-center'>
    <div className='flex justify-center items-center font-bold text-xl pb-0.5'>Balance</div>
    <div className='row-span-1 col-span-4 grid grid-cols-4 gap-6 '>
        <div className='col-span-1 w-25 flex justify-start items-center font-bold text-xl'>Number</div>
        <EndgameButton variant={matchEvents.endgameBalancing.numberOfRobots === 1} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, numberOfRobots: 1}})}>Solo</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.numberOfRobots === 2} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, numberOfRobots: 2}})}>Double</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.numberOfRobots === 3} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, numberOfRobots: 3}})}>Triple</EndgameButton>
    </div>  
    <div className='row-span-1 col-span-4 grid grid-cols-4 gap-6'>
        <div className='col-span-1 w-25 flex justify-start items-center font-bold justify-items-center text-xl'>Order</div>
        <EndgameButton variant={matchEvents.endgameBalancing.order === 1} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, order: 1}})}>1st</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.order === 2} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, order: 2}})}>2nd</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.order === 3} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, order: 3}})}>3rd</EndgameButton>
    </div>  
    <div className='row-span-1 col-span-4 grid grid-cols-4 gap-6'>
        <div className='col-span-1 w-25 flex justify-start items-center font-bold justify-items-center text-xl'>Result</div>
        <EndgameButton variant={matchEvents.endgameBalancing.result === 'balance'} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, result: 'balance'}})}>Balance</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.result === 'dock'} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, result: 'dock'}})}>Dock</EndgameButton>
        <EndgameButton variant={matchEvents.endgameBalancing.result === 'fail'} onClick={() => matchDispatch({type: 'SET_ENDGAME_BALANCING', endgame: {...matchEvents.endgameBalancing, result: 'fail'}})}>Fail</EndgameButton>
    </div>  
    </div>
  <div className='flex flex-col justify-end items-center'>
    <div className='text-xl font-bold'>Feedback</div>
    <textarea className='w-[450px] h-[178px] bg-inactive-bg' placeholder='Your Message' onChange={(e) => matchDispatch({type:'SET_FEEDBACK', message: e.target.value})}></textarea>  
  </div>                     
  </div>     
</div>
  

        )
}


