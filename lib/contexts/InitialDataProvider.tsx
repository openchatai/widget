import { ReactNode } from "react";
import { createSafeContext } from "./createSafeContext";
import useSWR, { SWRResponse } from "swr";
import { useAxiosInstance } from "./axiosInstance";
import { InitialData, getInitData } from "@lib/data";
import { useConfigData } from "./ConfigData";

const [useInitialData, SafeProvider] = createSafeContext<{
  data: SWRResponse<InitialData, unknown, unknown>;
}>();

function InitialDataProvider({ children }: { children: ReactNode }) {
  const { axiosInstance } = useAxiosInstance();
  const { token } = useConfigData();
  const data = useSWR(["initialData", token], async () => {
    const { data } = await getInitData(axiosInstance);
    return (
      data ?? {
        faq: [],
        history: [],
        initial_questions: [],
        logo: "",
      }
    );
  });

  return <SafeProvider value={{ data }}>{children}</SafeProvider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export { InitialDataProvider, useInitialData };
