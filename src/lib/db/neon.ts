import { neon } from '@neondatabase/serverless';

// Lazy initialization to prevent build-time errors
let _sql: ReturnType<typeof neon> | null = null;

const getSql = () => {
  if (!_sql) {
    if (!process.env.NEON_DATABASE_URL) {
      throw new Error('NEON_DATABASE_URL is not set');
    }
    _sql = neon(process.env.NEON_DATABASE_URL);
  }
  return _sql;
};

// Example: Get all items
export async function getItems() {
  const sql = getSql();
  return sql`SELECT * FROM items ORDER BY created_at DESC`;
}

// Example: Create item
export async function createItem(name: string, description: string) {
  const sql = getSql();
  return sql`INSERT INTO items (name, description) VALUES (${name}, ${description}) RETURNING *`;
}

// Example: Update item
export async function updateItem(id: number, name: string, description: string) {
  const sql = getSql();
  return sql`UPDATE items SET name = ${name}, description = ${description} WHERE id = ${id} RETURNING *`;
}

// Example: Delete item
export async function deleteItem(id: number) {
  const sql = getSql();
  return sql`DELETE FROM items WHERE id = ${id} RETURNING *`;
}
