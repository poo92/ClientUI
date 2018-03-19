using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.Models
{
    public class Client
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientUri { get; set; }
        public string Secret { get; set; }
        public int[] ApiResources { get; set; }
        public int[] IdentityResources { get; set; }
        public string GrantType { get; set; }
    }
}
