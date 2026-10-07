"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FooterNewsletter({
  text,
  placeholder,
  submitLabel,
  success,
  invalid,
}: {
  text: string;
  placeholder: string;
  submitLabel: string;
  success: string;
  invalid: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "done" : "error");
  }

  return (
    <div className="mt-6">
      <p className="text-sm leading-relaxed text-zinc-400">{text}</p>
      {status === "done" ? (
        <p className="mt-3 text-sm text-[#FF5A00]" role="status">
          {success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-3 flex gap-2" noValidate>
          <label htmlFor="footer-newsletter" className="sr-only">
            {placeholder}
          </label>
          <input
            id="footer-newsletter"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            placeholder={placeholder}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "footer-newsletter-error" : undefined}
            className="h-11 min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#FF5A00]"
          />
          <button
            type="submit"
            aria-label={submitLabel}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#FF5A00] text-zinc-950 transition hover:bg-[#ff6a1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5A00]"
          >
            <ArrowRight className="size-4" />
          </button>
        </form>
      )}
      {status === "error" ? (
        <p id="footer-newsletter-error" className="mt-2 text-xs text-red-400">
          {invalid}
        </p>
      ) : null}
    </div>
  );
}
