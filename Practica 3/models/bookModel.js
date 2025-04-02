const db = require('../config/db'); 

module.exports = {
  getAll: (callback) => { 
    db.query('SELECT * FROM libros', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  create: (titulo, autor, genero, anio_publicacion, callback) => {
    const sql = `
      INSERT INTO libros (titulo, autor, genero, anio_publicacion) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [titulo, autor, genero, anio_publicacion], (err, result) => { 
      if (err) return callback(err);
      callback(null, result);
    });
  },

  update: (id, titulo, autor, genero, anio_publicacion, callback) => {
    const sql = `
      UPDATE libros 
      SET titulo = ?, autor = ?, genero = ?, anio_publicacion = ?
      WHERE id = ?
    `;
    db.query(sql, [titulo, autor, genero, anio_publicacion, id], (err, result) => { 
      if (err) return callback(err);
      callback(null, result);
    });
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM libros WHERE id = ?'; 
    db.query(sql, [id], (err, result) => { 
      if (err) return callback(err);
      callback(null, result);
    });
  }
};