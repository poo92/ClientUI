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
        private readonly IApplicationClientService _applicationClientService;

        public ClientController(IApplicationClientService applicationClientService)
        {
            _applicationClientService = applicationClientService;
        }

        [HttpGet]
        [Route("getclients")]
        public IList<Client> GetClients()
        {
            return _applicationClientService.GetClients();
        }
    }
}