import { AxiosInstance } from "axios";
import { ReactNode, useMemo } from "react";
import { useConfigData } from "./ConfigData";
import { createAxiosInstance } from "@lib/data";
import { createSafeContext } from "./createSafeContext";

interface AxiosInstanceProps {
  axiosInstance: AxiosInstance;
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
