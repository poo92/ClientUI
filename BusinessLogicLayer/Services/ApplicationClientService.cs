using BusinessLogicLayer.Services.Interfaces;
using DataAccessLayer.Repositories.Interfaces;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.Models;
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

        public List<SharedModels.Client> GetClients()
        {
            var list = new List<SharedModels.Client>();
            var result = _applicationClientRepository.GetClients();

            foreach (IdentityServer4.EntityFramework.Entities.Client c in result)
            {
                var client = new SharedModels.Client();
                client.ClientId = c.ClientId;
                client.ClientName = c.ClientName;
                client.ClientUri = c.ClientUri;

                if(c.AllowedGrantTypes.Count > 0)
                {
                    client.GrantType = c.AllowedGrantTypes[0].GrantType;
                }

                if (c.Properties.Count > 0)
                {
                    client.ClientProperty = c.Properties[0].Value;
                }

                if (c.RedirectUris.Count > 0)
                {
                    client.RedirectUrl = c.RedirectUris[0].RedirectUri;
                }

                if (c.PostLogoutRedirectUris.Count > 0)
                {
                    client.PostLogoutUrl = c.PostLogoutRedirectUris[0].PostLogoutRedirectUri;
                }

                if(c.AllowedScopes.Count > 0)
                {
                    client.IdentityResources = new string[c.AllowedScopes.Count];

                    for (int i=0; i< c.AllowedScopes.Count; i++)
                    {
                        ClientScope clientScope = new ClientScope();
                        client.IdentityResources[i] = clientScope.Scope;
                    }
                }

                list.Add(client);
            }
            return list;
        }

        public List<string> GetClientProperties()
        {
            var clientProperties = new List<string>();

            clientProperties.Add(Enums.ClientProperties.Balancer);
            clientProperties.Add(Enums.ClientProperties.TaskManager);
            clientProperties.Add(Enums.ClientProperties.IntegrationHub);
            clientProperties.Add(Enums.ClientProperties.Setup);
            clientProperties.Add(Enums.ClientProperties.Support);
            clientProperties.Add(Enums.ClientProperties.ScreenSteps);

            return clientProperties;
        }

        public List<SharedModels.ApiResource> GetApiResources()
        {
            var list = new List<SharedModels.ApiResource>();
            var result = _applicationClientRepository.GetApiResources();

            foreach (IdentityServer4.EntityFramework.Entities.ApiResource ar in result)
            {
                var apiResource = new SharedModels.ApiResource();
                apiResource.Id = ar.Id;
                apiResource.Name = ar.Name;
                list.Add(apiResource);
            }
            return list;
        }

        public List<SharedModels.IdentityResource> GetIdentityResources()
        {
            var list = new List<SharedModels.IdentityResource>();
            var result = _applicationClientRepository.GetIdentityResources();

            foreach (IdentityServer4.EntityFramework.Entities.IdentityResource ir in result)
            {
                var identityResource = new SharedModels.IdentityResource();
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

        public void AddClient(SharedModels.Client client)
        {
            IdentityServer4.EntityFramework.Entities.Client clientModel = new IdentityServer4.EntityFramework.Entities.Client();

            clientModel.ClientName = client.ClientName;
            clientModel.ClientUri = client.ClientUri;
            clientModel.ClientId = client.ClientId;

            ClientSecret secret = new ClientSecret();
            secret.Value = new IdentityServer4.Models.Secret(client.ClientSecret.Sha256()).Value;
            secret.Type = "SharedSecret";
            clientModel.ClientSecrets = new List<ClientSecret>();
            clientModel.ClientSecrets.Add(secret);

            ClientGrantType grantType = new ClientGrantType();
            grantType.GrantType = client.GrantType;
            clientModel.AllowedGrantTypes = new List<ClientGrantType>();
            clientModel.AllowedGrantTypes.Add(grantType);

            ClientProperty clientProperty = new ClientProperty();
            clientProperty.Value = client.ClientProperty;
            clientProperty.Key = "ApplicationType";
            clientModel.Properties = new List<ClientProperty>();
            clientModel.Properties.Add(clientProperty);

            clientModel.AllowedScopes = new List<ClientScope>();
            foreach (string s in client.IdentityResources)
            {
                ClientScope clientScope = new ClientScope();
                clientScope.Scope = s.Replace(" ", "_");
                clientModel.AllowedScopes.Add(clientScope);
            }
            foreach (string s in client.ApiResources)
            {
                ClientScope clientScope = new ClientScope();
                clientScope.Scope = s.Replace(" ", "_");
                clientModel.AllowedScopes.Add(clientScope);
            }

            ClientRedirectUri clientRedirectUri = new ClientRedirectUri();
            clientRedirectUri.RedirectUri = client.RedirectUrl;
            clientModel.RedirectUris = new List<ClientRedirectUri>();
            clientModel.RedirectUris.Add(clientRedirectUri);

            ClientPostLogoutRedirectUri postLogoutRedirectUrl = new ClientPostLogoutRedirectUri();
            postLogoutRedirectUrl.PostLogoutRedirectUri = client.PostLogoutUrl;
            clientModel.PostLogoutRedirectUris = new List<ClientPostLogoutRedirectUri>();
            clientModel.PostLogoutRedirectUris.Add(postLogoutRedirectUrl);

            _applicationClientRepository.AddClient(clientModel);

        }
    }
}
