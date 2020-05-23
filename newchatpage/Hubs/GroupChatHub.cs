using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace newchatpage.Hubs
{
    public class GroupChatHub : Hub
    {
        public async Task Room(string RoomID)//room Id id the gameid query
        {
            //    Random rand = new Random();
            //    string roomId = rand.Next(200).ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, RoomID);
            await Clients.All.SendAsync("ReceiveMessage", "neo", "has Joined");

        }
    }
}
