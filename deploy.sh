#!/bin/bash
set -e

echo "Setting up Nginx..."
sudo cp /root/il/deployment/nginx/intimalustre.com /etc/nginx/sites-available/
sudo cp /root/il/deployment/nginx/admin.intimalustre.com /etc/nginx/sites-available/

# Link if not exists
if [ ! -L /etc/nginx/sites-enabled/intimalustre.com ]; then
    sudo ln -s /etc/nginx/sites-available/intimalustre.com /etc/nginx/sites-enabled/
fi

if [ ! -L /etc/nginx/sites-enabled/admin.intimalustre.com ]; then
    sudo ln -s /etc/nginx/sites-available/admin.intimalustre.com /etc/nginx/sites-enabled/
fi

echo "Testing Nginx configuration..."
sudo nginx -t

echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Nginx setup complete."

echo "Starting applications with PM2..."
pm2 start /root/il/ecosystem.config.js
pm2 save

echo "---------------------------------------------------"
echo "Deployment successful!"
echo "If you haven't set up SSL yet, run:"
echo "sudo certbot --nginx -d intimalustre.com -d www.intimalustre.com"
echo "sudo certbot --nginx -d admin.intimalustre.com"
echo "---------------------------------------------------"
