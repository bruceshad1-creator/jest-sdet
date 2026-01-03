# TCP File transfer – Test Automation
  # Node.js | Jest | GitHub Actions

# Owner: 
- Bruce Shad - Test Automation Engineering (SDET)

# Automated tests for a TCP server that receives data and writes it to a file.
  # Scope:
    - Ensure the TCP server is running or started by tests
    - TCP socket communication
    - File write verifications
    - Scheduled CI validation


# local installations: make sure Node is already installed on the machine
  Run the following terminal commands in bash::
    - npm install --save-dev jest (or npm install -g jest)
    - npx jest --init
    - npx jest --config
    - npx jest --version --> ex. 30.1.3


# Number of suites: 2
  # 1. test.spec.js
    'Test 1: Verify splitter server being in process'
    'Test 2: Verify file transferred with output & input files having same size'
    'Test 3: Verify output does not exist when input file is empty' 
  # 2. testWithAgentTargetOnly.spec.js
    'Test 1: Verify splitter server not being in process'
    'Test 2: No Splitter - Verify file transferred and files having same size'


# src → libs:: 
  # servers.js
    - Controlled interactions with server processes to start services, validate readiness, 
      and cleanly terminate them during automated tests.
  # utils.js
    - Designed and implemented reusable utility functions to support scalable 
      and maintainable test automation.
  # verifications.js
    - Reusable verification utilities for automated testing.


# Local Test Execution
    - clone / pull the latest from repo
    - run: npm install
    - run: npm test


# test.yml → PRs, push, scheduled Monday 09:00 UTC
    - CI/CD
    - Push/PR → run tests
    - Scheduled → every Monday 09:00 UTC (cron: 0 9 * * 1)