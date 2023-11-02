import { serverSideEnv } from "@/consts/env";
import { NextApiRequest, NextApiResponse } from "next";

const getAccessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const authKey = serverSideEnv.AUTH_KEY;

  if (!authKey) {
    res.status(400).json("Auth key not found");
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: req.headers.refresh_token as string,
      }),
    });

    const json = await response.json();
    res.status(200).json(json.access_token);
  } catch (error) {
    res.status(400).json("whoops");
  }
};

export default getAccessToken;
