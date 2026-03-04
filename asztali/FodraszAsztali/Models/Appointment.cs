using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FodraszAsztali.Models
{
    public class Appointment
    {
        public int appointment_id { get; set; }
        public DateTime appointment_date { get; set; }
        public string start_time { get; set; }
        public string end_time { get; set; }

        public string user_name { get; set; }
        public string stylist_name { get; set; }
        public string service_name { get; set; }
        public decimal service_price { get; set; }
    }
}

