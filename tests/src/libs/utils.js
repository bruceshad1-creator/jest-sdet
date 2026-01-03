module.exports = { transferFile, deleteEventsLog, wait };
const fs = require('fs');
const net = require('net');
const path = require('path');
const HOST = 'localhost';
const PORT = 9997;
const input = path.resolve('agent/inputs/large_1M_events.log');
const output = path.resolve('events.log');

function transferFile() {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(
      { host: HOST, port: PORT },
      () => {
        fs.createReadStream(input).pipe(socket);
      }
    );

    socket.on('close', resolve);
    socket.on('error', reject);
  });
}

function deleteEventsLog() {
  if (fs.existsSync(output)) {
    fs.unlinkSync(output);
  }
}

async function wait(ms = 5000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}