"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/logo";
import { addRule, deleteRule, swapRulePositions, updateRule, type RuleRow } from "./actions";

type ContrastChip = {
  questionId: string;
  questionLabel: string;
  sectionTitle: string;
};

export function RulesView({
  sessionId,
  sessionTitle,
  contrastChips,
  initialRules,
}: {
  sessionId: string;
  sessionTitle: string;
  contrastChips: ContrastChip[];
  initialRules: RuleRow[];
}) {
  const [rules, setRules] = useState<RuleRow[]>(initialRules);
  const [pending, setPending] = useState(false);

  async function handleAddFromChip(chip: ContrastChip) {
    setPending(true);
    try {
      const rule = await addRule(sessionId, chip.questionLabel, chip.sectionTitle);
      setRules((state) => [...state, rule]);
    } finally {
      setPending(false);
    }
  }

  async function handleAddEmpty() {
    setPending(true);
    try {
      const rule = await addRule(sessionId, "", "");
      setRules((state) => [...state, rule]);
    } finally {
      setPending(false);
    }
  }

  function handleEditLocal(ruleId: string, fields: { text?: string; theme?: string }) {
    setRules((state) =>
      state.map((rule) => (rule.id === ruleId ? { ...rule, ...fields } : rule)),
    );
  }

  function handleBlurPersist(ruleId: string, fields: { text?: string; theme?: string }) {
    void updateRule(ruleId, sessionId, fields);
  }

  async function handleDelete(ruleId: string) {
    setRules((state) => state.filter((rule) => rule.id !== ruleId));
    await deleteRule(ruleId, sessionId);
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= rules.length) return;

    const current = rules[index];
    const target = rules[targetIndex];

    const reordered = [...rules];
    reordered[index] = { ...target, position: current.position };
    reordered[targetIndex] = { ...current, position: target.position };
    reordered.sort((a, b) => a.position - b.position);
    setRules(reordered);

    await swapRulePositions(
      sessionId,
      { id: current.id, position: current.position },
      { id: target.id, position: target.position },
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <nav className="sticky top-0 z-10 border-b border-border bg-white/5 px-6 py-4 [backdrop-filter:blur(24px)_saturate(140%)] sm:px-10 print:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <Link href="/app">
            <Wordmark />
          </Link>
          <Link href="/app" className="text-sm text-text-2 transition hover:text-text">
            ← Mes sessions
          </Link>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-14 px-6 py-16 sm:px-10 print:py-0">
        <header className="flex flex-col gap-4 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-title text-text">{sessionTitle}</h1>
            <nav className="flex gap-3">
              <Link
                href={`/app/session/${sessionId}`}
                className="rounded-pill border border-border-strong px-5 py-2 text-sm font-medium text-text transition hover:bg-surface-2"
              >
                Résultats
              </Link>
              <span className="rounded-pill bg-text px-5 py-2 text-sm font-medium text-bg">
                Règles
              </span>
            </nav>
          </div>
        </header>

        {contrastChips.length > 0 && (
          <section className="flex flex-col gap-4 print:hidden">
            <p className="text-label uppercase text-text-3">Pistes</p>
            <div className="flex flex-wrap gap-2">
              {contrastChips.map((chip) => (
                <button
                  key={chip.questionId}
                  type="button"
                  disabled={pending}
                  onClick={() => handleAddFromChip(chip)}
                  className="rounded-pill border border-abricot/40 bg-abricot/10 px-4 py-2 text-sm text-abricot transition hover:bg-abricot/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + {chip.questionLabel}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-5 print:hidden">
          <p className="text-label uppercase text-text-3">Règles d&apos;équipe</p>

          {rules.length === 0 ? (
            <p className="rounded-lg border border-border bg-surface-1/50 px-6 py-8 text-center text-body text-text-2">
              Aucune règle pour le moment. Ajoutez-en une, ou partez d&apos;une piste ci-dessus.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {rules.map((rule, index) => (
                <li
                  key={rule.id}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-surface-1 px-6 py-5 sm:flex-row sm:items-start"
                >
                  <div className="flex flex-1 flex-col gap-3">
                    <input
                      type="text"
                      value={rule.text}
                      placeholder="Texte de la règle"
                      onChange={(event) => handleEditLocal(rule.id, { text: event.target.value })}
                      onBlur={(event) => handleBlurPersist(rule.id, { text: event.target.value })}
                      className="rounded-md border border-border bg-surface-2 px-5 py-2.5 text-body text-text outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
                    />
                    <input
                      type="text"
                      value={rule.theme}
                      placeholder="Thème"
                      onChange={(event) => handleEditLocal(rule.id, { theme: event.target.value })}
                      onBlur={(event) => handleBlurPersist(rule.id, { theme: event.target.value })}
                      className="rounded-md border border-border bg-surface-2 px-5 py-2.5 text-sm text-text-2 outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
                    />
                  </div>
                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, -1)}
                      className="rounded-pill border border-border-strong px-3 py-1 text-sm text-text transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === rules.length - 1}
                      onClick={() => handleMove(index, 1)}
                      className="rounded-pill border border-border-strong px-3 py-1 text-sm text-text transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(rule.id)}
                      className="rounded-pill border border-border-strong px-3 py-1 text-sm text-text-2 transition hover:bg-surface-2"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            disabled={pending}
            onClick={handleAddEmpty}
            className="inline-flex items-center justify-center gap-3 self-start rounded-pill border border-border-strong px-5 py-2 text-sm font-medium text-text transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Ajouter une règle
          </button>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-label uppercase text-text-3 print:hidden">Charte</p>
          <div className="print-area flex flex-col gap-6 rounded-xl border border-border bg-surface-1 p-8 sm:p-10">
            <header className="flex flex-col gap-1">
              <p className="font-logo text-xl text-text">s&apos;accorder</p>
              <h2 className="font-display text-title text-text">{sessionTitle}</h2>
              <p className="text-body text-text-2">Charte d&apos;équipe</p>
            </header>

            {rules.length === 0 ? (
              <p className="text-body text-text-2">Aucune règle pour le moment.</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {rules.map((rule) => (
                  <li key={rule.id} className="flex flex-col gap-1">
                    <p className="text-body text-text">{rule.text || "—"}</p>
                    {rule.theme && <p className="text-sm text-text-3">{rule.theme}</p>}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-3 self-start rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg print:hidden"
          >
            Télécharger la charte (PDF)
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
              →
            </span>
          </button>
        </section>
      </main>
    </div>
  );
}
