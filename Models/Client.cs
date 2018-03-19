using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientApp.Models
{
    public class Client
    {
        public string ClientId { get; set; }
        public string Clientname { get; set; }
        public string ClientUri { get; set; }
        public string Secret { get; set; }
        public int[] ApiResources { get; set; }
        public int[] IdentityResources { get; set; }
        public string GrantType { get; set; }
    }
}
