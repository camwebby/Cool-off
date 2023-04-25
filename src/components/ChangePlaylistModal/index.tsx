import { useHotkeys } from "@mantine/hooks";
import { ChangePlaylistModalProps } from "./types";

const ChangePlaylistModal: React.FC<ChangePlaylistModalProps> = ({
  ...props
}) => {
  useHotkeys([["Escape", () => props.setPlaylistNameModal(false)]]);

  return (
    <>
      {props.show && (
        <div className="fixed top-0 left-0 z-[999] flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
          <div className="w-[500px] rounded-lg bg-white p-5">
            <h1 className="text-2xl font-bold text-black">Change playlist</h1>
            <p className="text-sm text-gray-500">
              Current, <span className="font-medium">{props.playlistName}</span>
            </p>
            <input
              onChange={(e) =>
                (props.playlistNameUncommitted.current = e.target.value)
              }
              className="my-5 w-full rounded-xl border border-gray-200 bg-gray-200 p-3 ring-gray-200 duration-300 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-40"
              type="text"
              placeholder="Playlist name"
            />
            <div className="flex justify-between gap-x-3 sm:gap-x-5">
              <button
                className="flex-grow rounded-lg bg-gray-200 py-3 px-5 font-medium text-gray-600 duration-200 ease-in-out hover:bg-gray-300"
                onClick={() => props.setPlaylistNameModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-grow rounded-lg bg-purple-700 py-3 px-5 font-medium text-white duration-200 ease-in-out hover:bg-purple-500"
                onClick={() => {
                  props.setPlaylistName(props.playlistNameUncommitted.current);
                  props.setPlaylistNameModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePlaylistModal;
