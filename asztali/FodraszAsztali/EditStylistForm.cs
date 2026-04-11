using System;
using System.Windows.Forms;
using FodraszAsztali.Models;
using FodraszAsztali.Services;

namespace FodraszAsztali
{
    public partial class EditStylistForm : Form
    {
        private int _stylistId;

        // A konstruktor most vár egy Stylist objektumot
        public EditStylistForm(Stylist stylistToEdit)
        {
            InitializeComponent();

            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.StartPosition = FormStartPosition.CenterParent;
            this.MaximizeBox = false;
            this.Text = "Fodrász adatainak módosítása";

            // Kiválasztott adatok betöltése a beviteli mezőkbe
            _stylistId = stylistToEdit.stylist_id;
            txtName.Text = stylistToEdit.name;
            txtSpecialization.Text = stylistToEdit.specialization;
            txtEmail.Text = stylistToEdit.email;
            txtPhone.Text = stylistToEdit.phone;
        }

        private async void btnSave_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text) ||
                string.IsNullOrWhiteSpace(txtSpecialization.Text) ||
                string.IsNullOrWhiteSpace(txtEmail.Text) ||
                string.IsNullOrWhiteSpace(txtPhone.Text))
            {
                MessageBox.Show("Minden mezőt kötelező kitölteni!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var updatedStylist = new Stylist
            {
                stylist_id = _stylistId,
                name = txtName.Text.Trim(),
                specialization = txtSpecialization.Text.Trim(),
                email = txtEmail.Text.Trim(),
                phone = txtPhone.Text.Trim()
            };

            try
            {
                btnSave.Enabled = false;

                // Módosítás elküldése az API-nak
                await ApiService.UpdateStylistAsync(_stylistId, updatedStylist);

                MessageBox.Show("Fodrász sikeresen módosítva!", "Siker", MessageBoxButtons.OK, MessageBoxIcon.Information);
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a módosítás során:\n{ex.Message}", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
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