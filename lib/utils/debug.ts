function debug(...args: unknown[]) {
    const prefix = "[useChat]";
    if (process.env.NODE_ENV === "development") {
        console.log(prefix, ...args);
    }
}

export { debug };