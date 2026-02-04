namespace FodraszAsztali
{
    partial class FodraszokView
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panelTop = new System.Windows.Forms.Panel();
            this.dgvFodraszok = new System.Windows.Forms.DataGridView();
            this.btnAddStylist = new System.Windows.Forms.Button();
            this.btnEditStylist = new System.Windows.Forms.Button();
            this.btnDeleteStylist = new System.Windows.Forms.Button();
            this.panelTop.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvFodraszok)).BeginInit();
            this.SuspendLayout();
            // 
            // panelTop
            // 
            this.panelTop.BackColor = System.Drawing.Color.Gainsboro;
            this.panelTop.Controls.Add(this.btnDeleteStylist);
            this.panelTop.Controls.Add(this.btnEditStylist);
            this.panelTop.Controls.Add(this.btnAddStylist);
            this.panelTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelTop.Location = new System.Drawing.Point(0, 0);
            this.panelTop.Name = "panelTop";
            this.panelTop.Size = new System.Drawing.Size(1270, 100);
            this.panelTop.TabIndex = 0;
            // 
            // dgvFodraszok
            // 
            this.dgvFodraszok.AllowUserToAddRows = false;
            this.dgvFodraszok.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvFodraszok.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvFodraszok.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvFodraszok.Location = new System.Drawing.Point(0, 100);
            this.dgvFodraszok.MultiSelect = false;
            this.dgvFodraszok.Name = "dgvFodraszok";
            this.dgvFodraszok.ReadOnly = true;
            this.dgvFodraszok.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgvFodraszok.Size = new System.Drawing.Size(1270, 640);
            this.dgvFodraszok.TabIndex = 1;
            // 
            // btnAddStylist
            // 
            this.btnAddStylist.Location = new System.Drawing.Point(10, 10);
            this.btnAddStylist.Name = "btnAddStylist";
            this.btnAddStylist.Size = new System.Drawing.Size(100, 30);
            this.btnAddStylist.TabIndex = 0;
            this.btnAddStylist.Text = "Új fodrász";
            this.btnAddStylist.UseVisualStyleBackColor = true;
            // 
            // btnEditStylist
            // 
            this.btnEditStylist.Location = new System.Drawing.Point(116, 10);
            this.btnEditStylist.Name = "btnEditStylist";
            this.btnEditStylist.Size = new System.Drawing.Size(100, 30);
            this.btnEditStylist.TabIndex = 0;
            this.btnEditStylist.Text = "Szerkesztés";
            this.btnEditStylist.UseVisualStyleBackColor = true;
            // 
            // btnDeleteStylist
            // 
            this.btnDeleteStylist.Location = new System.Drawing.Point(222, 10);
            this.btnDeleteStylist.Name = "btnDeleteStylist";
            this.btnDeleteStylist.Size = new System.Drawing.Size(100, 30);
            this.btnDeleteStylist.TabIndex = 0;
            this.btnDeleteStylist.Text = "Törlés";
            this.btnDeleteStylist.UseVisualStyleBackColor = true;
            // 
            // FodraszokView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1270, 740);
            this.Controls.Add(this.dgvFodraszok);
            this.Controls.Add(this.panelTop);
            this.Name = "FodraszokView";
            this.Text = "FodraszokView";
            this.panelTop.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dgvFodraszok)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelTop;
        private System.Windows.Forms.DataGridView dgvFodraszok;
        private System.Windows.Forms.Button btnAddStylist;
        private System.Windows.Forms.Button btnDeleteStylist;
        private System.Windows.Forms.Button btnEditStylist;
    }
}