import { User } from "@core/types";

export function getTestUser(): User {
    return {
        email: "test@open.cx",
        name: "testing contact",
        external_id: "test@open.cx",
        customData: {
            env: "test",
            fa7lawyIsTesting: "true"
        }
    }
}