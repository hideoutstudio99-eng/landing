export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const portrait = { width: 825, height: 1100 };
const landscape = { width: 1100, height: 825 };

export const bedroom: Photo = {
  src: "/images/bedroom.jpg",
  ...portrait,
  alt: "The bedroom at Hideout Studios",
};

export type GalleryPhoto = Photo & { caption: string; tall: boolean };

const shot = (
  name: string,
  caption: string,
  orientation: typeof portrait | typeof landscape,
): GalleryPhoto => ({
  src: `/images/${name}.jpg`,
  ...orientation,
  caption,
  alt: `${caption} at Hideout Studios`,
  tall: orientation === portrait,
});

export const gallery: GalleryPhoto[] = [
  shot("living", "Living room", landscape),
  shot("kitchen", "Kitchenette", landscape),
  shot("bathroom", "Bathroom", portrait),
  shot("window", "The window corner", landscape),
  shot("entrance", "Welcome in", portrait),
  shot("artwall", "The art wall", portrait),
  shot("view", "The view", landscape),
  shot("street", "The street outside", landscape),
];
