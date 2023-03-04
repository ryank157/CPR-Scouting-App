import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Button from "src-components/button";
import userStore from "@/utils/stores";
import { Scouter } from "@prisma/client";

const Login = () => {
  const { user, setUser } = userStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredScouters, setFilteredScouters] = useState<
    Scouter[] | undefined
  >(undefined);
  const { data: scouters } = trpc.auth.fetchScouters.useQuery();
  useEffect(() => {
    const results = scouters?.filter((scout) => {
      const searchRegex = new RegExp(searchTerm.split("").join(".*"), "i");
      return searchRegex.test(scout.name);
    });

    if (results) {
      setFilteredScouters(results);
    }
  }, [searchTerm, scouters]);

  return (
    <>
      <>
        <div className="flex w-full justify-between p-7.5 ">
          <div className="flex  items-center gap-7.5">
            <Link href={"/"}>
              <Button className="">Back</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2.5 font-bold">
            {user ? (
              <>
                <div>Signed in as:</div>
                <Button className="w-60"> {user.name}</Button>
              </>
            ) : (
              <div>Not Signed in</div>
            )}
          </div>
        </div>
      </>
      <div className="flex w-full flex-col items-center justify-center px-4 py-10">
        <div>Sign in</div>
        <input
          className={`caret-primary-500 ml-2 h-8  w-40 border-2 bg-transparent px-4 py-2 text-sm text-neutral-900  focus:outline-none`}
          placeholder={"Search Scouter..."}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="flex w-full flex-wrap gap-2 pt-10">
          {filteredScouters?.map((scout, index) => {
            return (
              <div
                key={index}
                className="w-30 cursor-pointer border px-4 py-2 hover:bg-gray-100"
                onClick={() => setUser(scout)}
              >
                {scout.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Login;

export function SearchInput(props: InputProps) {
  const {
    label,
    helperText,
    placeholder,
    value,
    onChange,
    className,
    onBlur,
    ref,
  } = props;

  return (
    <>
      {label && (
        <label className="text-sm font-medium text-neutral-900">{label}</label>
      )}
      <input
        className={`caret-primary-500 ml-2 h-8  w-40 border-2 bg-transparent px-4 py-2 text-sm text-neutral-900  focus:outline-none ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {helperText && (
        <div className="text-destructive-500 text-xs">{helperText}</div>
      )}
    </>
  );
}

export type InputProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.RefObject<HTMLInputElement>;
};
