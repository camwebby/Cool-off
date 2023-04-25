export type ChangePlaylistModalProps = {
  show?: boolean;
  playlistName: string;
  setPlaylistNameModal: (value: boolean) => void;
  setPlaylistName: (value: string) => void;
  playlistNameUncommitted: React.MutableRefObject<string>;
};
