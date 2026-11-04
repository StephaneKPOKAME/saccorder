import { CATALOGUE } from "./catalogue";

export type CardAnswers = Record<string, number>;

export type QuestionCounts = {
  sectionId: string;
  sectionTitle: string;
  questionId: string;
  questionLabel: string;
  options: [string, string, string];
  counts: [number, number, number];
  isContrast: boolean;
};

export function computeQuestionCounts(cardsAnswers: CardAnswers[]): QuestionCounts[] {
  const result: QuestionCounts[] = [];

  for (const section of CATALOGUE) {
    for (const question of section.questions) {
      const counts: [number, number, number] = [0, 0, 0];
      for (const answers of cardsAnswers) {
        const optionIndex = answers[question.id];
        if (optionIndex === 0 || optionIndex === 1 || optionIndex === 2) {
          counts[optionIndex] += 1;
        }
      }
      const distinctChosen = counts.filter((count) => count > 0).length;
      result.push({
        sectionId: section.id,
        sectionTitle: section.title,
        questionId: question.id,
        questionLabel: question.label,
        options: question.options,
        counts,
        isContrast: distinctChosen >= 2,
      });
    }
  }

  return result;
}
