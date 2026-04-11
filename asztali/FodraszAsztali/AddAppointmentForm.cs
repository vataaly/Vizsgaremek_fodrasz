using System;
using System.Collections.Generic;
using System.Windows.Forms;
using FodraszAsztali.Models;
using FodraszAsztali.Services;

namespace FodraszAsztali
{
    public partial class AddAppointmentForm : Form
    {
        public AddAppointmentForm()
        {
            InitializeComponent();
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.StartPosition = FormStartPosition.CenterParent;
            this.MaximizeBox = false;
            this.Text = "Új időpont hozzáadása";
        }

        // Form betöltésekor lefutó esemény
        private async void AddAppointmentForm_Load(object sender, EventArgs e)
        {
            try
            {
                // 1. Felhasználók betöltése
                var users = await ApiService.GetUsersAsync();
                cbUsers.DataSource = users;
                cbUsers.DisplayMember = "name"; // Ezt látja a felhasználó (név)
                cbUsers.ValueMember = "user_id"; // Ez a rejtett érték (ID)
                cbUsers.SelectedIndex = -1; // Ne legyen alapból kiválasztva senki

                // 2. Fodrászok betöltése
                var stylists = await ApiService.GetStylistsAsync();
                cbStylists.DataSource = stylists;
                cbStylists.DisplayMember = "name";
                cbStylists.ValueMember = "stylist_id";
                cbStylists.SelectedIndex = -1;

                // 3. Szolgáltatások betöltése
                var services = await ApiService.GetServicesAsync();
                cbServices.DataSource = services;
                cbServices.DisplayMember = "name";
                cbServices.ValueMember = "service_id";
                cbServices.SelectedIndex = -1;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatok betöltésekor: {ex.Message}");
            }
        }

        private async void btnSave_Click(object sender, EventArgs e)
        {
            // Ellenőrzés: kiválasztott-e mindenből egyet?
            if (cbUsers.SelectedValue == null || cbStylists.SelectedValue == null || cbServices.SelectedValue == null ||
                string.IsNullOrWhiteSpace(txtStartTime.Text) || string.IsNullOrWhiteSpace(txtEndTime.Text))
            {
                MessageBox.Show("Minden adatot kötelező kiválasztani és kitölteni!", "Figyelem", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Kinyerjük az ID-kat a ComboBox-okból
            int selectedUserId = (int)cbUsers.SelectedValue;
            int selectedStylistId = (int)cbStylists.SelectedValue;
            int selectedServiceId = (int)cbServices.SelectedValue;

            // Formázzuk a dátumot a backendnek megfelelő ISO formátumra (YYYY-MM-DD)
            string formattedDate = dtpDate.Value.ToString("yyyy-MM-dd");

            var newApp = new CreateAppointmentRequest
            {
                user_id = selectedUserId,
                stylist_id = selectedStylistId,
                service_id = selectedServiceId,
                appointment_date = formattedDate,
                start_time = txtStartTime.Text.Trim(),
                end_time = txtEndTime.Text.Trim()
            };

            try
            {
                btnSave.Enabled = false;
                await ApiService.AddAppointmentAsync(newApp);
                MessageBox.Show("Időpont sikeresen hozzáadva!");
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a mentés során: {ex.Message}");
                btnSave.Enabled = true;
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }
    }
}