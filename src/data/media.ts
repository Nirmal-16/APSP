// A swappable visual slot — a built-in 3D model, an image, or a video.
// Pages take one of these from data and render it with
// components/media/media-slot.tsx, so changing what a slot shows is a data
// edit, not a code change. Image/video files go in /public, e.g.
// { type: "video", src: "/media/lab-tour.mp4", poster: "/media/lab-tour.jpg" }.

export type ModelKey = "plasma-orb" | "thruster" | "satellite" | "electrospray";

export type Media = { caption?: string } & (
  | { type: "model"; model: ModelKey }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string }
);
