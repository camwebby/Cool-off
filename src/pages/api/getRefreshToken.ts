import { clientSideEnv, serverSideEnv } from "@/consts/env";
import { NextApiRequest, NextApiResponse } from "next";

const getRefreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const authKey = serverSideEnv.AUTH_KEY;
  const redirectUri = clientSideEnv.CALLBACK_URI;

  if (!authKey || !redirectUri) {
    res.status(400).json("There was a problem retrieving refresh token");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${authKey}`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "__Host-device_id=AQANcMdmoWGklScsJYoxx9pQqb4HxrhamOSkiiw3QLSmB4plhywDjh6_l9hdaxBviBIC7keRNd5WKJmES7T2lP9Uz0E4AFEwjAQ; sp_tr=false"
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", req.headers.code as string);
  urlencoded.append("redirect_uri", redirectUri);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  let data;
  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  );

  if (response.ok) {
    data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(400).json("There was a problem retrieving refresh token");
  }
};

export default getRefreshToken;
