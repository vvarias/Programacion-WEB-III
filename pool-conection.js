const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_conections',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function main() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa.');

    // Obtener todos los usuarios
    const [usuarios] = await connection.execute('SELECT * FROM auxiliar');
    console.log('Auxiliares:', usuarios);

    // Insertar un nuevo usuario
    const [insertResult] = await connection.execute(
      'INSERT INTO auxiliar (nombre, apellidoPaterno, apellidoMaterno, correo) VALUES (?, ?, ?, ?)',
      ['Marcos','Muñoz','Chambi', 'marcos@example.com']
    );
    console.log('Nuevo usuario insertado con ID:', insertResult.insertId);

    // Obtener el usuario recién insertado
    const [nuevoUsuario] = await connection.execute(
      'SELECT * FROM auxiliar WHERE id = ?',
      [insertResult.insertId]
    );
    console.log('Nuevo auxiliar:', nuevoUsuario);

    // Liberar la conexión
    connection.release();
  } catch (err) {
    console.error('Error:', err.message);
  }

}
async function ejecutar() {
  console.time('Tiempo de ejecucion');
  console.log('//////////////////////////////CONEXION POR PROMESAS////////////////////////////////////////////');
  await main();
  console.timeEnd('Tiempo de ejecucion');
}

ejecutar();
