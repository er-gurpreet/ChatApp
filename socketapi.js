const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var online = [];

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    socket.on("usercreated",()=>{
        online.push(socket.id);
        io.emit("online",online.length);
    })
    socket.on("disconnect",()=>{
        online.splice(online.indexOf(socket.id),1);
        socket.emit("online",online.length);
    })

    socket.on("message", (data) =>{
        io.emit("msg", data);
    })
});
// end of socket.io logic

module.exports = socketapi