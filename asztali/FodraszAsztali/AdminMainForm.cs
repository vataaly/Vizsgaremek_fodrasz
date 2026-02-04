using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

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
        private void btnStylists_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Fodrászok";
            // panelContent.Clear() később
        }

        private void btnAppointments_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Időpontok";
        }

        private void btnServices_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Szolgáltatások";
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            Application.Restart();
        }

    }
}
