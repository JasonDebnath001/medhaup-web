export type SuccessAspect = "tall" | "wide" | "square";

export type SuccessStory = {
  id: number | string;
  image: string;
  alt: string;
  aspect: SuccessAspect;
};

const MOCK_IMAGE_IDS = [
  47, 32, 45, 49, 44, 48, 25, 23, 16, 5, 9, 10, 20, 24, 26, 29, 36, 37, 38, 41,
  43, 46, 51, 52, 53, 54, 55, 56, 57,
] as const;

const PHOTO_ASPECTS: SuccessAspect[] = ["tall", "wide", "square"];

// Placeholder portraits for the frontend preview. Replace each image and alt
// value with the final, information-complete student artwork before launch.
export const SUCCESS_STORIES: SuccessStory[] = MOCK_IMAGE_IDS.map(
  (imageId, index) => ({
    id: index + 1,
    image: `https://i.pravatar.cc/900?img=${imageId}`,
    alt: `Student success photo placeholder ${String(index + 1).padStart(2, "0")}`,
    aspect: PHOTO_ASPECTS[index % PHOTO_ASPECTS.length],
  }),
);
