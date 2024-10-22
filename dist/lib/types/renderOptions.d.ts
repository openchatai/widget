type RenderType = "default" | "iframed";
type RenderOptions = {
    type: RenderType;
    theme: "default" | "dark";
    layout: "default" | "advanced";
} | RenderType;
