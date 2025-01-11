import { User } from "@core/types";

export function getTestUser(): User {
    return {
        email: "test@open.cx",
        name: "testing contact",
        customData: {
            env: "test",
            fa7lawyIsTesting: "true"
        }
    }
}