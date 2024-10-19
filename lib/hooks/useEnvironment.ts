function useEnvironment() {
    return {
        env: process.env.NODE_ENV || 'development',
    }
}

export {
    useEnvironment
}