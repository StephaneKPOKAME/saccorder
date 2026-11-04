export type ThemeColor = "mint" | "bluet" | "abricot" | "lilas" | "ble";

export const THEME_COLORS: ThemeColor[] = ["mint", "bluet", "abricot", "lilas", "ble"];

export const THEME_COLOR_CLASSES: Record<
  ThemeColor,
  { solid: string; textOn: string; fill: string }
> = {
  mint: { solid: "bg-mint", textOn: "text-bg", fill: "bg-mint" },
  bluet: { solid: "bg-bluet", textOn: "text-bg", fill: "bg-bluet" },
  abricot: { solid: "bg-abricot", textOn: "text-bg", fill: "bg-abricot" },
  lilas: { solid: "bg-lilas", textOn: "text-bg", fill: "bg-lilas" },
  ble: { solid: "bg-ble", textOn: "text-bg", fill: "bg-ble" },
};

export const SECTION_ACCENTS: Record<string, ThemeColor> = {
  communication: "mint",
  "implication-organisation": "bluet",
  "decision-reunion": "abricot",
  feedback: "lilas",
  "agace-aide": "ble",
  "a-savoir": "mint",
};
