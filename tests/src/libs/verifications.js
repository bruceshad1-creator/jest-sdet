module.exports = { verifyFileTransfer };
const fs = require('fs');

function verifyFileTransfer(input, output, isTransfer = true) {
    if (!isTransfer) {
        expect(fs.statSync(input).size).toBe(0);
        expect(fs.existsSync(output)).toBe(false);
    }
    else {
        const inputBuffer = fs.readFileSync(input);
        const outputBuffer = fs.readFileSync(output);
        expect(fs.statSync(output).length).toBe(fs.statSync(input).length);
        expect(outputBuffer.length).toBe(inputBuffer.length);
        // FixMe -> expect(outputBuffer.equals(inputBuffer)).toBe(true);
    }
}
