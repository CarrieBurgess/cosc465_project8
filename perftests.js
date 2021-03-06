var userdb = require ('./userdb.js');
exports.ping = function(req) {
    // req is https://github.com/techpines/express.io/tree/master/lib#socketrequest
    console.log("Got ping socket.io callback");
    req.io.emit('pong', req.data);
};

exports.latency_test = function(req) {
    console.log(req.data.avgrtt);
    userdb.add_latency_result(req.session.id, req.data.avgrtt);
    console.log("latency results: " + userdb.get_latency_results(req.session.id));
};

exports.upload_ping = function(req){
    console.log("got upload_test socket.io callback");
    req.io.emit('upload_pong', req.data);
};

exports.upload_test = function(req) {
    userdb.add_upload_result(req.session.id, req.data.upload_avg);
};
