const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    const loadFile = 'load-events.js';
    const readEvents = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readEvents(path.join(dir, file));
            } else if (file !== loadFile) {
                const event = require(path.join(__dirname, dir, file));
                console.log(`Listening for event: ${file}`)
                event(client);
            }
        }
    }

    readEvents('.');
}