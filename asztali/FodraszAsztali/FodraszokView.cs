using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using FodraszAsztali.Services;



namespace FodraszAsztali
{
    public partial class FodraszokView : Form
    {
        public FodraszokView()
        {
            InitializeComponent();
            LoadData();
        }
        private async void LoadData()
        {
            var diakok = await ApiService.GetDiakokAsync();
            dgvFodraszok.DataSource = diakok;
        }

    }
}
