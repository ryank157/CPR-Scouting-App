
import type {Dispatch} from 'react'
import Link from "next/link"
import Button from "src-components/button"
import ScoutHeader from './header'

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
      <>
        
        <div className="flex flex-col flex-grow justify-end items-center pb-[45px]">
          
        <div className="w-[628px] h-[454px] bg-red-start bg-cover bg-center bg-no-repeat "></div>

        </div>
        
      </>
    )
}


