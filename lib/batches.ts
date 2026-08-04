export type Batch = {
  name: string;
  startDate: string;
  mode: "Online" | "Offline" | "Hybrid";
  timing: string;
  seatsFilled: number;
  seatsTotal: number;
};

export const BATCHES: Batch[] = [
  {
    name: "Voume 1.0 Batch",
    startDate: "15 August 2026",
    mode: "Online",
    timing: "Mon–Sat",
    seatsFilled: 18,
    seatsTotal: 30,
  },
];

export const CURRENT_BATCH = BATCHES[0];
