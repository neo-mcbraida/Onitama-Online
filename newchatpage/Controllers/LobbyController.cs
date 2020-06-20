using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using newchatpage.Hubs;

namespace newchatpage.Controllers
{
    public class LobbyController : Controller
    {
        public IActionResult Index()
        {
            //When user requestd /Lobby render the view that lets them create/join room 
            return View("~/Views/Lobby/Index.cshtml");
        }
    }
}
