# Deployment Guide for BLS School Management System

This guide covers deploying the BLS application to a self-hosted server with your domain.

## Prerequisites

- A VPS/dedicated server (Ubuntu 22.04 LTS recommended)
- Docker and Docker Compose installed
- Domain registered and pointing to your server's IP
- SSH access to your server
- SSL certificate (from Let's Encrypt - free)

---

## Step 1: Server Preparation

### 1.1 Connect to your server
```bash
ssh root@your_server_ip
```

### 1.2 Update system packages
```bash
apt update && apt upgrade -y
```

### 1.3 Install Docker and Docker Compose
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install -y docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 1.4 Create application directory
```bash
mkdir -p /app/blsschool
cd /app/blsschool
```

---

## Step 2: Upload Your Application

### 2.1 Clone or upload your project
```bash
# Option A: If using Git
git clone <your-repo-url> .

# Option B: Upload via SCP
scp -r ./project root@your_server_ip:/app/blsschool/
```

### 2.2 Verify necessary files exist
```bash
ls -la
# Should show: Dockerfile, docker-compose.yml, nginx.conf, etc.
```

---

## Step 3: SSL Certificate Setup

### 3.1 Install Certbot
```bash
apt install -y certbot python3-certbot-nginx
```

### 3.2 Create SSL directory
```bash
mkdir -p /app/blsschool/ssl
```

### 3.3 Generate self-signed certificate (temporary)
```bash
cd /app/blsschool/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=yourdomain.com"
```

### 3.4 Setup Let's Encrypt (recommended)
After your app is running, replace self-signed with Let's Encrypt:
```bash
# Stop the app first
cd /app/blsschool
docker-compose down

# Get certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Link certificates to ssl directory
ln -s /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
ln -s /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
```

---

## Step 4: Environment Configuration

### 4.1 Create .env file
```bash
cp .env.production.example .env.production
nano .env.production
```

### 4.2 Update configuration values
```env
# Generate secure JWT secret:
# openssl rand -base64 32

DB_USER=postgres
DB_PASSWORD=<generate-secure-password>
DB_NAME=blsschool
JWT_SECRET=<generate-with-openssl-above>
VITE_API_URL=https://yourdomain.com/api
NODE_ENV=production
PORT=3001
```

### 4.3 Generate secure password
```bash
openssl rand -base64 32
# Use the output for DB_PASSWORD and JWT_SECRET
```

---

## Step 5: Update Nginx Configuration

### 5.1 Edit nginx.conf with your domain
```bash
nano nginx.conf
```

### 5.2 Replace placeholder
Find this line:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

And replace with your actual domain:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

---

## Step 6: Update API URL in Frontend

### 6.1 Ensure frontend knows the API location
In your docker-compose.yml, make sure:
```yaml
VITE_API_URL: https://yourdomain.com/api
```

---

## Step 7: Build and Deploy

### 7.1 Build Docker image
```bash
docker-compose build
```

### 7.2 Start the application
```bash
docker-compose up -d
```

### 7.3 Verify services are running
```bash
docker-compose ps
# Should show: db, app, nginx all running

# Check logs
docker-compose logs -f app
```

### 7.4 Test the application
```bash
# Test health endpoint
curl https://yourdomain.com/health

# Check API
curl https://yourdomain.com/api/health
```

---

## Step 8: DNS Configuration

### 8.1 Point your domain to the server
In your domain registrar's DNS settings:
- Add A record: `@` → `your_server_ip`
- Add A record: `www` → `your_server_ip`

Wait 5-15 minutes for DNS propagation.

---

## Step 9: Certbot Auto-Renewal

### 9.1 Setup automatic renewal
```bash
systemctl enable certbot.timer
systemctl start certbot.timer

# Test renewal (dry-run)
certbot renew --dry-run
```

---

## Step 10: Firewall Configuration

### 10.1 Setup UFW (Ubuntu Firewall)
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## Troubleshooting

### Application won't start
```bash
# Check logs
docker-compose logs app

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database connection issues
```bash
# Check database logs
docker-compose logs db

# Verify network
docker network ls
```

### SSL certificate issues
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Renew certificate
certbot renew --force-renewal
```

### Port already in use
```bash
# Find process using port
lsof -i :443
lsof -i :80
```

---

## Maintenance

### Regular backups
```bash
# Backup database
docker-compose exec db pg_dump -U postgres blsschool > backup_$(date +%Y%m%d).sql

# Restore from backup
docker-compose exec -T db psql -U postgres blsschool < backup_20240420.sql
```

### Update application
```bash
cd /app/blsschool
git pull origin main
docker-compose build
docker-compose up -d
```

### Monitor logs
```bash
# View real-time logs
docker-compose logs -f

# View specific service
docker-compose logs -f app
```

---

## Production Checklist

- [ ] Domain registered and DNS configured
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Environment variables configured securely
- [ ] Database password is strong (32+ characters)
- [ ] JWT secret is secure (32+ characters)
- [ ] Firewall configured (UFW or similar)
- [ ] Backups scheduled
- [ ] Monitoring setup (optional: Datadog, New Relic)
- [ ] CDN configured (optional: Cloudflare)
- [ ] Email service configured (if needed)
- [ ] Application tested end-to-end

---

## Additional Resources

- Docker Documentation: https://docs.docker.com
- Docker Compose: https://docs.docker.com/compose
- Nginx: https://nginx.org
- Let's Encrypt: https://letsencrypt.org
- PostgreSQL: https://www.postgresql.org/docs

---

## Support

For issues or questions, refer to:
1. Application logs: `docker-compose logs`
2. Check environment variables: `cat .env.production`
3. Verify DNS: `nslookup yourdomain.com`
4. Test connectivity: `curl -I https://yourdomain.com`
