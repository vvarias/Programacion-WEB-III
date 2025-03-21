const mysql = require('mysql2');

// Crear conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_conections'
});

// Conectar y encadenar las consultas
connection.connect(err => {
  if (err) {
    return console.error('Error de conexión: ' + err.message);
  }
  console.log('Conexión exitosa.');

  // 1. Obtener todos los usuarios
  connection.query('SELECT * FROM usuario', (err, usuarios, fields) => {
    if (err) {
      console.error('Error en la consulta SELECT: ' + err.message);
      connection.end();
      return;
    }
    console.log('Usuarios:', usuarios);

    // Iniciar medición de tiempo
    console.time('Tiempo de ejecucion');

    // 2. Insertar un nuevo usuario
    const nombre = 'Marta';
    const apellidos = 'Mamani';
    const correo = 'marta@example.com';
    const numero = '746384047';

    connection.query(
      'INSERT INTO usuario (nombre, apellidos, correo, numero) VALUES (?, ?, ?, ?)',
      [nombre, apellidos, correo, numero],
      (err, insertResult, fields) => {
        if (err) {
          console.error('Error en la inserción: ' + err.message);
          connection.end();
          return;
        }
        console.log('Nuevo usuario insertado con ID:', insertResult.insertId);

        // Finalizar medición de tiempo correctamente
        console.timeEnd('Tiempo de ejecucion');

        // 3. Consultar el usuario recién insertado
        connection.query(
          'SELECT * FROM usuario WHERE id = ?',
          [insertResult.insertId],
          (err, nuevoUsuario, fields) => {
            if (err) {
              console.error('Error en la consulta del nuevo usuario: ' + err.message);
            } else {
              console.log('Nuevo usuario:', nuevoUsuario);
            }
            connection.end(); // Cerrar la conexión al finalizar todas las consultas
          }
        );
      }
    );
  });
});