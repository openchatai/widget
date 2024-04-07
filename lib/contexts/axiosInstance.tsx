import { AxiosInstance } from "axios";
import { ReactNode, useMemo } from "react";
import { useConfigData } from "./ConfigData";
import { createAxiosInstance } from "@lib/data";
import { createSafeContext } from "./createSafeContext";

interface AxiosInstanceProps {
  axiosInstance: AxiosInstance;
}

function randomString(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

const [useAxiosInstance, AxiosSafeProvider] =
  createSafeContext<AxiosInstanceProps>();

function AxiosProvider({ children }: { children: ReactNode }) {
  const { token, apiUrl } = useConfigData();

  const axiosInstance: AxiosInstance = useMemo(() => {
    return createAxiosInstance({
      botToken: token,
      apiUrl: apiUrl,
    });
  }, [token, apiUrl]);
  return (
    <AxiosSafeProvider value={{ axiosInstance }}>{children}</AxiosSafeProvider>
  );
}

export { useAxiosInstance, AxiosProvider };
