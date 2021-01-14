const Database = require('../Database');

class Purchase extends Database {
  constructor({ id, customer_name, customer_email, artist_name, song_name, cover_url, stripe_id, size, frame, qr_code }) {
    super();
    this.tableName = 'purchase';
    this.columnData = {
      id,
      customer_name,
      customer_email,
      artist_name,
      song_name,
      cover_url,
      stripe_id,
      size,
      frame,
      qr_code,
      created_at: new Date()
    };
  }
}

module.exports = Purchase;