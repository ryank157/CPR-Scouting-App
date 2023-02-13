
import type {Dispatch} from 'react'
import Link from "next/link"
import Button from "src-components/button"

import type { TimeAction, TimeState } from "@/utils/matchScout/time"

interface BeforeProps {
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>
}

export default function BeforeScout(props: BeforeProps) {
    
const {
    timeState,
    timeDispatch,    
    } = props

    return (
      
        <div className="relative border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
          <Link className='absolute top-4 left-4'href="/">
              <Button text="Home" className=""/>                
          </Link>
        <div className="text-4xl font-bold">Red 1 - 3663</div>
        <div className="w-[717px] h-[637px] bg-red-start bg-cover bg-center bg-no-repeat "></div>
        {!timeState.activeMatch && (
          <div className="p-2 border border-cpr-blue"onClick={() => {timeDispatch({type:'START_MATCH'})}}>Start Match</div>
        )}
        {timeState.activeMatch && (
          <div className="p-2 border border-cpr-blue"onClick={() => { timeDispatch({type:'CHANGE_PAGE', page: 'auto'})}}>Continue Match</div>
        )}
        
        </div>
        
    )
}


