var myapp = (function(){
    var start_ping = function() {
        var socket = io.connect();
        totrtt = 0;
        for(var i=1;i<=5;i++){
            socket.emit('ping', {timestamp: Date.now(), seq_num: i, tot: totrtt});
            socket.on('pong', function(data) {
                var rtt = Date.now() - data.timestamp;
                console.log("Ping RTT (milliseconds): " + rtt);
                totrtt += rtt;
            });
            //avrtt/=5;
        }
    };

    return {
        init: function() {
            console.log("Client-side app starting up");
            jQuery("#startping").click(start_ping);

        }
    }
})();
jQuery(myapp.init);

