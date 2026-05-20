const SITE_URL = 'https://viktoria-zahidtrade.com';

export const SITE_NAME = 'Вікторія Захід Трейд';

export const DEFAULT_DESCRIPTION =
  'Засоби захисту рослин, добрива та агрохімія в Україні. Гербіциди, фунгіциди, інсектициди. Доставка, консультація агронома. Тел. 067 471 14 34.';

export const DEFAULT_OG_IMAGE = '/icons/icon-512x512.png';

export const getSiteUrl = () =>
  (process.env.GATSBY_SITE_URL || SITE_URL).replace(/\/$/, '');

export const toAbsoluteUrl = (path, siteUrl = getSiteUrl()) => {
  if (!path) return `${siteUrl}${DEFAULT_OG_IMAGE}`;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
};

export const buildCanonical = (pathname, siteUrl = getSiteUrl()) => {
  const path = pathname?.startsWith('/') ? pathname : `/${pathname || ''}`;
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return `${siteUrl}${withSlash === '//' ? '/' : withSlash}`;
};

export const buildProductTitle = (name, chemistry) => {
  const category = chemistry ? ` — ${chemistry}` : ' — ЗЗР';
  return `${name}${category} | ${SITE_NAME}`;
};

export const buildProductDescription = ({
  name,
  chemistry,
  activeSubstance,
  cultures = [],
  priceUah,
  fallback,
}) => {
  const parts = [];
  if (chemistry) parts.push(chemistry);
  if (activeSubstance) parts.push(`діюча речовина ${activeSubstance}`);
  if (cultures.length) parts.push(`для ${cultures.slice(0, 3).join(', ')}`);
  if (priceUah) parts.push(`від ${priceUah} грн`);
  parts.push(`купити ${name} в Україні — ${SITE_NAME}`);

  const text = parts.join('. ');
  if (!text.trim()) {
    return fallback?.slice(0, 160) || `Купити ${name} в Україні — ${SITE_NAME}`;
  }
  if (text.length <= 160) return text;
  return `${text.slice(0, 157)}…`;
};

export const availabilitySchema = (isAvailable) =>
  isAvailable
    ? 'https://schema.org/InStock'
    : 'https://schema.org/PreOrder';
