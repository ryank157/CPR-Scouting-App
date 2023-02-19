import type { DOMAttributes, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    className?: string

    variant: boolean
    onClick: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function TeleButton({children,className,variant, onClick}: ButtonProps) {
    const inactive = ''
    const active = ''
            return (<button
                className={`flex justify-center items-center w-full h-10 border border-inactive-border bg-inactive-bg rounded-[5px] text-xl row-span-1`}
                onClick={onClick}
                >
                {children}
                
            </button>)
}

