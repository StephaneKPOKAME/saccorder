"use client";

import { useState } from "react";
import Link from "next/link";
import { CATALOGUE } from "@/lib/catalogue";
import { THEME_COLORS, THEME_COLOR_CLASSES, SECTION_ACCENTS } from "@/lib/theme-colors";
import { Wordmark } from "@/components/logo";
import type { QuestionCounts } from "@/lib/analysis";

type CardWithAnswers = {
  id: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  answers: Record<string, number>;
};

export function TeamView({
  sessionId,
  sessionTitle,
  cards,
  questionCounts,
}: {
  sessionId: string;
  sessionTitle: string;
  cards: CardWithAnswers[];
  questionCounts: QuestionCounts[];
}) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? null;

  const contrastBySection = CATALOGUE.map((section) => ({
    section,
    questions: questionCounts.filter((q) => q.sectionId === section.id && q.isContrast),
  })).filter((entry) => entry.questions.length > 0);

  return (
    <div className="flex flex-1 flex-col">
      <nav className="sticky top-0 z-10 border-b border-border bg-white/5 px-6 py-4 [backdrop-filter:blur(24px)_saturate(140%)] sm:px-10">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <Link href="/app">
            <Wordmark />
          </Link>
          <Link href="/app" className="text-sm text-text-2 transition hover:text-text">
            ← Mes sessions
          </Link>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-14 px-6 py-16 sm:px-10">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-title text-text">{sessionTitle}</h1>
            <nav className="flex gap-3">
              <span className="rounded-pill bg-text px-5 py-2 text-sm font-medium text-bg">
                Résultats
              </span>
              <Link
                href={`/app/session/${sessionId}/regles`}
                className="rounded-pill border border-border-strong px-5 py-2 text-sm font-medium text-text transition hover:bg-surface-2"
              >
                Règles
              </Link>
            </nav>
          </div>
        </header>

        {cards.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface-1/50 px-6 py-8 text-center text-body text-text-2">
            Aucune carte pour le moment. Partagez le lien à votre équipe.
          </p>
        ) : (
          <>
            <section className="flex flex-col gap-5">
              <p className="text-label uppercase text-text-3">Équipe</p>
              <div className="flex flex-wrap gap-3">
                {cards.map((card, index) => {
                  const color = THEME_COLORS[index % THEME_COLORS.length];
                  const classes = THEME_COLOR_CLASSES[color];
                  const initials = `${card.firstName[0] ?? ""}${card.lastName[0] ?? ""}`.toUpperCase();
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedCardId(card.id)}
                      className="flex items-center gap-3 rounded-lg border border-border bg-surface-1 px-5 py-4 text-left transition hover:border-border-strong focus:outline-none focus:shadow-halo"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-sm font-medium ${classes.solid} ${classes.textOn}`}
                      >
                        {initials}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-body text-text">
                          {card.firstName} {card.lastName}
                        </span>
                        <span className="text-sm text-text-3">{card.roleTitle}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {contrastBySection.length > 0 && (
              <section className="flex flex-col gap-6">
                <p className="text-label uppercase text-text-3">Points de contraste</p>
                {contrastBySection.map(({ section, questions }) => (
                  <div key={section.id} className="flex flex-col gap-4">
                    <p className="text-body font-medium text-text">{section.title}</p>
                    {questions.map((question) => (
                      <div
                        key={question.questionId}
                        className="flex flex-col gap-2 rounded-lg border border-abricot/30 bg-abricot/5 px-6 py-5"
                      >
                        <p className="text-body text-text">{question.questionLabel}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-text-2">
                          {question.options.map((option, index) => (
                            <span key={option}>
                              {option} — {question.counts[index]}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            )}

            <section className="flex flex-col gap-6">
              <p className="text-label uppercase text-text-3">Tendances par question</p>
              {CATALOGUE.map((section) => {
                const sectionQuestions = questionCounts.filter((q) => q.sectionId === section.id);
                const accent = THEME_COLOR_CLASSES[SECTION_ACCENTS[section.id]];
                return (
                  <div
                    key={section.id}
                    className="flex flex-col gap-6 rounded-lg border border-border bg-surface-1 p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-pill ${accent.solid}`} />
                      <p className="text-body font-medium text-text">{section.title}</p>
                    </div>
                    {sectionQuestions.map((question) => {
                      const total = question.counts.reduce((sum, count) => sum + count, 0);
                      return (
                        <div key={question.questionId} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-body text-text">{question.questionLabel}</p>
                            {question.isContrast && (
                              <span className="shrink-0 rounded-pill border border-abricot/40 bg-abricot/10 px-3 py-1 text-xs text-abricot">
                                À creuser
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            {question.options.map((option, index) => {
                              const count = question.counts[index];
                              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                              return (
                                <div key={option} className="flex flex-col gap-1">
                                  <div className="flex items-center justify-between text-sm text-text-2">
                                    <span>{option}</span>
                                    <span>
                                      {pct} % ({count})
                                    </span>
                                  </div>
                                  <div className="h-2 overflow-hidden rounded-pill bg-surface-2">
                                    <div
                                      className={`h-full rounded-pill transition-all ${accent.fill}`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </section>
          </>
        )}
      </main>

      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10"
          onClick={() => setSelectedCardId(null)}
        >
          <div
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface-1 p-8 sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-title text-text">
                  {selectedCard.firstName} {selectedCard.lastName}
                </h2>
                <p className="text-body text-text-2">{selectedCard.roleTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardId(null)}
                className="shrink-0 rounded-pill border border-border-strong px-4 py-1 text-sm text-text transition hover:bg-surface-2"
              >
                Fermer
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {CATALOGUE.map((section) => {
                const accent = THEME_COLOR_CLASSES[SECTION_ACCENTS[section.id]];
                return (
                  <div key={section.id} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-pill ${accent.solid}`} />
                      <p className="text-label uppercase text-text-3">{section.title}</p>
                    </div>
                    {section.questions.map((question) => (
                      <div key={question.id} className="flex flex-col gap-1">
                        <p className="text-sm text-text-3">{question.label}</p>
                        <p className="text-body text-text">
                          {question.options[selectedCard.answers[question.id]]}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
