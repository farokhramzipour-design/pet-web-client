# Deployment Guide

## 1. Build the Applications

Before deploying, you need to generate the static files for production.

```bash
# Build Client
cd client
npm install
npm run build

# Build Admin
cd ../admin
npm install
npm run build
```

This will create a `dist` folder in both `client` and `admin` directories.

## 2. Deploying to a VPS (Ubuntu + Nginx)

### Prerequisites
- A server (e.g., DigitalOcean, AWS EC2) running Ubuntu.
- A domain name (e.g., `yourdomain.com`).
- Nginx installed (`sudo apt update && sudo apt install nginx`).

### Steps

1. **Copy Files to Server**
   Upload the `dist` folders to your server. A common location is `/var/www/petwebapp`.
   
   Structure:
   ```
   /var/www/petwebapp/
   ├── client/
   │   └── dist/   <-- Client build files here
   └── admin/
       └── dist/   <-- Admin build files here
   ```

2. **Configure Nginx**
   - Copy the provided `nginx.conf` content to `/etc/nginx/sites-available/petwebapp`.
   - Edit the `server_name` directives to match your actual domains (e.g., `app.petwebapp.com` and `admin.petwebapp.com`).
   - Update the `proxy_pass` URL to point to your running backend API.

3. **Enable the Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/petwebapp /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl restart nginx
   ```

## 3. Deploying to Vercel / Netlify (Easier)

Since these are static React apps, this is the recommended approach.

### For Client App:
1. Create a new project in Vercel/Netlify.
2. Connect your Git repository.
3. **Root Directory**: `client`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   - If your backend is hosted elsewhere, you might need to configure a proxy or set the API URL in `.env`.

### For Admin App:
1. Create a **separate** project.
2. Connect the same Git repository.
3. **Root Directory**: `admin`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`

### Handling API Requests (Important)
In development, we used a proxy in `vite.config.js`. In production, this proxy doesn't exist.
You have two choices:

1. **Nginx Proxy (VPS)**: The `nginx.conf` handles this by forwarding `/api` to your backend.
2. **Direct URL (Vercel/Netlify)**:
   - You need to update `axios.js` to use the full URL of your backend (e.g., `https://api.yourdomain.com`).
   - Create a `.env.production` file in both `client` and `admin` folders.

   **client/.env.production**
   ```
   VITE_API_URL=https://api.yourdomain.com
   ```

   **Update `client/src/api/axios.js`**:
   ```javascript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api',
     // ...
   });
   ```
