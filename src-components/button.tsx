import type { DOMAttributes } from "react"

interface ButtonProps {
    text: string
    className?: string
    onClick?: DOMAttributes<HTMLButtonElement>["onClick"]
}
export default function Button({text, className,onClick}: ButtonProps) {
            
            
            return (<button
                className={`text-l w-full rounded-md  px-8 py-4 font-bold shadow-md border border-cpr-blue ${className}`}
                onClick={onClick}
                >
                {text}
            </button>)
}

