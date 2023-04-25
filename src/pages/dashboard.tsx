import { NextPage } from "next";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Audio, Radio } from "react-loader-spinner";
import Head from "next/head";
import {
  getAccessToken,
  getTrackPlayingNow,
  getTracksInPlaylist,
  removeTrackFromPlaylist,
  skipToNextTrack,
  addTrackToPlaylist,
} from "@/helpers/spotify";
import { useRouter } from "next/router";
import ChangePlaylistModal from "@/components/ChangePlaylistModal";
import TrackWidget from "@/components/TrackWidget";
import CurrentlyPlaying from "@/components/CurrentlyPlaying";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: "refreshToken",
  });

  const [addToSkipIsLoading, setAddToSkipIsLoading] = useState(false);

  const signOut = useCallback(() => {
    setRefreshToken("");
    router.push("/");
  }, [setRefreshToken, router]);

  const [playlistName, setPlaylistName] = useLocalStorage({
    key: "playlistName",
    defaultValue: "",
  });

  const playlistNameUncommitted = useRef<string>(playlistName);
  const [playlistNameModal, setPlaylistNameModal] = useState(!playlistName);

  const [listening, setListening] = useState(true);

  const { data: accessToken, isLoading: tokenLoading } = useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => await getAccessToken(refreshToken),
    cacheTime: 59 * 60 * 1000, // 59 minutes
    enabled: !!refreshToken,
  });

  const skipSong = useCallback(() => {
    if (!accessToken) return;
    skipToNextTrack(accessToken);
  }, [accessToken]);

  const {
    data: playlist,
    isLoading: playlistLoading,
    refetch,
  } = useQuery({
    queryKey: ["playlist", playlistName],
    queryFn: async () =>
      accessToken && (await getTracksInPlaylist(accessToken, playlistName)),
    enabled: Boolean(accessToken),
  });

  const { data: track, isLoading: trackLoading } = useQuery({
    queryKey: ["track"],
    queryFn: async () => accessToken && (await getTrackPlayingNow(accessToken)),
    enabled: Boolean(accessToken) && listening,
    refetchInterval: 5000,
  });

  const removeSong = useCallback(
    (trackId: string) => {
      if (!accessToken || !playlist?.playlistId) return;
      try {
        removeTrackFromPlaylist(accessToken, playlist.playlistId, trackId);
        refetch();
      } catch {}
    },
    [accessToken, playlist]
  );

  const trackNames: string[] = useMemo(() => {
    if (!playlist) return [];
    return Array.isArray(playlist.items)
      ? playlist.items.map((item: any) => item.track.name)
      : [];
  }, [playlist]);

  const addSongToP = useCallback(
    (trackId: string) => {
      if (!accessToken || !playlist?.playlistId || playlistLoading) return;

      // check if song is already in playlist
      if (trackNames.includes(trackId)) return;

      try {
        addTrackToPlaylist(accessToken, playlist.playlistId, trackId);
        refetch();
      } catch {
      } finally {
      }
    },
    [accessToken, playlist]
  );

  // SKIP IF SONG IN TRACK NAMES
  useEffect(() => {
    if (!track || !track.item || !trackNames) return;
    if (trackNames.includes(track.item.name)) {
      skipSong();
    }
  }, [track, trackNames]);

  return (
    <main className="min-w-screen min-h-screen overflow-hidden bg-pink-200 p-5 md:p-10">
      <Head>
        <title>
          Cool off | Playing,
          {track?.item?.name || ` nothing (no, that's not a song)`}
        </title>
      </Head>
      {tokenLoading || trackLoading || !playlist ? (
        <div className="min-w-screen flex min-h-screen items-center justify-center overflow-hidden">
          <Audio
            height="80"
            width="80"
            color="rgb(131 24 67)"
            ariaLabel="audio-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          <ChangePlaylistModal
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            setPlaylistNameModal={setPlaylistNameModal}
            playlistNameUncommitted={playlistNameUncommitted}
            show={playlistNameModal}
          />

          <div className="fixed z-[99] flex w-[calc(100vw-60px)] items-center justify-between rounded-full border border-gray-100 bg-white p-5 px-10">
            <div className="">
              <div className="flex items-center">
                <span className="mr-2">
                  <Radio
                    visible={listening}
                    height="32"
                    width="32"
                    colors={[
                      "rgb(88 28 135)",
                      "rgb(131 24 67)",
                      "rgb(131 24 67)",
                    ]}
                    ariaLabel="radio-loading"
                    wrapperStyle={{}}
                    wrapperClass="radio-wrapper"
                  />
                </span>
                <div className="">
                  <p className="mb-1 text-xl font-bold text-purple-900 sm:text-2xl">
                    {listening
                      ? "Listening for skippable songs"
                      : "Not listening or skipping"}
                  </p>
                  <button
                    className="mr-3 rounded-full bg-pink-100 px-2 py-1 text-xs font-medium"
                    onClick={() => setListening(!listening)}
                  >
                    {listening ? "Stop" : "Start"}
                  </button>
                  {listening && !addToSkipIsLoading && (
                    <CurrentlyPlaying
                      onSkip={async () => {
                        setAddToSkipIsLoading(true);
                        if (track?.item?.id) await addSongToP(track.item.id);
                        setAddToSkipIsLoading(false);
                      }}
                      trackName={track?.item?.name || "No song playing"}
                      playlistName={playlistName}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3 sm:gap-x-4">
              <button
                className="rounded-full bg-gray-200 py-3 px-5 font-medium text-black duration-200 ease-in-out hover:bg-purple-500"
                onClick={() => setPlaylistNameModal(true)}
              >
                <span className="hidden sm:block">Change playlist</span>
                {/* change icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                className="rounded-lg bg-purple-700 py-3 px-5 font-medium text-white duration-200 ease-in-out hover:bg-purple-500"
                onClick={skipSong}
              >
                <span className="hidden sm:block">
                  {track?.item?.name ? "Skip Song" : "No song playing"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 16l7-6-7-6v12z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
              <button aria-label="Sign out" title="Sign out" onClick={signOut}>
                ⏏️
              </button>
            </div>
          </div>

          <div className="my-48" />

          <div className="grid grid-cols-1">
            <div>
              <h2 className="mb-2 text-4xl font-bold text-pink-900 md:text-7xl">
                Your skip songs ({playlist.playlistName})
              </h2>
              <p className="text-xl font-medium text-pink-900 md:text-xl"></p>
            </div>
          </div>

          <div className="my-8" />

          {playlistLoading ? (
            <Audio></Audio>
          ) : (
            <>
              {Array.isArray(playlist.items) && (
                <div className="flex flex-wrap gap-3">
                  {playlist.items.map((item: any) => (
                    <TrackWidget
                      key={item.track.id}
                      onRemove={() => removeSong(item.track.id)}
                      name={item.track.name}
                      artist={item.track.artists[0].name}
                      artworkSrc={item.track.album.images[0].url}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Dashboard;
