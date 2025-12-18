import type { PlanetsAction, PlanetsState } from "./planets.types";

export const initialPlanetsState: PlanetsState = {
    planets: [],
    page: 1,
    pageSize: 10,
    loading: false,
    error: null,
    lastUpdatedAt: null,
};

export function planetsReducer(state: PlanetsState, action: PlanetsAction): PlanetsState {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                planets: action.planets,
                lastUpdatedAt: action.fetchedAt,
                page: 1,
            };

        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.message };

        case "SET_PAGE":
            return { ...state, page: action.page };

        case "SET_PAGE_SIZE":
            return { ...state, pageSize: action.pageSize, page: 1 };

        default:
            return state;
    }
}
