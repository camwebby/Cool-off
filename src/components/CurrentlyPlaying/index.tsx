import { useState } from "react";

const CurrentlyPlaying: React.FC<{
  trackName: string;
  onSkip: () => void;
  playlistName: string;
}> = ({ trackName, onSkip, playlistName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSkip}
      className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium"
    >
      {!isHovered ? (
        <>
          Current playing{" "}
          <span className="font-bold text-pink-600">{trackName}</span>
        </>
      ) : (
        <div className="">Add to your skip playlist? ({playlistName})</div>
      )}
    </button>
  );
};

export default CurrentlyPlaying;
