#!/bin/bash

# ==========================================
# DEPLOYMENT GUIDE FOR DEBIAN + NGINX
# ==========================================

# 1. PREPARE YOUR LOCAL PROJECT
# -----------------------------
# Run these commands on your LOCAL machine to build the apps.

# Build Client
cd client
echo "VITE_API_URL=https://api.example.com" > .env.production # REPLACE with your actual API URL
npm install
npm run build
cd ..

# Build Admin
cd admin
echo "VITE_API_URL=https://api.example.com" > .env.production # REPLACE with your actual API URL
npm install
npm run build
cd ..

# 2. UPLOAD FILES TO SERVER
# -------------------------
# Replace 'user@your-server-ip' with your actual server credentials.
# We will upload the 'dist' folders.

# ssh user@your-server-ip "mkdir -p /var/www/petwebapp/client /var/www/petwebapp/admin"
# scp -r client/dist/* user@your-server-ip:/var/www/petwebapp/client/
# scp -r admin/dist/* user@your-server-ip:/var/www/petwebapp/admin/


# ==========================================
# 3. SERVER CONFIGURATION (Run on Server)
# ==========================================
# SSH into your server: ssh user@your-server-ip

# A. Install Nginx (if not installed)
sudo apt update
sudo apt install -y nginx

# B. Create Nginx Configuration
# We will create a single file handling both domains.

sudo nano /etc/nginx/sites-available/petwebapp

# PASTE THE FOLLOWING CONTENT INTO THE FILE:
# ------------------------------------------
# server {
#     listen 80;
#     server_name client.example.com;  # <--- REPLACE WITH YOUR CLIENT DOMAIN
#
#     root /var/www/petwebapp/client;
#     index index.html;
#
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
# }
#
# server {
#     listen 80;
#     server_name admin.example.com;   # <--- REPLACE WITH YOUR ADMIN DOMAIN
#
#     root /var/www/petwebapp/admin;
#     index index.html;
#
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
# }
# ------------------------------------------

# C. Enable the Site
sudo ln -s /etc/nginx/sites-available/petwebapp /etc/nginx/sites-enabled/

# D. Remove Default Site (Optional, avoids conflicts)
sudo rm /etc/nginx/sites-enabled/default

# E. Test and Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

# ==========================================
# 4. SSL CERTIFICATES (HTTPS) - Highly Recommended
# ==========================================
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificates for both domains
sudo certbot --nginx -d client.example.com -d admin.example.com

# Follow the prompts. Certbot will automatically update your Nginx config for HTTPS.
