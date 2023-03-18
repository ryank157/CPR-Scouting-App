import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Button from "src-components/button";
import { useLocalMatchesStore } from "@/utils/stores";
import useIsOnline from "@/utils/useIsOnline";
import type { MatchEventsState } from "@/utils/matchScout/events";

const Data = () => {
  const { localMatches, deleteLocalMatches } = useLocalMatchesStore();
  const [hydrateLocal, setHydrateLocal] = useState<MatchEventsState[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const isOnline = useIsOnline();

  useEffect(() => {
    if (localMatches) {
      setHydrateLocal(localMatches);
    }
  }, []);

  trpc.match.submitMatches.useQuery(localMatches, {
    enabled: isSubmit && isOnline,
    onSuccess() {
      setIsSubmit(false);
      deleteLocalMatches();
      setSuccessfulSubmit(true);
    },
  });

  trpc.match.exportData.useQuery(undefined, {
    enabled: isExport,
    onSuccess(res) {
      setIsExport(false);

      // Create a Blob object from the CSV string
      const blob = new Blob([res], { type: "text/csv" });
      // Create a temporary URL for the Blob object
      const url = URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.csv";
      // Trigger the download by clicking the link element
      document.body.appendChild(link);
      link.click();
      // Clean up the temporary URL and link element
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
                <Button className="w-60" onClick={() => setIsExport(true)}>
                  Export Data
                </Button>
              </>
            ) : (
              <div>No Internet Connection</div>
            )}
          </div>
        </div>
      </>
      <div className="flex w-full flex-col items-center justify-center px-4 py-10">
        {hydrateLocal.length > 0 && isOnline && (
          <>
            <Button onClick={() => setIsSubmit(true)}>Submit Matches</Button>
          </>
        )}

        {hydrateLocal.length > 0 && (
          <>
            <div className="flex w-[60%] flex-col border border-black">
              <div className="flex items-center justify-center  border-b py-2 text-center">
                <div className="w-[20%] border-r ">Match #</div>
                <div className="w-[40%] border-r ">Team #</div>
                <div className="w-[20%] border-r ">Alliance</div>
                <div className="w-[20%] border-r ">Station</div>
              </div>
              {hydrateLocal.map((match, index) => (
                <div
                  key={index}
                  className="flex w-[60%] items-center justify-center  border-b  py-2 text-center"
                >
                  <div className="w-[20%] border-r">{match.matchId}</div>
                  <div className="w-[40%] border-r">{match.teamNumber}</div>
                  <div className="w-[20%] border-r">{match.alliance}</div>
                  <div className="w-[20%] border-r">{match.station}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {hydrateLocal.length === 0 && <div>You have no Local Matches</div>}
      </div>

      {successfulSubmit && (
        <div>The matches have been successfully submitted</div>
      )}

      <div className=" fixed bottom-2 right-2 opacity-0 hover:opacity-100 active:opacity-100">
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "No Commit"}
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
