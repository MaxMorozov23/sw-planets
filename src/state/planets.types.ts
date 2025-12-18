import type { Planet } from "@/lib/types";

export interface PlanetsState {
    planets: Planet[];
    page: number;
    pageSize: number;
    loading: boolean;
    error: string | null;
    lastUpdatedAt: number | null;
}

export type PlanetsAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; planets: Planet[]; fetchedAt: number }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "SET_PAGE"; page: number }
    | { type: "SET_PAGE_SIZE"; pageSize: number };
