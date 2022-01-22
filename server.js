const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/",function (req,res) {
    res.sendFile(
        path.join(__dirname,"./index.html")
    );
});


io.on('connection', (socket) => {
    console.log('new connection');
    socket.on("disconnect", ()=>{
        console.log('disconnection')
    });
    //ฟังชั้นสร้างpassword
    socket.on("new password", msg =>{
        function getpassword(msg) {
            var char = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]?/><ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            var passwordlen = msg;
            var password = ""
            let i
            for (i = 0; i < passwordlen; i++) {
                var randomNumber = Math.floor(Math.random() * char.length)
                password += char.substring(randomNumber, randomNumber + 1)
            }
            return password;
        }
        msg = getpassword(msg);
        console.log("password is ",msg)
        io.emit("password", msg) // ส่งค่าที่ได้กลับไปยัง client
    });
    
    
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});