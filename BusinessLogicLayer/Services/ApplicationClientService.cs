using BusinessLogicLayer.Services.Interfaces;
using DataAccessLayer.Repositories.Interfaces;
using SharedModels;
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

        public List<Client> GetClients() {
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

        public List<string> GetClientProperties() {
            var clientProperties = new List<string>();

            clientProperties.Add(Enums.ClientProperties.Balancer);
            clientProperties.Add(Enums.ClientProperties.TaskManager);
            clientProperties.Add(Enums.ClientProperties.IntegrationHub);
            clientProperties.Add(Enums.ClientProperties.Setup);
            clientProperties.Add(Enums.ClientProperties.Support);
            clientProperties.Add(Enums.ClientProperties.ScreenSteps);

            return clientProperties;
        }

        public List<ApiResource> GetApiResources()
        {
            var list = new List<ApiResource>();
            var result = _applicationClientRepository.GetApiResources();

            foreach (IdentityServer4.EntityFramework.Entities.ApiResource ar in result)
            {
                var apiResource = new ApiResource();
                apiResource.Id = ar.Id;
                apiResource.Name = ar.Name;
                list.Add(apiResource);
            }
            return list;
        }

        public List<IdentityResource> GetIdentityResources()
        {
            var list = new List<IdentityResource>();
            var result = _applicationClientRepository.GetIdentityResources();

            foreach (IdentityServer4.EntityFramework.Entities.IdentityResource ir in result)
            {
                var identityResource = new IdentityResource();
                identityResource.Id = ir.Id;
                identityResource.Name = ir.Name;
                list.Add(identityResource);
            }
            return list;
        }

        public List<string> GetGrantTypes()
        {
            var grantTypes = new List<string>();

            grantTypes.Add(Enums.GrantTypes.Password);
            grantTypes.Add(Enums.GrantTypes.ClientCredentials);
            grantTypes.Add(Enums.GrantTypes.Hybrid);

            return grantTypes;
        }
        
    }
}
