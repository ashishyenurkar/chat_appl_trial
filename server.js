

const app = require("express")();
const users = {};
const server = require("http").createServer(app);

const io = require("socket.io")(server);



io.on("connection", (socket) => {
    socket.on("register", (data) => {
        users[data?.username] = socket?.id;
        io.emit("userlist", { users: Object.keys(users) });
    });
    socket.on("chat text", (data) => {
        const toUserId=users[data?.toUser]
        io.to(toUserId).emit("chat text", data);
        console.log("chat text", data)
    })
});
app.get("/", (req,res) => {
    res.sendFile(__dirname+"/index.html");    
})
server.listen(8080);