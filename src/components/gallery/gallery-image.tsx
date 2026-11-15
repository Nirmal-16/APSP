import Image from "next/image";

// Shows the whole photo whatever its shape: the photo is contained, and a
// blurred, zoomed copy of itself fills the leftover space instead of bars.
// The parent sets the frame's size and must be `relative`.
export function GalleryImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes={sizes} className="scale-125 object-cover opacity-60 blur-2xl" />
      <Image src={src} alt={alt} fill sizes={sizes} className={`object-contain ${className}`} />
    </>
  );
}
