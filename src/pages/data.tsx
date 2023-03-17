import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Button from "src-components/button";
import userStore, { useLocalMatchesStore } from "@/utils/stores";
import type { Scouter } from "@prisma/client";

const Data = () => {
  const { localMatches, deleteLocalMatches } = useLocalMatchesStore();
  const [isSubmit, setIsSubmit] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  trpc.match.submitMatches.useQuery(localMatches, {
    enabled: isSubmit,
    onSuccess() {
      setIsSubmit(false);
      deleteLocalMatches();
      setSuccessfulSubmit(true);
    },
  });

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
            {isOnline ? (
              <>
                {/* <div>Through Match: {matchNumber} </div> */}
                <Button className="w-60">Export Data</Button>
              </>
            ) : (
              <div>No Internet Connection</div>
            )}
          </div>
        </div>
      </>
      <div className="flex w-full flex-col items-center justify-center px-4 py-10">
        {localMatches.length > 0 && isOnline && (
          <Button onClick={() => setIsSubmit(true)}>Submit Matches</Button>
        )}
        {localMatches.length > 0 ? (
          localMatches.map((match, index) => {
            {
              index === 0 && <div>Locally Stored Matches</div>;
            }
            return (
              <div key={index} className="">
                <div>{match.matchId}</div>
                <div>{match.robotId}</div>
                <div>
                  {match.alliance} - {match.station}
                </div>
              </div>
            );
          })
        ) : (
          <div> You have no local matches</div>
        )}
        {successfulSubmit && (
          <div>The matches have been successfully submitted</div>
        )}
      </div>
    </>
  );
};

export default Data;

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
