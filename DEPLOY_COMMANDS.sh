#!/bin/bash

# ==========================================
# DEPLOYMENT GUIDE FOR DEBIAN + NGINX
# ==========================================
# BASE URL: https://pet.gp24.ir
# We will configure the apps to talk directly to this URL.

# 1. PREPARE YOUR LOCAL PROJECT
# -----------------------------

# Build Client
cd client
echo "VITE_API_URL=https://pet.gp24.ir/api" > .env.production
npm install
npm run build
cd ..

# Build Admin
cd admin
echo "VITE_API_URL=https://pet.gp24.ir/api" > .env.production
npm install
npm run build
cd ..

# Build Landing Page
cd landing
npm install
npm run build
cd ..

# 2. UPLOAD FILES TO SERVER
# -------------------------
# Replace 'user@your-server-ip' with your actual server credentials.
# ssh user@your-server-ip "mkdir -p /var/www/petwebapp/client /var/www/petwebapp/admin /var/www/petwebapp/landing"
# scp -r client/dist/* user@your-server-ip:/var/www/petwebapp/client/
# scp -r admin/dist/* user@your-server-ip:/var/www/petwebapp/admin/
# scp -r landing/dist/* user@your-server-ip:/var/www/petwebapp/landing/


# ==========================================
# 3. SERVER CONFIGURATION (Run on Server)
# ==========================================
# SSH into your server: ssh user@your-server-ip

# A. Install Nginx
sudo apt update
sudo apt install -y nginx

# B. Create Nginx Configuration
sudo nano /etc/nginx/sites-available/petwebapp

# PASTE THE FOLLOWING CONTENT:
# ------------------------------------------
# # Landing Page (Main Domain)
# server {
#     listen 80;
#     server_name example.com www.example.com;  # <--- REPLACE WITH YOUR MAIN DOMAIN
#
#     root /var/www/petwebapp/landing;
#     index index.html;
#
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
# }
#
# # Client App (Subdomain)
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
# # Admin App (Subdomain)
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
sudo rm /etc/nginx/sites-enabled/default

# D. Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

# E. SSL (Recommended)
# sudo apt install -y certbot python3-certbot-nginx
# sudo certbot --nginx -d example.com -d www.example.com -d client.example.com -d admin.example.com
