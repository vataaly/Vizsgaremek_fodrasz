using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FodraszAsztali.Models
{
    public class User
    {
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        // További mezők, ha vannak a backend user táblájában
    }
}