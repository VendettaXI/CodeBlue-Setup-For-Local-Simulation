// Unified Color System Based on Gunmetal Navy RGBA(15,33,58,0.9)

export const colors = {
  // PRIMARY
  primary: "rgba(15,33,58,0.90)",   // signature gunmetal navy
  primarySolid: "#0F213A",

  // PRIMARY transparency variants
  primary75: "rgba(15,33,58,0.75)",
  primary50: "rgba(15,33,58,0.50)",
  primary25: "rgba(15,33,58,0.25)",
  primary15: "rgba(15,33,58,0.15)",

  // TEXT
  textPrimary: "rgba(15,25,33,0.95)",
  textSecondary: "#71778A",
  textMeta: "rgba(15,25,33,0.45)",

  // SURFACES
  background: "#FCF9F9",
  card: "#FFFFFF",
  surface: "#F2F4F7",

  // ACCENTS
  accentBlue: "#049BCD",
  accentRose: "#D87AB4",

  // STROKES
  borderLight: "rgba(15,25,33,0.15)",
  borderMedium: "rgba(15,25,33,0.28)",
};

export const radius = {
  card: "24px",
  button: "14px",
  input: "14px",
  avatar: "50%",
};

export const shadows = {
  card: "0 18px 40px rgba(15,25,33,0.12)",
  hover: "0 8px 24px rgba(15,25,33,0.18)",
  inset: "inset 0 0 0 1px rgba(15,25,33,0.08)",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
};

export const typography = {
  display: { size: "28px", lineHeight: "34px", weight: 700 },
  title:   { size: "20px", lineHeight: "28px", weight: 600 },
  body:    { size: "16px", lineHeight: "24px", weight: 500 },
  meta:    { size: "13px", lineHeight: "18px", weight: 500 },
  caption: { size: "12px", lineHeight: "16px", weight: 500 },
};
