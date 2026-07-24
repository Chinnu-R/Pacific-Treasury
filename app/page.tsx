"use client";

import { useState, type FormEvent } from "react";

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string; zipcode: string };
};

type RequestState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "success"; user: ApiUser; matched: boolean }
  | { phase: "error"; message: string };

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [request, setRequest] = useState<RequestState>({ phase: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRequest({ phase: "loading" });

    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const users: ApiUser[] = await res.json();

      if (!Array.isArray(users) || users.length === 0) {
        throw new Error("The API returned no data to display.");
      }

      // This demo API doesn't know about real accounts, so we try to
      // match the entered email against its sample users, and fall
      // back to the first record just to show a real response either way.
      const matched = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      setRequest({
        phase: "success",
        user: matched ?? users[0],
        matched: Boolean(matched),
      });
    } catch (err) {
      setRequest({
        phase: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong while reaching the API.",
      });
    }
  }

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-[var(--color-bg)]">
      {/* ---------- Left: brand column ---------- */}
      <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden border-r border-[var(--color-line-soft)] px-14 py-12 lg:flex">
        {/* horizon signature graphic */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 62%, var(--color-bg) 100%)",
            }}
          />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 600 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            {/* depth-sounding arcs, rising from lower-left, like soundings on a nautical chart */}
            {[120, 200, 280, 360, 440, 520].map((r) => (
              <circle
                key={r}
                cx="40"
                cy="900"
                r={r}
                stroke="var(--color-line)"
                strokeWidth="1"
                opacity={0.5}
              />
            ))}
            {/* horizon line */}
            <line
              x1="0"
              y1="560"
              x2="600"
              y2="560"
              stroke="url(#horizonGradient)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="horizonGradient" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* wordmark */}
        <div className="relative z-10 flex items-center gap-3">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13.5" stroke="var(--color-gold)" strokeWidth="1" />
            <line x1="1.5" y1="15" x2="28.5" y2="15" stroke="var(--color-gold)" strokeWidth="1" />
            <circle cx="15" cy="15" r="3.5" fill="var(--color-gold)" />
          </svg>
          <span className="font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[0.34em] text-[var(--color-text-muted)]">
            Est. Pacific Rim
          </span>
        </div>

        {/* headline block */}
        <div className="relative z-10 max-w-md">
          <h1 className="font-[family-name:var(--font-display)] text-[42px] font-medium leading-[1.05] text-[var(--color-text)]">
            Pacific
            <br />
            Treasury
          </h1>
          <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            Custody, liquidity, and settlement for institutions that move
            capital across the Pacific corridor.
          </p>
        </div>

        {/* footer trust line */}
        <div className="relative z-10 flex items-center gap-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
          <span>256-bit encryption</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-text-faint)]" />
          <span>SOC 2 Type II</span>
        </div>
      </section>

      {/* ---------- Right: form column ---------- */}
      <section className="flex w-full flex-1 items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-[400px]">
          {/* mobile-only wordmark */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="13.5" stroke="var(--color-gold)" strokeWidth="1" />
              <line x1="1.5" y1="15" x2="28.5" y2="15" stroke="var(--color-gold)" strokeWidth="1" />
              <circle cx="15" cy="15" r="3.5" fill="var(--color-gold)" />
            </svg>
            <span className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text)]">
              Pacific Treasury
            </span>
          </div>

          <div className="mb-9">
            <h2 className="font-[family-name:var(--font-display)] text-[28px] font-medium text-[var(--color-text)]">
              Sign in
            </h2>
            <p className="mt-2 text-[14px] text-[var(--color-text-muted)]">
              Enter your credentials to access your treasury dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-[3px] border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-4 py-3 text-[15px] text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-gold)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/30"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--color-gold)] transition-opacity hover:opacity-80"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full rounded-[3px] border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-4 py-3 pr-12 text-[15px] text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-gold)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-gold)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex select-none items-center gap-2.5 pt-1 text-[13px] text-[var(--color-text-muted)]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded-[2px] border border-[var(--color-line)] bg-[var(--color-surface-soft)] accent-[var(--color-gold)]"
              />
              Keep me signed in on this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={request.phase === "loading"}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[3px] bg-[var(--color-gold)] px-4 py-3 text-[14px] font-medium tracking-[0.02em] text-[var(--color-bg)] transition-colors hover:bg-[var(--color-gold-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {request.phase === "loading" ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* ---------- API result panel ---------- */}
          {request.phase !== "idle" && (
            <div
              className="mt-6 rounded-[3px] border border-[var(--color-line)] bg-[var(--color-surface-soft)] p-4"
              role="status"
              aria-live="polite"
            >
              {request.phase === "loading" && (
                <div className="flex items-center gap-3 text-[13px] text-[var(--color-text-muted)]">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-[var(--color-gold)] border-t-transparent" />
                  Calling JSONPlaceholder API…
                </div>
              )}

              {request.phase === "error" && (
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#e08a6b]">
                    Request failed
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                    {request.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setRequest({ phase: "idle" })}
                    className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-gold)] hover:opacity-80"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {request.phase === "success" && (
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold)]">
                    {request.matched
                      ? "Account found"
                      : "No account matched — sample API response"}
                  </p>
                  <dl className="mt-2.5 space-y-1.5 text-[13px] text-[var(--color-text)]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--color-text-faint)]">Name</dt>
                      <dd className="text-right">{request.user.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--color-text-faint)]">Username</dt>
                      <dd className="text-right">{request.user.username}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--color-text-faint)]">Email</dt>
                      <dd className="text-right">{request.user.email}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--color-text-faint)]">Company</dt>
                      <dd className="text-right">{request.user.company.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--color-text-faint)]">City</dt>
                      <dd className="text-right">{request.user.address.city}</dd>
                    </div>
                  </dl>
                  {!request.matched && (
                    <p className="mt-2.5 text-[12px] leading-relaxed text-[var(--color-text-faint)]">
                      JSONPlaceholder is a mock API with a fixed set of test
                      users, so it won&apos;t recognize a real email — this
                      record is its first sample user, shown to demonstrate a
                      live fetch and response.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="mt-8 text-center text-[13px] text-[var(--color-text-faint)]">
            Not enrolled?{" "}
            <a href="#" className="text-[var(--color-text-muted)] underline underline-offset-4 hover:text-[var(--color-gold)]">
              Contact your relationship manager
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
