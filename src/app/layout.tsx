import "./globals.css";
import type { Metadata } from "next";
import { PlanetsProvider } from "@/state/planets.context";
import React from "react";

export const metadata: Metadata = {
    title: "SW Planets",
    description: "Planets list from swapi.info",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <PlanetsProvider>{children}</PlanetsProvider>
            </body>
        </html>
    );
}
