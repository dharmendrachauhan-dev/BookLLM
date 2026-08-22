const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public details?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const headers = new Headers(options.headers);

    if (
        options.body &&
        !headers.has("Content-Type") &&
        !(options.body instanceof FormData)
    ) {
        headers.set("Content-Type", "application/json");
    }

    const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

    const response = await fetch(url, {
        ...options,
        credentials: "include",
        headers,
    });

    if (response.status === 204) {
        return undefined as T;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new ApiError(
            response.status,
            (data as { error?: string } | null)?.error ?? "Request failed",
            (data as { details?: unknown } | null)?.details,
        );
    }

    return data as T;
}
