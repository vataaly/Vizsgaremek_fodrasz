using FodraszAsztali.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FodraszAsztali.Services
{
    public static class ApiService
    {
        private static readonly string BASE_URL = "http://localhost:3000";
        private static readonly HttpClient client = new HttpClient();

        
        public static async Task<List<Stylist>> GetStylistsAsync()
        {
            var response = await client.GetAsync($"{BASE_URL}/api/stylists");

            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<Stylist>>(json);
        }
        public static async Task<List<Appointment>> GetAppointmentsAsync()
        {
            var response = await client.GetAsync($"{BASE_URL}/api/appointments");
            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<Appointment>>(json);
        }

        public static async Task AddStylistAsync(Stylist stylist)
        {
            var json = JsonConvert.SerializeObject(stylist);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{BASE_URL}/stylists", content);
            response.EnsureSuccessStatusCode();
        }

        public static async Task UpdateStylistAsync(int id, Stylist stylist)
        {
            var json = JsonConvert.SerializeObject(stylist);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PutAsync($"{BASE_URL}/stylists/{id}", content);
            response.EnsureSuccessStatusCode();
        }

        public static async Task DeleteStylistAsync(int id)
        {
            var response = await client.DeleteAsync($"{BASE_URL}/stylists/{id}");
            response.EnsureSuccessStatusCode();
        }
    }
}
