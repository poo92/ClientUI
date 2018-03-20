using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogicLayer.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SharedModels;

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
        public List<Client> GetClients()
        {
            return _applicationClientService.GetClients();
        }

        [HttpGet]
        [Route("getclientproperties")]
        public List<string> GetClientProperties()
        {
            return _applicationClientService.GetClientProperties();
        }

        [HttpGet]
        [Route("getapiresources")]
        public List<ApiResource> GetApiResource()
        {
            return _applicationClientService.GetApiResources();
        }

        [HttpGet]
        [Route("getidentityresources")]
        public List<IdentityResource> GetIdentityResources()
        {
            return _applicationClientService.GetIdentityResources();
        }
    }
}