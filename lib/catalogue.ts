export type Option = string;

export type Question = {
  id: string;
  label: string;
  options: [Option, Option, Option];
};

export type Section = {
  id: string;
  title: string;
  questions: Question[];
};

export const CATALOGUE: Section[] = [
  {
    id: "communication",
    title: "Communication",
    questions: [
      {
        id: "communication-mode",
        label: "Je préfère communiquer",
        options: [
          "Principalement à l'écrit",
          "Principalement à l'oral",
          "En combinant les deux selon le contexte",
        ],
      },
      {
        id: "communication-info",
        label: "Je préfère recevoir l'info",
        options: [
          "Sous forme courte et synthétique",
          "Avec le contexte et les détails",
          "Un résumé, puis des précisions si besoin",
        ],
      },
    ],
  },
  {
    id: "implication-organisation",
    title: "Implication & organisation",
    questions: [
      {
        id: "implication",
        label: "Je préfère être impliqué",
        options: [
          "Dès le début de la réflexion",
          "Pendant la construction",
          "Une fois le besoin clarifié",
        ],
      },
      {
        id: "organisation",
        label: "Je m'organise plutôt",
        options: [
          "En planifiant en amont",
          "En m'adaptant aux priorités",
          "Entre les deux",
        ],
      },
    ],
  },
  {
    id: "decision-reunion",
    title: "Décision & réunion",
    questions: [
      {
        id: "decision",
        label: "Pour décider, je préfère",
        options: [
          "Réfléchir seul avant d'échanger",
          "Construire la décision à plusieurs",
          "Alterner selon le sujet",
        ],
      },
      {
        id: "reunion",
        label: "En réunion, je préfère",
        options: [
          "Préparer les sujets à l'avance",
          "Réagir au fil des échanges",
          "Adapter selon le contexte",
        ],
      },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    questions: [
      {
        id: "feedback-moment",
        label: "Je préfère un feedback",
        options: [
          "Au fil de l'eau",
          "Lors d'un échange dédié",
          "À un moment convenu ensemble",
        ],
      },
      {
        id: "feedback-forme",
        label: "Je préfère qu'il soit",
        options: [
          "Direct et factuel",
          "Argumenté avec des exemples",
          "Équilibré (points forts / axes)",
        ],
      },
    ],
  },
  {
    id: "agace-aide",
    title: "Ce qui m'agace / m'aide",
    questions: [
      {
        id: "agace",
        label: "Ce qui m'agace",
        options: [
          "Les changements de priorité sans explication",
          "Le manque de visibilité",
          "Les sujets sans décision",
        ],
      },
      {
        id: "gain-de-temps",
        label: "Ce qui me fait gagner du temps",
        options: [
          "Des objectifs clairs",
          "Une bonne anticipation",
          "Des échanges avec next steps",
        ],
      },
    ],
  },
  {
    id: "a-savoir",
    title: "À savoir sur moi",
    questions: [
      {
        id: "facilite",
        label: "Une chose qui facilite le travail avec moi",
        options: [
          "Me donner le contexte avant de solliciter mon avis",
          "Clarifier les priorités et attentes",
          "Faire un point régulier sur l'avancement",
        ],
      },
      {
        id: "a-eviter",
        label: "Une chose à éviter avec moi",
        options: [
          "Les demandes de dernière minute évitables",
          "Les consignes imprécises",
          "Les sujets importants non explicités",
        ],
      },
    ],
  },
];
