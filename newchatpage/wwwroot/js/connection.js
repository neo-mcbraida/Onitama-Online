
var container = document.querySelector("#board");
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//starts connection between browser and server
var game;
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userName = urlParams.get('userName');
//these two lines get the roomId query that is in the URL
//Disable send button until connection is established

connection.on("SendGameInfo", function (userId) {

    game.players.push(userId);
    //if this client was the first to join a game this client invokes
    //method that sends the game info to th client that called the method
    if (game.players[0] == game.userId) {
        connection.invoke("EchoGameInfo", game.players, userId);
    }

});

connection.on("CreateSelf", function (roomId, userId) {//instantiates a new Game
    game = new Game(container, userId, connection, roomId)
});


connection.on("RecieveGameInfo", function (_players, _userId) {
    //recieves game info and updates its own instance of Game 
    //so the it has the same game values as the other client
    game.players = _players;
    game.userId = _userId;
    //invokes a method that starts game for all clients in room
    connection.invoke("StartGame", game.roomId);
});


connection.on("StartGame", function () {
    //runs start method in game
    game.start();
});


connection.on("Move", function (pawn, dStart) {
    //moves pawn to coordinates that other client has it at
    if (dStart === true) {
        game.board.SetActive(pawn);
    } else {
        game.board.MovePiece(pawn);
    }
});


connection.on("SwapMove", function (pawnId, cardId) {
    //runs game method swaps move of players
    game.SwapTurn(pawnId, cardId);
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

