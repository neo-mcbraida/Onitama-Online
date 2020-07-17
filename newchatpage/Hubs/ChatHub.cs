using System;
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
    /// <summary>
    /// 
    /// </summary>
    /// 


    public class ChatHub : Hub
    {


        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <param name="roomId"></param>  
        /// <returns></returns>
        /// 


        public async Task SendMessage(string user, string message, string roomId)
        {
            if(message != ""){//validation check to stop users sending blank messages
                //for all clients in group 'groupId', runs function RecieveMessage in chat.js
                await Clients.Group(roomId).SendAsync("ReceiveMessage", user, message);
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task JoinRoom(string _roomId)
        {
            string userId = Context.ConnectionId;
            string roomId = _roomId;
            //joins client to specific group, 1st arg is essentially a browser specific cleint name
            //2nd arg is group name
            await Groups.AddToGroupAsync(userId, roomId);
            //await Clients.Client(userId).SendAsync("CreateSelf", userId);
            await Clients.Client(userId).SendAsync("CreateSelf", roomId, userId);
            await Clients.GroupExcept(roomId, userId).SendAsync("SendGameInfo", userId);
            //clients++ 
            //await Clients.Group(roomId).SendAsync("start", clients);
            //await Clients.Client(userId).SendAsync("start", userId, currentGame.playerTurn);
           
        }

        public async Task EchoGameInfo(object game, string userId)
        {

            await Clients.Client(userId).SendAsync("RecieveGameInfo", game, userId);
            
        }

        public async Task SendCoordinate(object pawn, string roomId)
        {
            var i = Context.ConnectionId;
            await Clients.GroupExcept(roomId, i).SendAsync("recieveCoordinates", pawn); //.GroupExcept(roomId, Context.ConnectionId).SendAsync("recieveCoordinates", pawn);
        }

        public async Task StartGame(string roomId)
        {
            await Clients.Group(roomId).SendAsync("StartGame");
        }

        public async Task SwapMove(string roomId)
        {
            await Clients.Group(roomId).SendAsync("SwapMove");
        }
    }
}