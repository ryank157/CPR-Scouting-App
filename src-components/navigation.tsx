import Link from "next/link";

interface NavProps {
  path: string
}

export default function Navigation({path}: NavProps) {
  

  return (
    <>
    <Link href={path}>
        

        <button className=" border rounded-full px-1 py-2  text-right  border-cpr-blue ">
        Back
        </button>
        
    </Link>
    
    

    </>
  );
}


