using System;

namespace FodraszAsztali.Models
{
    public class CreateAppointmentRequest
    {
        public int user_id { get; set; }
        public int stylist_id { get; set; }
        public int service_id { get; set; }
        public string appointment_date { get; set; } 
        public string start_time { get; set; }
        public string end_time { get; set; }
    }
}