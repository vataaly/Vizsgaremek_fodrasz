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
        public int user_id { get; set; }
        public int stylist_id { get; set; }
        public int service_id { get; set; }
        public string appointment_date { get; set; }
        public string start_time { get; set; }
        public string end_time { get; set; }
        public string status { get; set; }
    }
}

