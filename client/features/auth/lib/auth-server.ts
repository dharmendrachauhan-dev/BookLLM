// This codes check current session. next send request to backend user is logged in or not

import { headers } from "next/headers";
import { authClient } from "./auth-client";

export type Session = typeof authClient.$Infer.Session;

export async function getSession(): Promise<Session | null> {
    const requestHeaders = await headers();
    const cookie = requestHeaders.get("cookie") ?? "";


    const respose = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:8081"}/api/auth/get-session`,
        {
            headers: {cookie},
            cache: "no-store"
        },
    )

    if(!respose.ok){
        return null;
    }

    const data = (await respose.json()) as Session | null
    return data?.user ? data : null
}