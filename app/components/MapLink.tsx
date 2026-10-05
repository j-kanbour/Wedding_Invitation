"use client";

import { useEffect, useState } from "react";

type Props = {
  query: string;
  children: React.ReactNode;
};

// Opens Apple Maps on Apple devices (iPadOS reports as Macintosh) and Google Maps everywhere else.
export default function MapLink({ query, children }: Props) {
  const q = encodeURIComponent(query);
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const appleUrl = `https://maps.apple.com/?q=${q}`;

  const [href, setHref] = useState(googleUrl);

  useEffect(() => {
    if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
      setHref(appleUrl);
    }
  }, [appleUrl]);

  return (
    <a
      className="meta-address"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
        />
      </svg>
      {children}
    </a>
  );
}
