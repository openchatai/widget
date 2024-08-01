import { createSafeContext } from "../utils/create-safe-context";
import type { WidgetOptions } from "@lib/types";
import type { ReactNode } from "react";

const [useConfigData, ConfigDataSafeProvider] = createSafeContext<WidgetOptions>();

export function ConfigDataProvider({
  children,
  data,
}: {
  data: WidgetOptions;
  children: ReactNode;
}) {
  return (
    <ConfigDataSafeProvider value={data}>
      {children}
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
