"use client";

import { UserContext } from "@/hooks/user-context";


export default function UserContextWrapper({ user, children,
}: {
    user: any;
    children: React.ReactNode;
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
