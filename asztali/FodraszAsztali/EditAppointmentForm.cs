using System;
using System.Linq;
using System.Collections.Generic;
using System.Windows.Forms;
using FodraszAsztali.Models;
using FodraszAsztali.Services;

namespace FodraszAsztali
{
    public partial class EditAppointmentForm : Form
    {
        private Appointment _appToEdit;

        public EditAppointmentForm(Appointment appToEdit)
        {
            InitializeComponent();
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.StartPosition = FormStartPosition.CenterParent;
            this.MaximizeBox = false;
            this.Text = "Időpont szerkesztése";
            _appToEdit = appToEdit;
        }

       

        private async void btnSave_Click(object sender, EventArgs e)
        {
            if (cbUsers.SelectedValue == null || cbStylists.SelectedValue == null || cbServices.SelectedValue == null ||
                string.IsNullOrWhiteSpace(txtStartTime.Text) || string.IsNullOrWhiteSpace(txtEndTime.Text))
            {
                MessageBox.Show("Minden adatot kötelező kiválasztani és kitölteni!", "Figyelem", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var updatedApp = new CreateAppointmentRequest
            {
                user_id = (int)cbUsers.SelectedValue,
                stylist_id = (int)cbStylists.SelectedValue,
                service_id = (int)cbServices.SelectedValue,
                appointment_date = dtpDate.Value.ToString("yyyy-MM-dd"),
                start_time = txtStartTime.Text.Trim(),
                end_time = txtEndTime.Text.Trim()
            };

            try
            {
                btnSave.Enabled = false;
                await ApiService.UpdateAppointmentAsync(_appToEdit.appointment_id, updatedApp);
                MessageBox.Show("Időpont sikeresen frissítve!");
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

        private async void EditAppointmentForm_Load(object sender, EventArgs e)
        {
            try
            {
                // === FELHASZNÁLÓK ===
                var users = await ApiService.GetUsersAsync();
                cbUsers.DataSource = users;
                cbUsers.DisplayMember = "name";
                cbUsers.ValueMember = "user_id";

                // Keresés kisbetűsítve és szóközöktől megtisztítva
                if (!string.IsNullOrEmpty(_appToEdit.user_name))
                {
                    var selectedUser = users.FirstOrDefault(u =>
                        u.name != null && u.name.Trim().ToLower() == _appToEdit.user_name.Trim().ToLower());

                    if (selectedUser != null)
                        cbUsers.SelectedValue = selectedUser.user_id;
                    else
                        MessageBox.Show($"Nem találom a vendéget a listában: '{_appToEdit.user_name}'");
                }

                // === FODRÁSZOK ===
                var stylists = await ApiService.GetStylistsAsync();
                cbStylists.DataSource = stylists;
                cbStylists.DisplayMember = "name";
                cbStylists.ValueMember = "stylist_id";

                if (!string.IsNullOrEmpty(_appToEdit.stylist_name))
                {
                    var selectedStylist = stylists.FirstOrDefault(s =>
                        s.name != null && s.name.Trim().ToLower() == _appToEdit.stylist_name.Trim().ToLower());

                    if (selectedStylist != null)
                        cbStylists.SelectedValue = selectedStylist.stylist_id;
                    else
                        MessageBox.Show($"Nem találom a fodrászt a listában: '{_appToEdit.stylist_name}'");
                }

                // === SZOLGÁLTATÁSOK ===
                var services = await ApiService.GetServicesAsync();
                cbServices.DataSource = services;
                cbServices.DisplayMember = "name";
                cbServices.ValueMember = "service_id";

                if (!string.IsNullOrEmpty(_appToEdit.service_name))
                {
                    var selectedService = services.FirstOrDefault(s =>
                        s.name != null && s.name.Trim().ToLower() == _appToEdit.service_name.Trim().ToLower());

                    if (selectedService != null)
                        cbServices.SelectedValue = selectedService.service_id;
                    else
                        MessageBox.Show($"Nem találom a szolgáltatást a listában: '{_appToEdit.service_name}'");
                }

                // === EGYÉB ADATOK ===
                // A dátum beállítása (ha a korábbi mentés sikeres volt)
                dtpDate.Value = _appToEdit.appointment_date;
                txtStartTime.Text = _appToEdit.start_time;
                txtEndTime.Text = _appToEdit.end_time;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatok betöltésekor: {ex.Message}");
            }
        }
    }
}