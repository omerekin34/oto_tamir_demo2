"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";

type FormCopy = Dictionary["contact"]["form"];

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", subject: "", message: "" };

function validate(fields: Fields, errors: FormCopy["errors"]): Errors {
  const next: Errors = {};
  if (fields.name.trim().length < 2) next.name = errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = errors.email;
  if (!fields.subject) next.subject = errors.subject;
  if (fields.message.trim().length < 12) next.message = errors.message;
  return next;
}

export function ContactForm({ form }: { form: FormCopy }) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(fields, form.errors);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSending(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-[#FF5A00]/40 bg-zinc-900 p-8">
        <CheckCircle2 className="size-8 text-[#FF5A00]" />
        <h2 className="mt-4 font-display text-4xl uppercase text-white">{form.successTitle}</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{form.successText}</p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setFields(empty);
          }}
          className="mt-6 rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-[#FF5A00]"
        >
          {form.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8">
      <div className="grid gap-5">
        <Field label={form.name} error={errors.name}>
          <input
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
        <Field label={form.email} error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
        <Field label={form.subject} error={errors.subject}>
          <div className="relative">
            <select
              value={fields.subject}
              onChange={(event) => update("subject", event.target.value)}
              aria-invalid={Boolean(errors.subject)}
              className={cn(inputClass(Boolean(errors.subject)), "appearance-none pr-10", fields.subject ? "text-white" : "text-zinc-500")}
            >
              <option value="">{form.subjectPlaceholder}</option>
              {form.subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500" />
          </div>
        </Field>
        <Field label={form.message} error={errors.message}>
          <textarea
            value={fields.message}
            onChange={(event) => update("message", event.target.value)}
            rows={5}
            placeholder={form.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClass(Boolean(errors.message)), "resize-y")}
          />
        </Field>
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-[#FF5A00] px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-500 disabled:opacity-60"
        >
          {sending ? form.sending : form.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <span className="mt-2 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full rounded-xl border bg-zinc-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600",
    invalid ? "border-red-400/80" : "border-white/10 focus:border-[#FF5A00]",
  );
}
