export const INPUT_VARIANT = {
  STANDARD: "standard",
  OUTLINED: "outlined",
  STATIC: "static",
} as const;

export type InputVariant = (typeof INPUT_VARIANT)[keyof typeof INPUT_VARIANT];

export const TYPOGRAPHY_VARIANT = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  LEAD: "lead",
  PARAGRAPH: "paragraph",
  SMALL: "small",
} as const;

export type TypographyVariant =
  (typeof TYPOGRAPHY_VARIANT)[keyof typeof TYPOGRAPHY_VARIANT];

export const BUTTON_VARIANT = {
  FILLED: "filled",
  OUTLINED: "outlined",
  GRADIENT: "gradient",
  TEXT: "text",
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];