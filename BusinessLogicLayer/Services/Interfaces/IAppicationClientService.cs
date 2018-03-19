using BusinessLogicLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.Services.Interfaces
{
    public interface IApplicationClientService
    {
        IList<Client> GetClients();
    }
}
