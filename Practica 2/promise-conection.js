const mysql = require('mysql2/promise'); // Se usa el soporte de promesas

async function main() {
  try {
    // 1. Crear conexión
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'db_conections'
    });
    console.log('Conexión exitosa.');

    // 2. Obtener todos los usuarios
    const [usuarios] = await connection.execute('SELECT * FROM docente');
    console.log('Todos los docentes:', usuarios);

    // 3. Insertar un nuevo usuario
    const nombre = 'Roberto';
    const apellidoPaterno = 'Miranda';
    const apellidoMaterno = 'Martinez';
    const correo = 'roberto@example.com';
    const [insertResult] = await connection.execute(
      'INSERT INTO docente (nombre, apellidoPaterno, apellidoMaterno, correo) VALUES (?, ?, ?, ?)',
      [nombre, apellidoPaterno, apellidoMaterno, correo]
    );
    console.log('Nuevo docente insertado con ID:', insertResult.insertId);

    // 4. Consultar el usuario recién insertado
    const [nuevoUsuario] = await connection.execute(
      'SELECT * FROM docente WHERE id = ?',
      [insertResult.insertId]
    );
    console.log('Docente recién insertado:', nuevoUsuario);

    // Cerrar la conexión
    await connection.end();
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
