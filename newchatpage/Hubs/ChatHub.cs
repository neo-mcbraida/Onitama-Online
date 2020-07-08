using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace newchatpage.Hubs
{
    /// <summary>
    /// 
    /// </summary>
    public class ChatHub : Hub
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <param name="roomId"></param>  
        /// <returns></returns>
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
        public async Task JoinRoom(string roomId)
        {
            //joins client to specific group, 1st arg is essentially a browser specific cleint name
            //2nd arg is group name
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        }
    }
}
