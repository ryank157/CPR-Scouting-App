import type { DOMAttributes, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    className?: string
    icon: string[]
    variant: boolean
    onClick: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function AutoButton({children,className,icon,variant, onClick}: ButtonProps) {
    const inactive = 'border-inactive-border bg-inactive-bg'
    const active = 'border-active-border bg-cpr-blue-light'
            // Children info
            return (<button
                className={` h-15 p-2.5 flex justify-between items-center rounded-md text-xl border-2 ${variant ? active : inactive} ${className}`}
                onClick={onClick}
                >
                {children}
                <div className={`${variant ? icon[1] : icon[0]} bg-right w-15 h-full bg-contain bg-no-repeat`}></div>
            </button>)
}

