"use client";

import { useState } from "react";
import { CATALOGUE } from "@/lib/catalogue";
import { SECTION_ACCENTS, THEME_COLOR_CLASSES } from "@/lib/theme-colors";
import { Wordmark } from "@/components/logo";
import { submitCard, type IdentityPayload } from "./actions";

type Step = "identity" | "questions" | "done";

const TOTAL_QUESTIONS = CATALOGUE.reduce((sum, section) => sum + section.questions.length, 0);

export function CollaboratorForm({
  token,
  sessionTitle,
}: {
  token: string;
  sessionTitle: string;
}) {
  const [step, setStep] = useState<Step>("identity");
  const [identity, setIdentity] = useState<IdentityPayload>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const identityComplete =
    identity.firstName.trim() !== "" &&
    identity.lastName.trim() !== "" &&
    identity.role.trim() !== "" &&
    identity.email.trim() !== "";

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submitCard(
        token,
        identity,
        CATALOGUE.flatMap((section) =>
          section.questions.map((question) => ({
            section_id: section.id,
            question_id: question.id,
            option_index: answers[question.id],
          })),
        ),
      );
      setStep("done");
    } catch {
      setError("L'enregistrement a échoué. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "identity") {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-6 py-16">
        <header className="flex flex-col gap-3">
          <Wordmark />
          <h1 className="font-display text-title text-text">{sessionTitle}</h1>
          <p className="text-body text-text-2">
            Quelques informations avant de commencer.
          </p>
        </header>

        <form
          className="flex flex-col gap-6 rounded-xl border border-border bg-surface-1 p-8"
          onSubmit={(event) => {
            event.preventDefault();
            if (identityComplete) setStep("questions");
          }}
        >
          <Field
            label="Prénom"
            value={identity.firstName}
            onChange={(value) => setIdentity((state) => ({ ...state, firstName: value }))}
          />
          <Field
            label="Nom"
            value={identity.lastName}
            onChange={(value) => setIdentity((state) => ({ ...state, lastName: value }))}
          />
          <Field
            label="Poste"
            value={identity.role}
            onChange={(value) => setIdentity((state) => ({ ...state, role: value }))}
          />
          <Field
            label="Email"
            type="email"
            value={identity.email}
            onChange={(value) => setIdentity((state) => ({ ...state, email: value }))}
          />
          <p className="text-sm text-text-3">Vous recevrez votre carte à cette adresse.</p>

          <button
            type="submit"
            disabled={!identityComplete}
            className="inline-flex items-center justify-center gap-3 self-start rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            Commencer
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
              →
            </span>
          </button>
        </form>
      </main>
    );
  }

  if (step === "questions") {
    const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-3">
          <Wordmark />
          <h1 className="font-display text-title text-text">{sessionTitle}</h1>
          <div className="flex flex-col gap-2">
            <div className="h-2 overflow-hidden rounded-pill bg-surface-2">
              <div
                className="h-full rounded-pill bg-mint transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-body text-text-2">
              {answeredCount} / {TOTAL_QUESTIONS} questions répondues
            </p>
          </div>
        </header>

        {CATALOGUE.map((section) => {
          const accent = THEME_COLOR_CLASSES[SECTION_ACCENTS[section.id]];
          return (
            <section
              key={section.id}
              className="flex flex-col gap-6 rounded-lg border border-border bg-surface-1 p-6 sm:p-8"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-pill ${accent.solid}`} />
                <p className="text-label uppercase text-text-3">{section.title}</p>
              </div>
              {section.questions.map((question) => (
                <div key={question.id} className="flex flex-col gap-3">
                  <p className="text-body text-text">{question.label}</p>
                  <div className="flex flex-col gap-2">
                    {question.options.map((option, index) => {
                      const selected = answers[question.id] === index;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setAnswers((state) => ({ ...state, [question.id]: index }))
                          }
                          className={
                            selected
                              ? "rounded-md bg-mint px-5 py-3 text-left text-body font-medium text-bg shadow-halo transition"
                              : "rounded-md border border-border bg-surface-2 px-5 py-3 text-left text-body text-text transition hover:border-border-strong focus:outline-none focus:shadow-halo"
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          );
        })}

        {error && <p className="text-sm text-abricot">{error}</p>}

        <button
          type="button"
          disabled={!allAnswered || submitting}
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-3 self-start rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Enregistrement..." : "Enregistrer"}
          <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
            →
          </span>
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="print-area flex flex-col gap-10 rounded-xl border border-border bg-surface-1 p-8 sm:p-10">
        <header className="flex flex-col gap-2">
          <p className="font-logo text-xl text-text">s&apos;accorder</p>
          <h1 className="font-display text-title text-text">{sessionTitle}</h1>
          <p className="text-body text-text-2">
            {identity.firstName} {identity.lastName} — {identity.role}
          </p>
        </header>

        {CATALOGUE.map((section) => {
          const accent = THEME_COLOR_CLASSES[SECTION_ACCENTS[section.id]];
          return (
            <section key={section.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-pill ${accent.solid}`} />
                <p className="text-label uppercase text-text-3">{section.title}</p>
              </div>
              {section.questions.map((question) => (
                <div key={question.id} className="flex flex-col gap-1">
                  <p className="text-sm text-text-3">{question.label}</p>
                  <p className="text-body text-text">
                    {question.options[answers[question.id]]}
                  </p>
                </div>
              ))}
            </section>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center justify-center gap-3 self-start rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg print:hidden"
      >
        Télécharger ma carte (PDF)
        <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
          →
        </span>
      </button>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-label uppercase text-text-3">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-border bg-surface-2 px-5 py-3 text-body text-text outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
      />
    </div>
  );
}
