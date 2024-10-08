type RenderType = "default" | "iframed";

// either object or string
type RenderOptions = {
    type: RenderType;
    theme: "default" | "dark";
    layout: "default" | "advanced"; // advanced -> with user's previous conversations
} | RenderType;