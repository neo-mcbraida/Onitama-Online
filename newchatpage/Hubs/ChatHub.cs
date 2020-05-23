using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace newchatpage.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string gameId)
        {
            await Clients.Group(gameId).SendAsync("ReceiveMessage", user, message); 
        }

        public async Task JoinRoom(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
        }
    }
}
