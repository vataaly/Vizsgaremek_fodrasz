using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using FodraszAsztali.Models;
using FodraszAsztali.Services;

namespace FodraszAsztali
{
    public partial class AdminMainForm : Form
    {
        public AdminMainForm()
        {
            InitializeComponent();
        }
        

        private void MainForm_Load(object sender, EventArgs e)
        {

        }
        private async void btnStylists_Click(object sender, EventArgs e)
        {
            
            lblHeader.Text = "Fodrászok";

            panelContent.Controls.Clear();

            DataGridView dgv = new DataGridView
            {
                Dock = DockStyle.Fill,
                ReadOnly = true,
                AutoGenerateColumns = true
            };

            panelContent.Controls.Add(dgv);

            var stylists = await ApiService.GetStylistsAsync();
            dgv.DataSource = stylists;
        }

        private void btnAppointments_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Időpontok";
        }

        

        private void btnLogout_Click(object sender, EventArgs e)
        {
            Application.Restart();
        }

        
    }
}
