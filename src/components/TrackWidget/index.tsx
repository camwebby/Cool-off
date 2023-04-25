import { useState } from "react";

const TrackWidget: React.FC<{
  name: string;
  artist: string;
  artworkSrc: string;
  onRemove: () => void;
}> = ({ name, artist, artworkSrc, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex max-w-xs items-center gap-x-4 rounded-xl bg-white px-4 py-3 sm:max-w-sm"
      >
        <button
          style={{
            opacity: isHovered ? 1 : 0,
          }}
          onClick={onRemove}
          className="absolute -top-2 -right-2 rounded-full bg-red-700 px-2  py-1 text-xs font-medium text-white duration-200 ease-linear hover:bg-red-500"
        >
          Remove
        </button>
        <img
          src={artworkSrc}
          alt="artwork"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="">
          {/* redo name so that it truncates but animates sideways to show the rest */}
          <h3 className="text-md max-w-[280px] truncate font-bold text-purple-900 sm:text-xl">
            {name}
          </h3>

          <p className="text-xs font-medium text-gray-500 sm:text-base">
            {artist}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrackWidget;
