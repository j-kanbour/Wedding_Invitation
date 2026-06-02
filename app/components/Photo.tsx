import Image from "next/image";

type Aspect = "wide" | "tall";

interface PhotoProps {
  src: string;
  alt: string;
  aspect: Aspect;
  position?: string;
}

export default function Photo({ src, alt, aspect, position = "50%" }: PhotoProps) {
  return (
    <figure className={`photo photo-${aspect}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: `center ${position}` }}
        priority={false}
      />
    </figure>
  );
}
