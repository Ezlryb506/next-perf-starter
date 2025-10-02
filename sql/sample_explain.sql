EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT id, name, created_at
FROM products
WHERE (created_at, id) < ('2025-01-01', 999999)
ORDER BY created_at DESC, id DESC
LIMIT 20;
