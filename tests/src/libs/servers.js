module.exports = { startServers, isSplitterServerInProcess, killProcesses };
const { spawn } = require('child_process');
const utils = require('./utils');
const path = require('path');
const app = path.resolve('app.js');
let processes = [];
let servers = [];
let isSplitterServerTriggered = true;

async function startServers(configDirs) {
  let all = configDirs.length === 3 ? true : false;
  for (let i = 0; i < configDirs.length; i++) {
    let process = spawn('node', [app, configDirs[i]]);
    await utils.wait(3000);
    servers.push(path.basename(configDirs[i]));
    processes.push(process);
  }
  isSplitterServerTriggered = verifyServersInProcess(all);
}

function verifyServersInProcess(allServers = true) {
    if (allServers)
      expect(servers[1]).toBe('splitter');
    else {
      expect(servers[1]).toBe('agent');
      isSplitterServerTriggered = false;
    }
    return isSplitterServerTriggered;
}

function isSplitterServerInProcess() {
    return isSplitterServerTriggered;
}

function killProcesses() {
  processes.forEach(p => p.kill('SIGTERM'));
  processes = [];
}