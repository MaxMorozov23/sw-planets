"use client";

import React from "react";
import { usePlanets } from "@/state/planets.context";

export function PlanetsHeader() {
    const { state, derived, actions } = usePlanets();
    const { total, totalPages, safePage } = derived;

    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Planets</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Total: <span className="font-medium text-gray-900 dark:text-gray-600">{total}</span> | Page{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-600">{safePage}</span> /{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-600">{totalPages}</span>
                    {state.lastUpdatedAt ? (
                        <span className="ml-2">
              | Updated {new Date(state.lastUpdatedAt).toLocaleString()}
            </span>
                    ) : null}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <select
                    value={state.pageSize}
                    onChange={(e) => actions.setPageSize(Number(e.target.value))}
                    disabled={state.loading}
                    className="h-10 rounded-lg border border-gray-200 bg-white dark:bg-black px-3 text-sm shadow-sm disabled:opacity-60"
                >
                    {[5, 10, 20].map((n) => (
                        <option key={n} value={n}>
                            {n}/page
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => void actions.refresh()}
                    disabled={state.loading}
                    className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {state.loading ? "Loading..." : "Refresh"}
                </button>
            </div>
        </header>
    );
}
