import {useState} from 'react'

import type { ScoringGrid } from "@/pages/matchScout"
import type {Dispatch} from 'react'

import type { TimeAction, TimeState, MatchPage } from "@/utils/matchScout/time"
import Button from 'src-components/button'
import Link from 'next/link'
import TimerButton from 'src-components/timerButton'


import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events"

interface ScoutHeaderProps {
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>

}

export default function ScoutHeader({timeState, timeDispatch}: ScoutHeaderProps) {
   const {activeMatch, startTime, matchTime, endTime, adjustment, matchPage} = timeState

   const autoTime = (timeState.endTime - timeState.matchTime - 123000) / 1000; 


    switch(matchPage) {
        case "before":
                return (
                    <>
                    <div className='w-full flex justify-between p-7.5 '>
                        <div className='flex  items-center gap-7.5'>
                            <Link href={'/'}><Button className=''>Home</Button></Link>
                            <div className="flex flex-col ">
                                <div className='font-bold text-3xl'>Match # - Pos</div>
                                <div className='text-3xl'>Team #####</div>
                            </div>
                        </div>
                        <div className='flex gap-2.5 font-bold'>
    
                        <Button className=''>No Show</Button>
                        {!activeMatch && <Button className='' onClick={() => {timeDispatch({type:'START_MATCH'})}}>Start</Button>}
                        {activeMatch && <Button className='' onClick={() => {timeDispatch({type:'CHANGE_PAGE',page:'auto'})}}>Continue</Button>}
                        </div>
                    </div>
                    </>
                )
        case "auto":
            return (
                <>
                    <div className='w-full flex justify-between p-7.5 '>
                        <div className='flex  items-center gap-7.5'>
                            <Button className='' onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'before'})}>Back</Button>
                            <div className="flex flex-col ">
                                <div className='font-bold text-3xl'>Autonomous</div>
                                <div className='text-3xl'>Team #####</div>
                            </div>
                        </div>
                        <div className='flex gap-2.5 font-bold justify-center items-center'>

                        <Button className='w-15' onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: -1000 })}>+</Button>
                        <div className='font-bold text-3xl'>{
                            autoTime > 0 ? autoTime : 
                            autoTime > -3 ? 'Switching' : "Complete"
                        }</div>
                        <Button className='w-15' onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: 1000 })}>-</Button>

                        <Button className='' onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'tele'})}>Tele Op</Button>
                        </div>
                    </div>
                    </>
            )
        case "tele":
            return (
                <>
                </>
            )
        case "endgame":
            return (
                <>
                </>
            )
        case "review":
            return (
                <>
                </>
            )
    }
}   
    


