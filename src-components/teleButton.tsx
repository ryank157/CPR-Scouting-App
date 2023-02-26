import type { DOMAttributes, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    className?: string

    variant: boolean
    onClick: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function TeleButton({children,className,variant, onClick}: ButtonProps) {
    const inactive = 'bg-inactive-bg'
    const active = 'bg-cpr-blue-light'
            return (<button
                className={`flex justify-center items-center w-full h-10 border border-inactive-border  rounded-[5px] text-xl row-span-1 ${variant ? active : inactive}`}
                onClick={onClick}
                >
                {children}
                
            </button>)
}

