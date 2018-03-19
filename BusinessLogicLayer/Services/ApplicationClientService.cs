using BusinessLogicLayer.Models;
using BusinessLogicLayer.Services.Interfaces;
using DataAccessLayer.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class ApplicationClientService : IApplicationClientService
    {
        private readonly IApplicationClientRepository _applicationClientRepository;

        public ApplicationClientService(IApplicationClientRepository applicationClientService)
        {
            _applicationClientRepository = applicationClientService;
        }

        public IList<Client> GetClients() {
            var list = new List<Client>();
            var result = _applicationClientRepository.GetClients();

            foreach(IdentityServer4.EntityFramework.Entities.Client c in result)
            {
                var client = new Client();
                client.ClientName = c.ClientName;
                list.Add(client);
            }
            return list;
        }

    }
}
