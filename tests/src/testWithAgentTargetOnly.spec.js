const path = require('path');
const servers = require('../src/libs/servers');
const utils = require('../src/libs/utils');
const verifications = require('../src/libs/verifications');

const input = path.resolve('agent/inputs/large_1M_events.log');
const output = path.resolve('events.log');
const emptyFile = path.resolve('agent/inputs/empty_file.log');
const configDirs = [path.resolve('target'), path.resolve('agent')];

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
    utils.deleteEventsLog();
});

test('Test 1: Verify splitter server not being in process', () => {
    expect(servers.isSplitterServerInProcess()).toBe(false);
});

test('Test 2: No Splitter - Verify file transferred and files having same size', () => {
    verifications.verifyFileTransfer(input, output, true);
});