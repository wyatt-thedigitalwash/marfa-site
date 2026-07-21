type IconProps = { size?: number };

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export function SpotifyIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14.5c2.5-1 5.5-1 8 0" />
      <path d="M7 11.5c3.5-1.5 7.5-1.5 11 0" />
      <path d="M6.5 8.5c4-1.5 8.5-1.5 12 0" />
    </svg>
  );
}

export function AppleMusicIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// Social links shown in the top-right of the header, in order.
export const HEADER_SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/marfabandofficial/",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@officialmarfaband",
    Icon: TikTokIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/marfabandofficial",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@officialmarfa",
    Icon: YouTubeIcon,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/0qQCr8kpPnhZHnnHoVtErD",
    Icon: SpotifyIcon,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/marfa/1764209879",
    Icon: AppleMusicIcon,
  },
];
