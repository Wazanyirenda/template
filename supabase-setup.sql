-- ============================================================
-- CALM MOUNTAIN TRANSPORT — SUPABASE SETUP
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================


-- ── 1. EXTENSIONS ────────────────────────────────────────────
-- uuid-ossp is usually enabled by default on Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ── 2. NEWS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    category    TEXT NOT NULL DEFAULT 'Company News',
    excerpt     TEXT NOT NULL,
    content     TEXT,
    image_url   TEXT,
    published   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();


-- ── 3. CAREERS TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS careers (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title         TEXT NOT NULL,
    department    TEXT NOT NULL,
    location      TEXT NOT NULL DEFAULT 'Ndola, Zambia',
    type          TEXT NOT NULL DEFAULT 'Full-time',
    description   TEXT NOT NULL,
    requirements  JSONB NOT NULL DEFAULT '[]'::jsonb,
    opening_date  DATE,
    closing_date  DATE,
    active        BOOLEAN NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER careers_updated_at
    BEFORE UPDATE ON careers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();


-- ── 4. FLEET TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fleet (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category    TEXT NOT NULL,
    eyebrow     TEXT NOT NULL,
    description TEXT NOT NULL,
    capacity    TEXT NOT NULL,
    body_type   TEXT NOT NULL,
    routes      TEXT NOT NULL,
    accent      TEXT NOT NULL DEFAULT 'bg-primary',
    active      BOOLEAN NOT NULL DEFAULT true,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER fleet_updated_at
    BEFORE UPDATE ON fleet
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();


-- ── 5. PAGE VIEWS TABLE (Analytics) ──────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path   TEXT NOT NULL,
    page_title  TEXT NOT NULL,
    referrer    TEXT,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ── 6. ROW LEVEL SECURITY (RLS) ─────────────────────────────
-- Enable RLS on all tables
ALTER TABLE news       ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers    ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet      ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ — anyone can read published news, active careers, active fleet
CREATE POLICY "Public can read published news"
    ON news FOR SELECT
    USING (published = true);

CREATE POLICY "Public can read active careers"
    ON careers FOR SELECT
    USING (active = true);

CREATE POLICY "Public can read active fleet"
    ON fleet FOR SELECT
    USING (active = true);

-- ADMIN FULL ACCESS — anon key gets full CRUD
-- (For a production app you'd use authenticated roles + auth,
--  but since this CMS has no auth gate, anon gets full access)
CREATE POLICY "Anon full access news"
    ON news FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anon full access careers"
    ON careers FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anon full access fleet"
    ON fleet FOR ALL
    USING (true)
    WITH CHECK (true);

-- Anyone can insert page views (website visitors), but only admin can read
CREATE POLICY "Public can insert page views"
    ON page_views FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anon full access page views"
    ON page_views FOR ALL
    USING (true)
    WITH CHECK (true);


-- ── 7. STORAGE BUCKET (for news article images) ─────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read files from the media bucket
CREATE POLICY "Public read media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'media');

-- Allow anon to upload files to the media bucket
CREATE POLICY "Anon upload media"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'media');

-- Allow anon to update/delete their uploaded files
CREATE POLICY "Anon update media"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'media')
    WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anon delete media"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'media');


-- ── 8. INDEXES (for common queries) ─────────────────────────
CREATE INDEX IF NOT EXISTS idx_news_published    ON news (published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_active    ON careers (active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fleet_active      ON fleet (active, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_careers_dates     ON careers (opening_date, closing_date);
CREATE INDEX IF NOT EXISTS idx_page_views_dates  ON page_views (created_at DESC);


-- ── 9. SEED DATA (optional — remove if not needed) ──────────

-- Sample news articles
INSERT INTO news (title, category, excerpt, content, published) VALUES
(
    'New Corridor Route Launched: Zambia to Rwanda',
    'Operations',
    'Calm Mountain Transport has expanded its cross-border network with a direct Zambia–Rwanda corridor, reducing transit times for clients trading with East Africa.',
    'We are pleased to announce the launch of our direct Zambia to Rwanda corridor. This new route significantly reduces transit times and provides a more cost-effective option for businesses trading with the East African market. The route passes through Tanzania with coordinated border clearance at both Nakonde and Rusumo crossings.',
    true
),
(
    'Fleet Expansion: 5 New Heavy-Haulage Trucks',
    'Company News',
    'Our fleet grows to over 30 vehicles with the addition of five new 30-tonne interlink trucks, boosting capacity on high-demand corridors.',
    'Calm Mountain Transport has taken delivery of five new 30-tonne interlink trucks, bringing our total fleet to over 30 active vehicles. These units are immediately deployed on our busiest corridors — Zambia to Tanzania and Zambia to South Africa — to meet growing client demand.',
    true
),
(
    'Customs Clearance Processing Times Improved',
    'Infrastructure',
    'Our in-house clearing team has reduced average border clearance times to under 48 hours across all major entry points in our network.',
    'Through investment in staff training, electronic declaration systems, and closer coordination with border authorities, our customs clearing division has achieved average clearance times of under 48 hours. This improvement directly benefits clients by reducing cargo dwell times and improving overall delivery reliability.',
    true
);

-- Sample career listings
INSERT INTO careers (title, department, location, type, description, requirements, opening_date, closing_date, active) VALUES
(
    'Fleet Operations Manager',
    'Operations',
    'Ndola, Zambia',
    'Full-time',
    'Lead day-to-day fleet planning, dispatch coordination, and route performance across our cross-border transport network.',
    '["5+ years in fleet or transport operations", "Experience with cross-border logistics", "Strong leadership and team management skills", "Familiarity with RTSA regulations"]'::jsonb,
    '2026-02-01',
    '2026-04-30',
    true
),
(
    'Customs Clearing Agent',
    'Customs & Compliance',
    'Ndola, Zambia',
    'Full-time',
    'Handle import and export customs documentation at major border crossings, ensuring compliant and efficient clearance for all client cargo.',
    '["ZICA or equivalent customs certification", "3+ years in customs clearing", "Knowledge of ASYCUDA and ZRA procedures", "Experience with multiple corridor clearances"]'::jsonb,
    '2026-02-15',
    '2026-04-15',
    true
),
(
    'Transport Coordinator',
    'Dispatch',
    'Ndola, Zambia',
    'Full-time',
    'Coordinate pickups, cross-border schedules, driver communication, and delivery confirmations to ensure on-time performance.',
    '["2+ years in transport or logistics coordination", "Strong communication skills", "Experience handling route changes and delays", "Ability to manage multiple corridors simultaneously"]'::jsonb,
    '2026-02-20',
    '2026-05-20',
    true
),
(
    'Account Executive',
    'Sales',
    'Ndola, Zambia',
    'Full-time',
    'Develop new client relationships, prepare transport proposals, and grow cargo volumes across our Southern and Eastern Africa network.',
    '["2+ years in B2B logistics or transport sales", "Strong negotiation and proposal writing skills", "Existing network in trade, mining, or agriculture preferred", "Ability to manage and grow key accounts"]'::jsonb,
    '2026-03-01',
    '2026-05-31',
    true
);

-- Sample fleet entries
INSERT INTO fleet (category, eyebrow, description, capacity, body_type, routes, accent, sort_order, active) VALUES
(
    'Heavy Haulage',
    '30-Tonne Class',
    'Our primary long-haul cross-border fleet. Fully containerized, fitted with satellite tracking, and operated by experienced drivers.',
    'Up to 30,000 kg',
    'Interlink / Side-tipper',
    'All cross-border corridors',
    'bg-primary',
    1,
    true
),
(
    'Medium Haulage',
    '10–15 Tonne Class',
    'A versatile class suited to consolidated cargo and mixed loads. Handles routes where larger trucks face access restrictions.',
    'Up to 15,000 kg',
    'Rigid flatbed / Curtainsider',
    'Regional and inland routes',
    'bg-secondary',
    2,
    true
),
(
    'Light Commercial',
    '3.5–7 Tonne Class',
    'Used for urgent, smaller consignments and last-mile delivery within Zambia.',
    'Up to 7,000 kg',
    'Dropside / Van body',
    'Inland / Last-mile',
    'bg-primary',
    3,
    true
),
(
    'Refrigerated Transport',
    'Cold Chain',
    'Temperature-controlled units for fresh and frozen food requiring unbroken cold chain integrity.',
    'Up to 15,000 kg',
    'Reefer / Refrigerated van',
    'Domestic & cross-border',
    'bg-secondary',
    4,
    true
);


-- ── DONE ─────────────────────────────────────────────────────
-- Your Supabase project is now ready for the CMS dashboard.
--
-- Don't forget to set your .env file:
--   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
--   VITE_SUPABASE_ANON_KEY=your-anon-key-here
-- ─────────────────────────────────────────────────────────────
