"use client";

import React, { useEffect } from "react";
import { usePlanets } from "@/state/planets.context";
import { Pagination } from "@/components/Pagination";
import { PlanetsHeader } from "@/components/PlanetsHeader";
import { PlanetCard } from "@/components/PlanetCard";

export default function PlanetsPage() {
    const { state, derived, actions } = usePlanets();

    useEffect(() => {
        if (state.planets.length === 0 && !state.loading) {
            void actions.load();
        }
    }, [actions, state.loading, state.planets.length]);

    const { pageItems } = derived;

    return (
        <main className="mx-auto max-w-4xl p-6">
            <PlanetsHeader />

            {state.error ? (
                <section className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                    <div className="text-sm">
                        <p className="font-semibold text-red-800">Error</p>
                        <p className="mt-1 text-red-700">{state.error}</p>
                    </div>

                    <div className="mt-3">
                        <button
                            onClick={() => void actions.load()}
                            disabled={state.loading}
                            className="h-10 rounded-lg bg-red-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:opacity-60"
                        >
                            Retry
                        </button>
                    </div>
                </section>
            ) : null}

            <section className="mt-6">
                {state.loading && state.planets.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 p-6">
                        <p className="text-sm text-gray-600">Loading planets…</p>
                    </div>
                ) : (
                    <ul className="grid gap-3">
                        {pageItems.map((p) => (
                            <PlanetCard key={p.url} planet={p} />
                        ))}
                    </ul>
                )}
            </section>

            <footer className="mt-6">
                <Pagination />
            </footer>
        </main>
    );
}
