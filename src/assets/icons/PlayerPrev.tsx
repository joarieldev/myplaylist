export const PlayerPrev = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="m20.341 4.247-8 7a1 1 0 0 0 0 1.506l8 7c.647.565 1.659.106 1.659-.753V5c0-.86-1.012-1.318-1.659-.753zM9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7C9.988 20.318 11 19.859 11 19V5c0-.86-1.012-1.318-1.659-.753z" />
    </svg>
  );
};
