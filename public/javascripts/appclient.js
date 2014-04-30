var myapp = (function(){
    var socket = io.connect();
    
    socket.on('pong', function(data) {
        var rtt = Date.now() - data.timestamp;
        console.log("Ping RTT (milliseconds): " + rtt);
        var totrtt = data.totrtt+rtt;
        
        if(data.seq_num==4){
            socket.emit('latency_test', {avgrtt: totrtt/5});
            jQuery("#status").text("Your avg RTT: " + (totrtt/5) + " milliseconds.");
            jQuery("#status").css({color: 'blue'});
            jQuery("#results").css("display","block");
            console.log("\n");
        }else{
            socket.emit('ping', {timestamp: Date.now(), seq_num: data.seq_num+1, totrtt: totrtt});
        }
    });
    socket.on('upload_pong', function(data) {
        var rtt = Date.now() - data.timestamp;
        console.log("Upload RTT (milliseconds): " + rtt);
        var totrtt = data.totrtt + rtt;
        if(data.seq_num==4) {
            socket.emit('upload_test', {upload_avg: totrtt/5});
            jQuery("#uploadstatus").text("Your avg upload RTT: " + (totrtt/5) + " milliseconds.");
            jQuery("#uploadstatus").css({color: 'green'});
            jQuery("#uploadstatus").css("display", "block");
            console.log("\n");
        } else {
            socket.emit('upload_ping', {uploadtest: data.uploadtest, timestamp: Date.now(), seq_num: data.seq_num + 1, totrtt: totrtt});
        }
    });
    
    var start_upload = function() {
        var arr = new Float64Array(1500);
        socket.emit('upload_ping', {uploadtest: arr, timestamp: Date.now(), seq_num: 0, totrtt: 0});
    };
    
    
    var start_ping = function() {
        socket.emit('ping', {timestamp: Date.now(), seq_num: 0, totrtt: 0});
    };
    
    

    return {
        init: function() {
            console.log("Client-side app starting up");
            jQuery("#startping").click(start_ping);
            jQuery("#uploadinfo").click(start_upload);
            

        }
    }
})();
jQuery(myapp.init);

