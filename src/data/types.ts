export type NavigationItem = Readonly<{
  href: `#${string}` | `/${string}`;
  label: string;
}>;

export type ContactChannel = 'call' | 'whatsapp' | 'email';

export type ContactChannelOption = Readonly<{
  value: ContactChannel;
  label: string;
  detail: string;
  inputMode: 'tel' | 'email';
}>;

export type Service = Readonly<{
  code: string;
  title: string;
  problem: string;
  intervention: string;
  outcome: string;
}>;

export type Capability = Readonly<{
  area: string;
  detail: string;
}>;

export type ProfessionalProfile = Readonly<{
  brand: string;
  descriptor: string;
  email: string;
  location: string;
  responsePromise: string;
  valueProposition: string;
  summary: string;
}>;

export type SeoMetadata = Readonly<{
  title: string;
  description: string;
  canonicalPath: `/${string}` | '/';
  noindex?: boolean;
  imagePath?: `/${string}`;
}>;

export type ContactSubmission = Readonly<{
  name: string;
  preferredChannel: ContactChannel;
  phone?: string;
  email?: string;
  privacyVersion: string;
  consent: true;
  website: string;
}>;
