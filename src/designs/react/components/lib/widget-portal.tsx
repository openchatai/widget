import React from "react";
import { createPortal } from "react-dom";
import { useFrame } from "@uiw/react-iframe";

const PORTAL_ID = "opencx-widget-portal";

function WidgetPortal() {
  return null;
}

function Portal({ children }: { children: React.ReactNode }) {
  const portalContainer = useFrame()?.document?.getElementById(PORTAL_ID);

  if (!portalContainer) {
    console.error("Portal container not found!");
    return null;
  }

  return createPortal(children, portalContainer);
}

function Container() {
  return <div id={PORTAL_ID} className="absolute size-full top-0 left-0" />;
}

WidgetPortal.Portal = Portal;
WidgetPortal.Container = Container;

export { WidgetPortal };
