const ICON_SIZE = 20;

function InstagramIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14.5c2.5-1 5.5-1 8 0" />
      <path d="M7 11.5c3.5-1.5 7.5-1.5 11 0" />
      <path d="M6.5 8.5c4-1.5 8.5-1.5 12 0" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function AmazonMusicIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <ellipse cx="12" cy="5" rx="9" ry="3" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/marfabandofficial/",
    icon: <InstagramIcon />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@officialmarfaband",
    icon: <TikTokIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/marfabandofficial",
    icon: <FacebookIcon />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@officialmarfa",
    icon: <YouTubeIcon />,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/0qQCr8kpPnhZHnnHoVtErD",
    icon: <SpotifyIcon />,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/marfa/1764209879",
    icon: <AppleMusicIcon />,
  },
  {
    label: "Amazon Music",
    href: "https://music.amazon.com/artists/B0FHBWNFGM/marfa",
    icon: <AmazonMusicIcon />,
  },
];

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Do Not Sell My Personal Information", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 md:px-10"
      style={{ backgroundColor: "var(--color-black)", color: "var(--color-cream)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Social and streaming icons */}
        <div className="flex items-center gap-5 flex-wrap justify-center">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "var(--color-cream)" }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Legal line */}
        <p
          className="font-[family-name:var(--font-body)] text-xs text-center leading-relaxed"
          style={{ color: "var(--color-cream)", opacity: 0.7 }}
        >
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records.
        </p>

        {/* Footer links */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              {i > 0 && (
                <span
                  className="text-xs"
                  style={{ color: "var(--color-cream)", opacity: 0.3 }}
                >
                  |
                </span>
              )}
              <a
                href={link.href}
                className="font-[family-name:var(--font-body)] text-xs underline hover:opacity-60 transition-opacity"
                style={{ color: "var(--color-cream)", opacity: 0.7 }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
