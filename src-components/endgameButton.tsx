import type { DOMAttributes, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    className?: string

    variant: boolean
    onClick: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function EndgameButton({children,className,variant, onClick}: ButtonProps) {
    const inactive = ''
    const active = ''
            return (<button
                className={`flex justify-center items-center w-25 h-15 border border-inactive-border bg-inactive-bg rounded-[5px] text-xl col-span-1`}
                onClick={onClick}
                >
                {children}
                
            </button>)
}

