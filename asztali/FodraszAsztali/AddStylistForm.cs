using System;
using System.Windows.Forms;
using FodraszAsztali.Models;
using FodraszAsztali.Services;

namespace FodraszAsztali
{
    public partial class AddStylistForm : Form
    {
        public AddStylistForm()
        {
            InitializeComponent();

            // Javasolt beállítás, hogy a form modális ablaknak nézzen ki
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.StartPosition = FormStartPosition.CenterParent;
            this.MaximizeBox = false;
            this.Text = "Új fodrász hozzáadása";
        }

        

        

        private async void btnSave_Click(object sender, EventArgs e)
        {
            // Egyszerű ellenőrzés, hogy nincs-e üres mező
            if (string.IsNullOrWhiteSpace(txtName.Text) ||
                string.IsNullOrWhiteSpace(txtSpecialization.Text) ||
                string.IsNullOrWhiteSpace(txtEmail.Text) ||
                string.IsNullOrWhiteSpace(txtPhone.Text))
            {
                MessageBox.Show("Minden mezőt kötelező kitölteni!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Új fodrász objektum létrehozása (id-t a backend adja)
            var newStylist = new Stylist
            {
                name = txtName.Text.Trim(),
                specialization = txtSpecialization.Text.Trim(),
                email = txtEmail.Text.Trim(),
                phone = txtPhone.Text.Trim()
            };

            try
            {
                btnSave.Enabled = false; // Gomb letiltása, hogy ne lehessen kétszer rákattintani

                // API hívás a mentéshez
                await ApiService.AddStylistAsync(newStylist);

                MessageBox.Show("Fodrász sikeresen hozzáadva!", "Siker", MessageBoxButtons.OK, MessageBoxIcon.Information);
                this.DialogResult = DialogResult.OK; // Jelzi az AdminMainForm-nak, hogy sikeres volt a mentés
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a mentés során:\n{ex.Message}", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
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