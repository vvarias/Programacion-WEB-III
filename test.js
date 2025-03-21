const { exec } = require('child_process');

function runTest(script, label) {
  console.time(label);
  exec(`node ${script}`, () => {
    console.timeEnd(label);
  });
}
console.log('Iniciando pruebas de conexión...\n');
runTest('basic-connection.js', 'Conexión Básica');
runTest('promise-connection.js', 'Conexión con Promesas');
runTest('pool-connection.js', 'Conexión con Pooling');