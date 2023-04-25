import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getRefreshToken = async (code: string) => {
  const res = await fetch("/api/getRefreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      code: code,
    },
  });

  return await res.json();
};

const Callback: NextPage = () => {
  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: "refreshToken",
  });

  const router = useRouter();

  // get code from url
  const code = router.query.code as string;

  const { data, isLoading, error } = useQuery<unknown>(
    ["refreshToken", code],
    () => code && getRefreshToken(code),

    {
      enabled: !!code,
    }
  );

  useEffect(() => {
    if (data && typeof data === "object" && "refresh_token" in data) {
      if (data.refresh_token && typeof data.refresh_token === "string") {
        setRefreshToken(data.refresh_token);
        router.push("/dashboard");
      }
    }
  }, [data]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
    </>
  );
};

export default Callback;
