import type { Planet } from "@/lib/types";

const BASE_URL = "https://swapi.info/api";

export async function fetchAllPlanets(signal?: AbortSignal): Promise<Planet[]> {
    const res = await fetch(`${BASE_URL}/planets`, {
        signal,
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`SWAPI request failed: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as unknown;

    if (!Array.isArray(data)) {
        throw new Error("Invalid response shape: expected an array of planets");
    }

    return data as Planet[];
}
