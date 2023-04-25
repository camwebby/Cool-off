// TODO: Set as environment variables
const requiredScopes =
  "user-read-currently-playing+user-modify-playback-state+playlist-modify-public+playlist-read-private+playlist-modify-private";
const oauthCallbackUrl = "http://localhost:3000/callback";
const spotifyAppClientId = "b05d060109674d8e8035aa76a7dfa09f";

export const oauthLink = `https://accounts.spotify.com/authorize?client_id=${spotifyAppClientId}&response_type=code&redirect_uri=${oauthCallbackUrl}&scope=${requiredScopes}`;

export const skipToNextTrack = async (accessToken: string) => {
  try {
    const data = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {}
};

export const getUsersPlaylistByExactName = async (
  accessToken: string,
  playlistName: string
) => {
  try {
    const data = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlists = await data.json();

    if (playlists.next !== null) {
      const data2 = await fetch(playlists.next, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const playlists2 = await data2.json();
      playlists.items = playlists.items.concat(playlists2.items);

      if (playlists2.next !== null) {
        const data3 = await fetch(playlists2.next, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const playlists3 = await data3.json();

        playlists.items = playlists.items.concat(playlists3.items);
      }
    }

    const playlist = playlists.items.find(
      (playlist: any) => playlist.name === playlistName
    );

    return playlist;
  } catch (error) {
    return "hey";
  }
};

export const getTracksInPlaylist = async (
  accessToken: string,
  playlistName: string
) => {
  // get playlist by name

  try {
    const playlist = await getUsersPlaylistByExactName(
      accessToken,
      playlistName
    );
    const id = playlist.id;

    const data = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const tracks = await data.json();

    return { ...tracks, playlistId: id, playlistName: playlist.name };
  } catch (error) {
    return "hey";
  }
};

export const getAccessToken = async (refreshToken: string) => {
  let token: string;
  try {
    const data = await fetch("/api/getAccessToken", {
      method: "GET",
      headers: {
        refresh_token: refreshToken,
      },
    });
    token = await data.json();

    return token;
  } catch (error) {
    return "hey";
  }
};

export const getTrackPlayingNow = async (accessToken: string) => {
  try {
    const data = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const track = await data.json();

    return track;
  } catch (error) {
    return "hey";
  }
};

export const removeTrackFromPlaylist = async (
  accessToken: string,
  playlistId: string,
  trackId: string
) => {
  try {
    const data = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          tracks: [
            {
              uri: `spotify:track:${trackId}`,
            },
          ],
        }),
      }
    );
    const tracks = await data.json();

    return tracks;
  } catch (error) {
    return "hey";
  }
};

export const addTrackToPlaylist = async (
  accessToken: string,
  playlistId: string,
  trackId: string
) => {
  try {
    const data = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const tracks = await data.json();

    return tracks;
  } catch (error) {
    return "hey";
  }
};
