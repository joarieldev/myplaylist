export const PlayList = ({ ClassName }: { ClassName?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={ClassName}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M11 17a3 3 0 1 0 6 0 3 3 0 1 0-6 0M17 17V4h4M13 5H3M3 9h10M9 13H3" />
    </svg>
  );
};
