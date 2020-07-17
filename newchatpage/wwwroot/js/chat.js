
var dragItem = document.querySelector("#item");
var container = document.querySelector("#container");



var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var userId;
var playerTurn;
//starts connection between browser and server



const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userName = urlParams.get('userName');
//these two lines get the roomId query that is in the URL
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

var game; //= new Game();
connection.on("SendGameInfo", function (_userId) {

    //game = new Game(container, null, dragItem, newUserId, connection, roomId);
    game.players.push(_userId);
    if (game.players[0] == game.userId) {
        connection.invoke("EchoGameInfo", game, _userId)
        //game.playerTurn = newUserId;
        //game.players.push(newUserId);
        //game.start();
    }
    //else if (game.players[0] == game.userId) {
    //    connection.invoke("EchoGameInfo", game.players, game.playerTurn, userId);
    //    game.players.add(userId);
    //}

});

connection.on("CreateSelf", function (roomId, userId) {
    game = new Game(container, null, dragItem, userId, connection, roomId)
});

connection.on("recieveCoordinates", function (pawn) {
    game.board.MovePiece(pawn);
});

connection.on("RecieveGameInfo", function (_game, _userId) {
    game.players = _game.players;
    game.userId = _userId;
    connection.invoke("StartGame", game.roomId);
});



connection.on("StartGame", function () {
    game.start();  
});


connection.on("ReceiveMessage", function (userName, message) {//this adds any new message revieved to ordered list for each client
    //converts specific symbols into format that html can output, and protects from script Injection
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = userName + ": " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {//this runs the function in ChatHub called join room after the connection is established
    connection.invoke("joinRoom", roomId).catch(function (err) {//and passes roomId as an argument
    return console.error(err.toString());
    });
    event.preventDefault();

});

//wire up event handler to send message to hub when send button clicked
document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    //runs function 'SendMessage' with given aguments
    connection.invoke("SendMessage", userName, message, roomId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


connection.on("SwapMove", function () {
    game.SwapTurn();
});