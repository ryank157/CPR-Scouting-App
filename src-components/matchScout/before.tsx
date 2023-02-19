
import type {Dispatch} from 'react'


import type { MatchEventsState,MatchAction } from '@/utils/matchScout/events'

interface BeforeProps {
    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>
}

export default function BeforeScout(props: BeforeProps) {
    
const {
    matchEvents,
    matchDispatch,    
    } = props

    return (
      <>
        
        <div className="flex flex-col flex-grow justify-end items-center pb-[45px]">
          
        <div className="w-[628px] h-[454px] bg-red-start bg-cover bg-center bg-no-repeat "></div>

        </div>
        
      </>
    )
}


