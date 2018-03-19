using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogicLayer.Services.Interfaces;
using ClientApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Client")]
    public class ClientController : Controller
    {
        private readonly IApplicationClientService _clientService;

        public ClientController(IApplicationClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        [Route("getclients")]
        public string GetClients()
        {
            return "ok";
        }
    }
}