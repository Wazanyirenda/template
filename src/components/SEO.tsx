import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    structuredData?: object;
}

const SITE_NAME = 'Calm Mountain Transport Limited';
const BASE_URL = 'https://calmmt.co.zm';
const DEFAULT_DESCRIPTION =
    'Calm Mountain Transport Limited — Cross-border cargo transport, customs clearance, and freight forwarding across Zambia, Tanzania, Malawi, Kenya, Uganda, Rwanda, and South Africa. Based in Ndola, Zambia.';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/og-default.jpg`;
const DEFAULT_KEYWORDS =
    'cargo transport Zambia, cross-border logistics Africa, customs clearance Zambia, freight forwarding Ndola, truck transport Southern Africa, logistics company Zambia, cargo transport Tanzania, Malawi freight, Uganda cargo, Rwanda logistics, South Africa transport corridor';

export const SEO = ({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    canonical,
    ogImage = DEFAULT_IMAGE,
    ogType = 'website',
    structuredData,
}: SEOProps) => {
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} | Cross-Border Cargo Transport in Southern & Eastern Africa`;

    useEffect(() => {
        // Title
        document.title = fullTitle;

        // Helper to set or create a meta tag
        const setMeta = (selector: string, content: string) => {
            let el = document.querySelector<HTMLMetaElement>(selector);
            if (!el) {
                el = document.createElement('meta');
                // Parse attribute from selector, e.g. name="description"
                const nameMatch = selector.match(/\[name="(.+?)"\]/);
                const propMatch = selector.match(/\[property="(.+?)"\]/);
                if (nameMatch) el.setAttribute('name', nameMatch[1]);
                if (propMatch) el.setAttribute('property', propMatch[1]);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const setLink = (rel: string, href: string) => {
            let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        // Core meta
        setMeta('[name="description"]', description);
        setMeta('[name="keywords"]', keywords);
        setMeta('[name="robots"]', 'index, follow');
        setMeta('[name="author"]', SITE_NAME);
        setMeta('[name="theme-color"]', '#f2e70a');

        // Open Graph
        setMeta('[property="og:type"]', ogType);
        setMeta('[property="og:site_name"]', SITE_NAME);
        setMeta('[property="og:title"]', fullTitle);
        setMeta('[property="og:description"]', description);
        setMeta('[property="og:image"]', ogImage);
        setMeta('[property="og:image:width"]', '1200');
        setMeta('[property="og:image:height"]', '630');
        if (canonical) setMeta('[property="og:url"]', `${BASE_URL}${canonical}`);

        // Twitter / X card
        setMeta('[name="twitter:card"]', 'summary_large_image');
        setMeta('[name="twitter:title"]', fullTitle);
        setMeta('[name="twitter:description"]', description);
        setMeta('[name="twitter:image"]', ogImage);

        // Canonical link
        if (canonical) setLink('canonical', `${BASE_URL}${canonical}`);

        // JSON-LD structured data
        const existingScript = document.getElementById('structured-data');
        if (existingScript) existingScript.remove();

        if (structuredData) {
            const script = document.createElement('script');
            script.id = 'structured-data';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }
    }, [fullTitle, description, keywords, canonical, ogImage, ogType, structuredData]);

    return null;
};

// ── Pre-built structured data helpers ──────────────────────────

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calm Mountain Transport Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ndola',
        addressRegion: 'Copperbelt Province',
        addressCountry: 'ZM',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@calmmt.co.zm',
        areaServed: ['ZM', 'TZ', 'MW', 'KE', 'UG', 'RW', 'ZA'],
    },
    sameAs: [],
};

export const freightServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cross-Border Cargo Transport',
    provider: {
        '@type': 'Organization',
        name: 'Calm Mountain Transport Limited',
    },
    serviceType: 'Freight Transport',
    areaServed: [
        { '@type': 'Country', name: 'Zambia' },
        { '@type': 'Country', name: 'Tanzania' },
        { '@type': 'Country', name: 'Malawi' },
        { '@type': 'Country', name: 'Kenya' },
        { '@type': 'Country', name: 'Uganda' },
        { '@type': 'Country', name: 'Rwanda' },
        { '@type': 'Country', name: 'South Africa' },
    ],
    description:
        'Full-service cross-border cargo transport, customs clearance, and freight forwarding solutions across Southern and Eastern Africa.',
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Transport Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cross-Border Road Haulage' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customs Clearance' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Freight Forwarding' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Refrigerated Transport' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warehousing & Storage' } },
        ],
    },
};

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Calm Mountain Transport Limited',
    image: `${BASE_URL}/assets/images/og-default.jpg`,
    url: BASE_URL,
    telephone: '+260-000-000000',
    email: 'info@calmmt.co.zm',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ndola',
        addressLocality: 'Ndola',
        addressRegion: 'Copperbelt Province',
        addressCountry: 'ZM',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -12.9587,
        longitude: 28.5568,
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
        },
    ],
    priceRange: '$$',
};
