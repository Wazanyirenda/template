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
const BASE_URL = 'https://www.calmmountaintransport.com';
const DEFAULT_DESCRIPTION =
    'Calm Mountain Transport Limited provides reliable road freight, haulage, distribution, cross-border transportation, and logistics services across Zambia and the SADC region.';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;
const DEFAULT_KEYWORDS =
    'road freight Zambia, transport company Zambia, logistics company Zambia, haulage Zambia, cross-border transport SADC, cargo transport Ndola, freight transport Copperbelt, bulk cargo transport, general cargo transport';

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
        : `${SITE_NAME} | On Time Every Time`;

    useEffect(() => {
        document.title = fullTitle;

        const setMeta = (selector: string, content: string) => {
            let el = document.querySelector<HTMLMetaElement>(selector);
            if (!el) {
                el = document.createElement('meta');
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

        setMeta('[name="description"]', description);
        setMeta('[name="keywords"]', keywords);
        setMeta('[name="robots"]', 'index, follow');
        setMeta('[name="author"]', SITE_NAME);
        setMeta('[name="theme-color"]', '#f2e70a');

        setMeta('[property="og:type"]', ogType);
        setMeta('[property="og:site_name"]', SITE_NAME);
        setMeta('[property="og:title"]', fullTitle);
        setMeta('[property="og:description"]', description);
        setMeta('[property="og:image"]', ogImage);
        setMeta('[property="og:image:width"]', '1200');
        setMeta('[property="og:image:height"]', '630');
        if (canonical) setMeta('[property="og:url"]', `${BASE_URL}${canonical}`);

        setMeta('[name="twitter:card"]', 'summary_large_image');
        setMeta('[name="twitter:title"]', fullTitle);
        setMeta('[name="twitter:description"]', description);
        setMeta('[name="twitter:image"]', ogImage);

        if (canonical) setLink('canonical', `${BASE_URL}${canonical}`);

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

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calm Mountain Transport Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 7 Chinika Road, Northrise',
        addressLocality: 'Ndola',
        addressRegion: 'Copperbelt',
        addressCountry: 'ZM',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+260761370582',
        email: 'info@calmmountaintransport.com',
        areaServed: ['ZM', 'ZW', 'TZ', 'BW', 'MW', 'ZA', 'MZ', 'AO', 'NA'],
    },
    sameAs: [],
};

export const freightServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Road Freight and Logistics Services',
    provider: {
        '@type': 'Organization',
        name: 'Calm Mountain Transport Limited',
    },
    serviceType: 'Freight Transport',
    areaServed: [
        { '@type': 'Country', name: 'Zambia' },
        { '@type': 'Country', name: 'Zimbabwe' },
        { '@type': 'Country', name: 'Tanzania' },
        { '@type': 'Country', name: 'Botswana' },
        { '@type': 'Country', name: 'Malawi' },
        { '@type': 'Country', name: 'South Africa' },
        { '@type': 'Country', name: 'Mozambique' },
        { '@type': 'Country', name: 'Angola' },
        { '@type': 'Country', name: 'Namibia' },
    ],
    description: DEFAULT_DESCRIPTION,
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Transport Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Long Distance Haulage' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local Distribution' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contract Transport Services' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cross-Border Transportation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bulk and General Cargo Transport' } },
        ],
    },
};

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Calm Mountain Transport Limited',
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    telephone: '+260761370582',
    email: 'info@calmmountaintransport.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 7 Chinika Road, Northrise',
        addressLocality: 'Ndola',
        addressRegion: 'Copperbelt',
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
