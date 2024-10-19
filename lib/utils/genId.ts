const genId = (len = 20) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < len; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
};
export { genId };

if (import.meta.vitest) {
    const { describe, expect, it } = import.meta.vitest;

    describe("genId", () => {
        it("should generate a random id", () => {
            const id = genId();
            expect(id).toBeTruthy();
        });

        it("should generate a random id with a specific length", () => {
            const id = genId(10);
            expect(id).toHaveLength(10);
        });

        it("should truly generate a random id several times", () => {
            const ids = Array.from({ length: 100 }, () => genId());
            expect(new Set(ids).size).toBe(ids.length);
        })
    });

}