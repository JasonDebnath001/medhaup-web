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
    seatsFilled: 45,
    seatsTotal: 100,
  },
];

export const CURRENT_BATCH = BATCHES[0];

// Keep local seat updates tied to this batch when newer batches are published.
export const CURRENT_BATCH_ID = "43a69ab8-97a7-4451-a498-0fead3580736";
