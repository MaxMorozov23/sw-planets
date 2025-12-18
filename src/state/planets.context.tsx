"use client";

import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from "react";
import type { Planet } from "@/lib/types";
import { fetchAllPlanets } from "@/lib/swapi";
import { initialPlanetsState, planetsReducer } from "./planets.reducer";
import type { PlanetsState } from "./planets.types";

interface PlanetsDerived {
    total: number;
    totalPages: number;
    pageItems: Planet[];
    safePage: number;
}

interface PlanetsContextValue {
    state: PlanetsState;
    derived: PlanetsDerived;
    actions: {
        load: () => Promise<void>;
        refresh: () => Promise<void>;
        setPage: (page: number) => void;
        setPageSize: (pageSize: number) => void;
    };
}

const PlanetsContext = createContext<PlanetsContextValue | null>(null);

export function PlanetsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(planetsReducer, initialPlanetsState);

    const abortRef = useRef<AbortController | null>(null);

    const load = useCallback(async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        dispatch({ type: "FETCH_START" });

        try {
            const planets = await fetchAllPlanets(controller.signal);
            dispatch({ type: "FETCH_SUCCESS", planets, fetchedAt: Date.now() });
        } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") return;
            const msg = e instanceof Error ? e.message : "Unknown error";
            dispatch({ type: "FETCH_ERROR", message: msg });
        }
    }, []);

    const refresh = useCallback(async () => load(), [load]);

    const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
    const setPageSize = useCallback(
        (pageSize: number) => dispatch({ type: "SET_PAGE_SIZE", pageSize }),
        []
    );

    const derived = useMemo<PlanetsDerived>(() => {
        const total = state.planets.length;
        const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
        const safePage = Math.min(Math.max(1, state.page), totalPages);

        const start = (safePage - 1) * state.pageSize;
        const end = start + state.pageSize;
        const pageItems = state.planets.slice(start, end);

        return { total, totalPages, pageItems, safePage };
    }, [state.planets, state.page, state.pageSize]);

    const value = useMemo<PlanetsContextValue>(
        () => ({
            state: { ...state, page: derived.safePage },
            derived,
            actions: { load, refresh, setPage, setPageSize },
        }),
        [state, derived, load, refresh, setPage, setPageSize]
    );

    return <PlanetsContext.Provider value={value}>{children}</PlanetsContext.Provider>;
}

export function usePlanets() {
    const ctx = useContext(PlanetsContext);
    if (!ctx) throw new Error("usePlanets must be used within PlanetsProvider");
    return ctx;
}
