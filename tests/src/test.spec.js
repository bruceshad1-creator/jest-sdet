const path = require('path');
const servers = require('../src/libs/servers');
const utils = require('../src/libs/utils');
const verifications = require('../src/libs/verifications');

const input = path.resolve('agent/inputs/large_1M_events.log');
const output = path.resolve('events.log');
const emptyFile = path.resolve('agent/inputs/empty_file.log');
const configDirs = [path.resolve('target'), path.resolve('splitter'), path.resolve('agent')];

beforeAll( async() => {
  servers.startServers(configDirs);
  await utils.wait();
  utils.deleteEventsLog();
  await utils.wait(500);
  utils.transferFile();
  await utils.wait(500);
});

afterAll(() => {
  servers.killProcesses();
});

test('Test 1: Verify splitter server being in process', () => {
  expect(servers.isSplitterServerInProcess()).toBe(true);
});

test('Test 2: Verify file transferred with output & input files having same size', () => {
  verifications.verifyFileTransfer(input, output, true);
});

test('Test 3: Verify output does not exist when input file is empty', async () => {
  utils.deleteEventsLog();
  verifications.verifyFileTransfer(emptyFile, output, false);
});
