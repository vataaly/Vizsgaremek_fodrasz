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
        private static readonly string BASE_URL =
            "https://retoolapi.dev/xNFNpH/diak";

        public static async Task<List<Diak>> GetDiakokAsync()
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(BASE_URL);
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Diak>>(json);
            }
        }
    }
}
