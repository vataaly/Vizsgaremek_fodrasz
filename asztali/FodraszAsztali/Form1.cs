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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if (txtEmail.Text == "admin@szalon.hu" &&
                txtPassword.Text == "admin")
            {
                AdminMainForm main = new AdminMainForm();
                main.Show();
                this.Hide();
            }
            else
            {
                lblError.Text = "Hibás email vagy jelszó";
                lblError.Visible = true;
            }
        }

    }
}
