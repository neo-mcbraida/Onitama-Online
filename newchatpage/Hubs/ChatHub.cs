﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.SignalR;

namespace newchatpage.Hubs
{
    public class ChatHub : Hub
    {
        //public string _roomId { get; set; }

        public async Task SendMessage(string user, string message, string roomId)
        {
            if (message != "")
            {
                //validation check to stop users sending blank messages
                //for all clients in group 'roomId', runs function RecieveMessage in chat.js
                await Clients.Group(roomId).SendAsync("ReceiveMessage", user, message);
            }
        }

        public async Task JoinRoom(string roomId)
        {
            string userId = Context.ConnectionId;
            //joins client to specific group, 1st arg is essentially a browser specific cleint name
            //2nd arg is group name
            await Groups.AddToGroupAsync(userId, roomId);
            //await _roomId = roomId;
            //runs method that instantiate game instance
            await Clients.Client(userId).SendAsync("CreateSelf", roomId, userId);
            //if there are other clients in group, will run method that sends state of game
            await Clients.GroupExcept(roomId, userId).SendAsync("SendGameInfo", userId);

        }

        public async Task EchoGameInfo(string[] players, string userId)
        {
            //sends game info to new clients that requested it
            await Clients.Client(userId).SendAsync("RecieveGameInfo", players, userId);
        }


        public async Task Move(object pawn, string roomId, bool dStart)
        {
            //sends to coordinates of piece being moved to all clients in lobby except the
            
            await Clients.GroupExcept(roomId, Context.ConnectionId).SendAsync("Move", pawn, dStart);
            
        }

        public async Task StartGame(string roomId)
        {
            //runs method for all clients in room that starts the game
            await Clients.Group(roomId).SendAsync("StartGame");
        }

        public async Task SwapMove(string roomId, int? pawnId)
        {
            //runs method for all cleints in room that swaps the players turn
            
            await Clients.Group(roomId).SendAsync("SwapMove", pawnId);
        }
    }
}