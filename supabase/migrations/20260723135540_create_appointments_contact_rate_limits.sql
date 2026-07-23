/*
# Create appointments, contact_messages, and rate_limits tables

1. New Tables
- `appointments`: stores booking requests from the clinic website
  - id (uuid, primary key)
  - name (text, patient full name)
  - phone (text, contact phone number)
  - appointment_date (date, requested appointment date)
  - service (text, requested dental service)
  - message (text, optional notes from patient)
  - status (text, booking status: pending/confirmed/cancelled)
  - created_at (timestamp)
- `contact_messages`: stores contact form submissions
  - id (uuid, primary key)
  - name (text, visitor full name)
  - phone (text, contact phone number)
  - message (text, the message body)
  - created_at (timestamp)
- `rate_limits`: stores per-IP rate limit counters for form submission spam protection
  - id (uuid, primary key)
  - identifier (text, IP address or client identifier)
  - form_type (text, which form: 'appointment' or 'contact')
  - created_at (timestamp)
2. Security
- Enable RLS on all tables.
- Allow anon + authenticated INSERT and SELECT (single-tenant, no sign-in app).
- Service role (edge functions) bypasses RLS via service role key.
3. Important Notes
- The edge functions use the service role key (server-side only) to insert rows.
- rate_limits rows older than the window are cleaned up by the edge functions.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  appointment_date date NOT NULL,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_appointments" ON appointments;
CREATE POLICY "anon_select_appointments" ON appointments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_appointments" ON appointments;
CREATE POLICY "anon_update_appointments" ON appointments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_appointments" ON appointments;
CREATE POLICY "anon_delete_appointments" ON appointments FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_messages" ON contact_messages;
CREATE POLICY "anon_select_contact_messages" ON contact_messages FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  form_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_rate_limits" ON rate_limits;
CREATE POLICY "anon_insert_rate_limits" ON rate_limits FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_rate_limits" ON rate_limits;
CREATE POLICY "anon_select_rate_limits" ON rate_limits FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_delete_rate_limits" ON rate_limits;
CREATE POLICY "anon_delete_rate_limits" ON rate_limits FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_form ON rate_limits (identifier, form_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits (created_at);
