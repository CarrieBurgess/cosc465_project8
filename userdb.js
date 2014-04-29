var userhash = { };  // session ID -> user data
var next_anonymous = 1; 

var add_user = function(id, user) {
    if (userhash[id] === undefined) {
        if (!user) {
            user = "some_ball" + next_anonymous;
            //see tagpro for the reference.
            next_anonymous += 1;
        }
        userhash[id] = {
            'id': id,
            'user': user,
            'latency_results': []
        };
    }
    return userhash[id];
};
exports.add_user = add_user;

exports.get_user_name = function(id) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    return userhash[id].user;
};


exports.get_latency_results = function(id) {
    if (unserhash[id] === undefined) {
        add_user(id, undefined);
    }
    return userhash[id].latency_results;
};
