
import type {Dispatch } from 'react'
import type { TimeState, TimeAction } from "@/utils/matchScout/time"
import type {MatchAction, MatchEventsState } from "@/utils/matchScout/events"
import ScoringGrid from "./scoringGrid"
import AutoButton from "src-components/autoButton"
import TeleButton from 'src-components/teleButton'

interface TeleProps {

    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>,

    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
}

export const TeleScout: React.FC<TeleProps> = (props: TeleProps) => {
  
const {
    
    
    matchEvents,
    matchDispatch,

    timeState,
    timeDispatch
    } = props

  
    const teleTime = (timeState.endTime - timeState.matchTime) / 1000;  
    


return (
  <div className="flex flex-col justify-center w-full">                           
  <ScoringGrid timeState={timeState} timeDispatch={timeDispatch} matchEvents={matchEvents} matchDispatch={matchDispatch}/>
      
  <div className="h-full w-full justify-center gap-[22px] flex mt-4 pb-10">
    <div className='flex flex-col'>
      <div className="text-xl font-semibold text-center mb-1.25">Current Cycle</div>
      <div className='flex'>
        <div className="w-15 h-full border p-2 flex justify-center items-center mr-1.5">
          <div className="transform -rotate-90 text-xl whitespace-nowrap">Cycle Mode</div>
        </div>
        <div className='grid grid-rows-4 grid-cols-4 w-[578px] h-[200px] border-2 border-inactive-border '>
          <div className=' cols-span-1 row-span-4'>
            <div className='border-b border-inactive-border row-span-1 h-[50px] w-full flex justify-center items-center text-xl'>Cycle Time</div>
            <div className='grid row-span-3 border-r border-inactive-border py-[7px] px-3 gap-[7px]'>

            <TeleButton variant={false} onClick={() => undefined}>+</TeleButton>
            <div className='flex justify-center items-center w-full h-10 rounded-[5px] text-xl '>###</div>
            <TeleButton variant={false} onClick={() => undefined}>-</TeleButton>

            </div>
          </div>
          <div className=' cols-span-1 row-span-4 '>
            <div className='border-b border-inactive-border row-span-1 h-[50px] w-full flex justify-center items-center text-xl'>Pickup Loc.</div>
            <div className='grid row-span-3 border-r border-inactive-border py-[7px] px-3 gap-[7px]'>
              <TeleButton variant={false} onClick={() => undefined}>Feeder</TeleButton>
              <TeleButton variant={false} onClick={() => undefined}>Middle</TeleButton>
              <TeleButton variant={false} onClick={() => undefined}>Community</TeleButton>
            </div>
          </div>
          <div className=' cols-span-1 row-span-4'>
            <div className='border-b border-inactive-border row-span-1 h-[50px] w-full flex justify-center items-center text-xl'>Orientation</div>
            <div className='grid row-span-3 border-r border-inactive-border py-[7px] px-3 gap-[7px] '>

            <TeleButton variant={false} onClick={() => undefined}>Upright</TeleButton>
            <TeleButton variant={false} onClick={() => undefined}>Side</TeleButton>
            <div className='h-10'>&nbsp;</div>


            </div>
          </div>
          <div className=' cols-span-1 row-span-4 '>
            <div className='border-b border-inactive-border row-span-1 h-[50px] w-full flex justify-center items-center text-xl'>Delay</div>
            <div className='grid row-span-3 py-[7px] px-3 gap-[7px]'>
            <TeleButton variant={false} onClick={() => undefined}>Obstructed</TeleButton>
            <TeleButton variant={false} onClick={() => undefined}>Defended</TeleButton>

            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="flex flex-col w-[310px]">
      <div className="text-xl font-semibold text-center mb-1.25">Cycle History</div>
        <div className='border-2 border-inactive-border  h-[200px]'>

          <div className='flex border-b border-inactive-border justify-center items-center h-[50px] text-center text-xl'>
            <div className='w-1/4'>#</div>
            <div className='w-1/4'>Time</div>
            <div className='w-1/4'>Piece</div>
            <div className='w-1/4'>Edit</div>
          </div>
          <div className='flex text-center h-[148px]'>
            <div className='w-1/4 border-r border-inactive-border flex flex-col'>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className='w-1/4 border-r border-inactive-border flex flex-col'>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className='w-1/4 border-r border-inactive-border flex flex-col'>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className='w-1/4 '>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>

          </div>
        </div>
    </div>
  </div>
  </div>
  

        )
}


