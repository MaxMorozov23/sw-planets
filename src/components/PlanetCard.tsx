"use client";

import React from "react";
import type { Planet } from "@/lib/types";

export function PlanetCard({ planet }: { planet: Planet }) {
    return (
        <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900">{planet.name}</h3>

                    <p className="mt-1 text-sm text-gray-600">
                        Climate: <span className="text-gray-900">{planet.climate}</span> • Terrain:{" "}
                        <span className="text-gray-900">{planet.terrain}</span> • Population:{" "}
                        <span className="text-gray-900">{planet.population}</span>
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Gravity: {planet.gravity} • Surface water: {planet.surface_water} • Diameter: {planet.diameter}
                    </p>
                </div>

                <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          Residents: {planet.residents.length}
        </span>
            </div>
        </li>
    );
}
