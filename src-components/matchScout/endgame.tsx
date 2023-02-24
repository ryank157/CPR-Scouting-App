
import type {Dispatch } from 'react'
import type { TimeState, TimeAction } from "@/utils/matchScout/time"
import type {MatchAction, MatchEventsState } from "@/utils/matchScout/events"

import TeleButton from 'src-components/teleButton'
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

    const teleTime = (timeState.endTime - timeState.matchTime) / 1000;  
    


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
        <EndgameButton variant={false} onClick={() => undefined}>Solo</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>Double</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>Triple</EndgameButton>
    </div>  
    <div className='row-span-1 col-span-4 grid grid-cols-4 gap-6'>
        <div className='col-span-1 w-25 flex justify-start items-center font-bold justify-items-center text-xl'>Order</div>
        <EndgameButton variant={false} onClick={() => undefined}>1st</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>2nd</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>3rd</EndgameButton>
    </div>  
    <div className='row-span-1 col-span-4 grid grid-cols-4 gap-6'>
        <div className='col-span-1 w-25 flex justify-start items-center font-bold justify-items-center text-xl'>Result</div>
        <EndgameButton variant={false} onClick={() => undefined}>Balance</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>Dock</EndgameButton>
        <EndgameButton variant={false} onClick={() => undefined}>Fail</EndgameButton>
    </div>  
    </div>
  <div className='flex flex-col justify-end items-center'>
    <div className='text-xl font-bold'>Feedback</div>
    <textarea className='w-[450px] h-[178px] bg-inactive-bg'>Your message</textarea>  
  </div>                     
  </div>     
</div>
  

        )
}

