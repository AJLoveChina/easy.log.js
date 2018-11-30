const LOG = require('./index');


let log1 = LOG("log1");
log1("log");


let log2 = LOG("log2");
log2.toggleStack(false);
log2.toggleLog(true);

log2.log("log");
log2.log("warn");

