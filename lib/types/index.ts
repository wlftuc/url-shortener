type ShortenedURL = {
  slug: string;
  origin: "web" | "bot";
  error?: boolean;
  isExisting?: boolean;
  link?: string;
  errResp?: string;
};

type LinkMeta = {
  object: LinkMeta;
  link: string;
  password: string;
};

type LocalLinkHistory = {
  link: string;
  password: string;
  slug: string;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export type {ShortenedURL, LinkMeta, ButtonProps, LocalLinkHistory};
