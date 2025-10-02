CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful index for our keyset pagination (filter and sort)
CREATE INDEX IF NOT EXISTS idx_products_created_id ON products (created_at DESC, id DESC);

-- Search index (ILIKE can still benefit from trigram in real apps; kept simple here)
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);
