/**
 * About + current focus content. Edit here — never inside components.
 * [ADD ...] values are honest placeholders awaiting real content.
 */

export const about = {
  eyebrow: "About",
  title: "A little about me",
  lead: "I'm a Computer Engineering student who likes turning real problems into working software.",
  paragraphs: [
    "My background is Computer Engineering, and most of my time goes into two things: understanding data and building software people can actually use. That means writing Python for analysis and models, and building modern web interfaces on top of them.",
    "I'm most interested in the overlap between AI, Data Science, Machine Learning and software engineering — where a model is only useful once it ships inside a clear, fast, well-engineered product.",
    "Right now I'm focused on strengthening fundamentals while building projects end to end: problem framing, data, implementation, interface and iteration.",
  ],
  facts: [
    { label: "Field", value: "Computer Engineering" },
    { label: "Focus", value: "AI · Data · Software" },
    { label: "Education", value: "[ADD DEGREE / INSTITUTION]" },
    { label: "Location", value: "[ADD LOCATION]" },
    { label: "Availability", value: "[ADD AVAILABILITY]" },
  ],
} as const;

export type FocusGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

/** Editable placeholders — replace with your verified current focus. */
export const currentFocus: FocusGroup[] = [
  {
    id: "learning",
    title: "Currently learning",
    description: "Fundamentals I'm actively deepening.",
    items: ["Data Science", "Machine Learning", "DSA", "System Design"],
  },
  {
    id: "building",
    title: "Currently building",
    description: "The kind of work I'm shipping.",
    items: ["AI-powered applications", "Data-driven projects", "Modern web applications"],
  },
  {
    id: "exploring",
    title: "Currently exploring",
    description: "Areas I'm reading about and experimenting with.",
    items: ["Generative AI", "LLMs", "Data Engineering", "Cloud"],
  },
];
