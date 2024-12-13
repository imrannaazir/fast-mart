"use client"; // Error boundaries must be Client Components

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex h-screen items-center justify-center">
          <h2>{error.message}!</h2>
          <button className="underline" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
