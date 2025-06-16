const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log("✅ DB Connected:", result.rows[0]);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    process.exit();
  }
})();

