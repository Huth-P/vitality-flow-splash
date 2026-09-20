export const CHANGE_CATEGORY_OPTIONS = {
  Supplements: ["Omega 3", "Vitamin D", "Magnesium", "Creatine", "Zinc", "Iron", "Other"],
  "Physical activity": ["Strength training", "Walking", "Running", "Yoga", "Pilates", "Cycling", "Swimming", "Other"],
  "Sleep routine": [
    "Going to bed at a consistent time",
    "Reducing screen time before bed",
    "Avoiding caffeine later in the day",
    "Creating a wind-down routine",
    "Adjusting the bedroom environment",
    "Getting more morning daylight",
    "Other",
  ],
  "Dietary changes": [
    "Eating more protein",
    "Eating more fibre",
    "Reducing caffeine",
    "Reducing alcohol",
    "Eating at more consistent times",
    "Reducing ultra-processed foods",
    "Other",
  ],
} as const;

export type IntermediateCategory = keyof typeof CHANGE_CATEGORY_OPTIONS;

export const CHANGE_CATEGORY_ROUTES: Record<IntermediateCategory, string> = {
  Supplements: "/change-details/supplements",
  "Physical activity": "/change-details/physical-activity",
  "Sleep routine": "/change-details/sleep-routine",
  "Dietary changes": "/change-details/dietary-changes",
};

export const CHANGE_CATEGORY_NOUNS: Record<IntermediateCategory, string> = {
  Supplements: "supplement",
  "Physical activity": "activity",
  "Sleep routine": "routine",
  "Dietary changes": "change",
};
