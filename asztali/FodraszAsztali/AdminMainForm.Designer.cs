namespace FodraszAsztali
{
    partial class AdminMainForm
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
            this.panelMenu = new System.Windows.Forms.Panel();
            this.panelHeader = new System.Windows.Forms.Panel();
            this.btnLogout = new System.Windows.Forms.Button();
            this.btnServices = new System.Windows.Forms.Button();
            this.btnAppointments = new System.Windows.Forms.Button();
            this.lblMenuTitle = new System.Windows.Forms.Label();
            this.btnStylists = new System.Windows.Forms.Button();
            this.lblHeader = new System.Windows.Forms.Label();
            this.panelHeader_ = new System.Windows.Forms.Panel();
            this.panelContent = new System.Windows.Forms.Panel();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.btnAddStylist = new System.Windows.Forms.Button();
            this.btnEditStylist = new System.Windows.Forms.Button();
            this.btnDeleteStylist = new System.Windows.Forms.Button();
            this.panelMenu.SuspendLayout();
            this.panelHeader_.SuspendLayout();
            this.panelContent.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // panelMenu
            // 
            this.panelMenu.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.panelMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(44)))), ((int)(((byte)(47)))), ((int)(((byte)(51)))));
            this.panelMenu.Controls.Add(this.panelHeader);
            this.panelMenu.Controls.Add(this.btnLogout);
            this.panelMenu.Controls.Add(this.btnServices);
            this.panelMenu.Controls.Add(this.btnAppointments);
            this.panelMenu.Location = new System.Drawing.Point(0, 0);
            this.panelMenu.Name = "panelMenu";
            this.panelMenu.Size = new System.Drawing.Size(220, 700);
            this.panelMenu.TabIndex = 1;
            // 
            // panelHeader
            // 
            this.panelHeader.BackColor = System.Drawing.Color.WhiteSmoke;
            this.panelHeader.Location = new System.Drawing.Point(220, 0);
            this.panelHeader.Name = "panelHeader";
            this.panelHeader.Size = new System.Drawing.Size(980, 60);
            this.panelHeader.TabIndex = 3;
            // 
            // btnLogout
            // 
            this.btnLogout.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(170)))), ((int)(((byte)(51)))), ((int)(((byte)(51)))));
            this.btnLogout.ForeColor = System.Drawing.Color.White;
            this.btnLogout.Location = new System.Drawing.Point(20, 600);
            this.btnLogout.Name = "btnLogout";
            this.btnLogout.Size = new System.Drawing.Size(180, 40);
            this.btnLogout.TabIndex = 2;
            this.btnLogout.Text = "Kijelentkezés";
            this.btnLogout.UseVisualStyleBackColor = false;
            // 
            // btnServices
            // 
            this.btnServices.Location = new System.Drawing.Point(20, 180);
            this.btnServices.Name = "btnServices";
            this.btnServices.Size = new System.Drawing.Size(180, 40);
            this.btnServices.TabIndex = 2;
            this.btnServices.Text = "Szolgáltatások";
            this.btnServices.UseVisualStyleBackColor = true;
            // 
            // btnAppointments
            // 
            this.btnAppointments.Location = new System.Drawing.Point(20, 130);
            this.btnAppointments.Name = "btnAppointments";
            this.btnAppointments.Size = new System.Drawing.Size(180, 40);
            this.btnAppointments.TabIndex = 2;
            this.btnAppointments.Text = "Időpontok";
            this.btnAppointments.UseVisualStyleBackColor = true;
            // 
            // lblMenuTitle
            // 
            this.lblMenuTitle.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(44)))), ((int)(((byte)(47)))), ((int)(((byte)(51)))));
            this.lblMenuTitle.Font = new System.Drawing.Font("Segoe UI", 14.25F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.lblMenuTitle.ForeColor = System.Drawing.Color.White;
            this.lblMenuTitle.Location = new System.Drawing.Point(40, 20);
            this.lblMenuTitle.Name = "lblMenuTitle";
            this.lblMenuTitle.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.lblMenuTitle.Size = new System.Drawing.Size(150, 30);
            this.lblMenuTitle.TabIndex = 0;
            this.lblMenuTitle.Text = "ADMIN";
            // 
            // btnStylists
            // 
            this.btnStylists.Location = new System.Drawing.Point(20, 80);
            this.btnStylists.Name = "btnStylists";
            this.btnStylists.Size = new System.Drawing.Size(180, 40);
            this.btnStylists.TabIndex = 2;
            this.btnStylists.Text = "Fodrászok";
            this.btnStylists.UseVisualStyleBackColor = true;
            // 
            // lblHeader
            // 
            this.lblHeader.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(44)))), ((int)(((byte)(47)))), ((int)(((byte)(51)))));
            this.lblHeader.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.lblHeader.ForeColor = System.Drawing.Color.White;
            this.lblHeader.Location = new System.Drawing.Point(-4, 0);
            this.lblHeader.Name = "lblHeader";
            this.lblHeader.Padding = new System.Windows.Forms.Padding(20, 0, 0, 0);
            this.lblHeader.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.lblHeader.Size = new System.Drawing.Size(500, 30);
            this.lblHeader.TabIndex = 0;
            this.lblHeader.Text = "Üdvözlünk az admin felületen";
            this.lblHeader.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // panelHeader_
            // 
            this.panelHeader_.BackColor = System.Drawing.Color.WhiteSmoke;
            this.panelHeader_.Controls.Add(this.lblHeader);
            this.panelHeader_.Location = new System.Drawing.Point(220, 0);
            this.panelHeader_.Name = "panelHeader_";
            this.panelHeader_.Size = new System.Drawing.Size(980, 60);
            this.panelHeader_.TabIndex = 3;
            // 
            // panelContent
            // 
            this.panelContent.BackColor = System.Drawing.Color.WhiteSmoke;
            this.panelContent.Controls.Add(this.btnDeleteStylist);
            this.panelContent.Controls.Add(this.btnEditStylist);
            this.panelContent.Controls.Add(this.btnAddStylist);
            this.panelContent.Controls.Add(this.dataGridView1);
            this.panelContent.Location = new System.Drawing.Point(220, 60);
            this.panelContent.Name = "panelContent";
            this.panelContent.Size = new System.Drawing.Size(980, 640);
            this.panelContent.TabIndex = 1;
            // 
            // dataGridView1
            // 
            this.dataGridView1.AllowUserToAddRows = false;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(20, 20);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.ReadOnly = true;
            this.dataGridView1.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridView1.Size = new System.Drawing.Size(940, 500);
            this.dataGridView1.TabIndex = 0;
            // 
            // btnAddStylist
            // 
            this.btnAddStylist.Location = new System.Drawing.Point(20, 540);
            this.btnAddStylist.Name = "btnAddStylist";
            this.btnAddStylist.Size = new System.Drawing.Size(120, 40);
            this.btnAddStylist.TabIndex = 1;
            this.btnAddStylist.Text = "Új fodrász";
            this.btnAddStylist.UseVisualStyleBackColor = true;
            // 
            // btnEditStylist
            // 
            this.btnEditStylist.Location = new System.Drawing.Point(160, 540);
            this.btnEditStylist.Name = "btnEditStylist";
            this.btnEditStylist.Size = new System.Drawing.Size(120, 40);
            this.btnEditStylist.TabIndex = 1;
            this.btnEditStylist.Text = "Szerkesztés";
            this.btnEditStylist.UseVisualStyleBackColor = true;
            // 
            // btnDeleteStylist
            // 
            this.btnDeleteStylist.Location = new System.Drawing.Point(300, 540);
            this.btnDeleteStylist.Name = "btnDeleteStylist";
            this.btnDeleteStylist.Size = new System.Drawing.Size(120, 40);
            this.btnDeleteStylist.TabIndex = 1;
            this.btnDeleteStylist.Text = "Törlés";
            this.btnDeleteStylist.UseVisualStyleBackColor = true;
            // 
            // AdminMainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1184, 661);
            this.Controls.Add(this.panelContent);
            this.Controls.Add(this.panelHeader_);
            this.Controls.Add(this.btnStylists);
            this.Controls.Add(this.lblMenuTitle);
            this.Controls.Add(this.panelMenu);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "AdminMainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Fodrászszalon – Admin felület";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.panelMenu.ResumeLayout(false);
            this.panelHeader_.ResumeLayout(false);
            this.panelContent.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelMenu;
        private System.Windows.Forms.Label lblMenuTitle;
        private System.Windows.Forms.Panel panelHeader;
        private System.Windows.Forms.Button btnLogout;
        private System.Windows.Forms.Button btnServices;
        private System.Windows.Forms.Button btnAppointments;
        private System.Windows.Forms.Button btnStylists;
        private System.Windows.Forms.Label lblHeader;
        private System.Windows.Forms.Panel panelHeader_;
        private System.Windows.Forms.Panel panelContent;
        private System.Windows.Forms.Button btnDeleteStylist;
        private System.Windows.Forms.Button btnEditStylist;
        private System.Windows.Forms.Button btnAddStylist;
        private System.Windows.Forms.DataGridView dataGridView1;
    }
}