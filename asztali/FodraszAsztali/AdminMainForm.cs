using System;
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
            // Biztosítjuk, hogy a meglévő DGV kitöltse a panelt
            dgv.Dock = DockStyle.Fill;
            dgv.ReadOnly = true;
            dgv.AutoGenerateColumns = true;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            // Alapértelmezetten a fodrászok töltődnek be
            btnStylists_Click(null, null);
        }

        private async void btnStylists_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Fodrászok";
            var stylists = await ApiService.GetStylistsAsync();
            dgv.DataSource = stylists;
        }

        private async void btnAppointments_Click(object sender, EventArgs e)
        {
            lblHeader.Text = "Időpontok";
            var appointments = await ApiService.GetAppointmentsAsync();
            dgv.DataSource = appointments;
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            Application.Restart();
        }

        // TÖRLÉS GOMB LOGIKÁJA
        private async void btnDeleteStylist_Click(object sender, EventArgs e)
        {
            if (dgv.SelectedRows.Count == 0)
            {
                MessageBox.Show("Kérlek válassz ki egy elemet a listából!");
                return;
            }

            if (lblHeader.Text == "Fodrászok")
            {
                var selected = dgv.SelectedRows[0].DataBoundItem as Stylist;
                if (MessageBox.Show($"Biztos törlöd a fodrászt? {selected.name}", "Törlés", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    await ApiService.DeleteStylistAsync(selected.stylist_id);
                    btnStylists_Click(null, null); // Lista frissítése
                }
            }
            else if (lblHeader.Text == "Időpontok")
            {
                var selected = dgv.SelectedRows[0].DataBoundItem as Appointment;
                if (MessageBox.Show($"Biztos törlöd az időpontot? {selected.appointment_date.ToShortDateString()}", "Törlés", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    await ApiService.DeleteAppointmentAsync(selected.appointment_id);
                    btnAppointments_Click(null, null); // Lista frissítése
                }
            }
        }

        // HOZZÁADÁS GOMB LOGIKÁJA
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (lblHeader.Text == "Fodrászok")
            {
                // Feltételezve, hogy van egy AddStylistForm nevű formod
                var form = new AddStylistForm();
                form.ShowDialog();
                btnStylists_Click(null, null); // Frissítés
            }
            else if (lblHeader.Text == "Időpontok")
            {
                // Ide jön majd az AddAppointmentForm() megnyitása
                MessageBox.Show("Itt nyílik majd meg az időpont hozzáadása ablak.");
            }
        }

        // SZERKESZTÉS GOMB LOGIKÁJA (Rendeld hozzá az Eseményeknél a gomb Click-hez!)
        private void btnEdit_Click(object sender, EventArgs e)
        {
            if (dgv.SelectedRows.Count == 0)
            {
                MessageBox.Show("Kérlek válassz ki egy elemet a szerkesztéshez!");
                return;
            }

            if (lblHeader.Text == "Fodrászok")
            {
                var selected = dgv.SelectedRows[0].DataBoundItem as Stylist;
                // Ide jön a fodrász módosító ablak megnyitása, átadva neki a kiválasztott adatot
                MessageBox.Show($"Itt nyílik majd meg a szerkesztő ablak a következőhöz: {selected.name}");
            }
            else if (lblHeader.Text == "Időpontok")
            {
                var selected = dgv.SelectedRows[0].DataBoundItem as Appointment;
                // Ide jön az időpont módosító ablak megnyitása
                MessageBox.Show("Itt nyílik majd meg az időpont szerkesztése ablak.");
            }
        }
    }
}