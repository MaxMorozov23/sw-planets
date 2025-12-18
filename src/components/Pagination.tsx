"use client";

import React from "react";
import { usePlanets } from "@/state/planets.context";

type PageItem = number | "...";

function getPageItems(current: number, totalPages: number): PageItem[] {
    const windowSize = 1;
    const pages: PageItem[] = [];
    const push = (x: PageItem) => pages.push(x);

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) push(i);
        return pages;
    }

    const left = Math.max(2, current - windowSize);
    const right = Math.min(totalPages - 1, current + windowSize);

    push(1);

    if (left > 2) push("...");

    for (let i = left; i <= right; i++) push(i);

    if (right < totalPages - 1) push("...");

    push(totalPages);

    return pages;
}

export function Pagination() {
    const { state, derived, actions } = usePlanets();
    const { totalPages, safePage } = derived;

    const disabled = state.loading;
    const items = getPageItems(safePage, totalPages);

    const canPrev = safePage > 1;
    const canNext = safePage < totalPages;

    return (
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
            <button
                onClick={() => actions.setPage(safePage - 1)}
                disabled={disabled || !canPrev}
                className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Previous
            </button>

            <div className="flex items-center gap-1">
                {items.map((item, idx) => {
                    if (item === "...") {
                        return (
                            <span key={`dots-${idx}`} className="px-2 text-sm text-gray-500">
                …
              </span>
                        );
                    }

                    const isActive = item === safePage;

                    return (
                        <button
                            key={item}
                            onClick={() => actions.setPage(item)}
                            disabled={disabled}
                            className={[
                                "h-10 min-w-10 rounded-lg border px-3 text-sm font-medium shadow-sm",
                                disabled ? "cursor-not-allowed opacity-60" : "hover:bg-gray-50",
                                isActive
                                    ? "border-black bg-black text-white hover:bg-black dark:border-white dark:hover:text-black"
                                    : "border-gray-200 bg-white text-gray-900",
                            ].join(" ")}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => actions.setPage(safePage + 1)}
                disabled={disabled || !canNext}
                className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Next
            </button>
        </nav>
    );
}
