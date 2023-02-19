import type { DOMAttributes, ReactNode } from "react"

interface ButtonProps {
    children?: ReactNode
    className?: string
    onClick?: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function Button({children,className,onClick}: ButtonProps) {
            
            // Children info
            return (<button
                className={`${className ? className : 'w-40'} h-15 rounded-md text-center font-bold text-xl shadow-md border-2 border-cpr-blue-dark bg-cpr-blue-light `}
                onClick={onClick}
                >
                {children}
            </button>)
}

