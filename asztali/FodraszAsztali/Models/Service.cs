using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FodraszAsztali.Models
{
    public class Service
    {
        public int service_id { get; set; }
        public string name { get; set; }
        public int duration_minutes { get; set; }
        public decimal price { get; set; }
    }
}

