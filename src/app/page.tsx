import Link from "next/link";

export default function HomePage() {
  return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold tracking-tight">SW Planets</h1>
        <p className="mt-2 text-sm text-gray-600">
          Open the planets list page.
        </p>

        <Link
            href="/planets"
            className="mt-4 inline-flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
        >
          Go to /planets
        </Link>
      </main>
  );
}
