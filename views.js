var userdb = require ('./userdb.js');
exports.index = function (req, res) {
    var username = userdb.get_user_name(req.session.id);
    res.render('index', {title: "Speed tests", message: "Hello, world", user: username});
};

exports.tests = function(req, res){
    var username = userdb.get_user_name(req.session.id);
    res.render('tests', {title: "Speed tests", message: "testing 1,2,3", user: username});
};

/*
exports.results = function(req, res) {
    var username = userdb.get_user_name(req.session.id);
    var lat_res = userdb.get_latency_results(req.session.id);
    res.render('results', {title: "RTT results", message: "here are the results", user: username, latencyresults: lat_res});
}; 
*/
