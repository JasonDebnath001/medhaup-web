/* Medical "plus" texture used only on NORCET surfaces so the course
   reads differently from the grid/dot textures used elsewhere. */
export function plusPattern(hex: string) {
  const stroke = encodeURIComponent(hex);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M14 9v10M9 14h10' stroke='${stroke}' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`;
}

export const PLUS_ON_DARK = plusPattern("#ffffff");
export const PLUS_ON_LIGHT = plusPattern("#1a0c70");
