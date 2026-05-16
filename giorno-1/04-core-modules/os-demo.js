// =====================================================
// os — Informazioni sul sistema operativo
// =====================================================
// Esegui con: node os-demo.js

import os from 'os';

console.log('Piattaforma:', os.platform());     // 'darwin', 'win32', 'linux'
console.log('Architettura:', os.arch());        // 'x64', 'arm64', ...
console.log('CPU:', os.cpus().length, 'core');
console.log('RAM totale:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('RAM libera:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Utente:', os.userInfo().username);
console.log('Cartella home:', os.homedir());
console.log('Hostname:', os.hostname());
console.log('Uptime sistema:', (os.uptime() / 3600).toFixed(1), 'ore');
