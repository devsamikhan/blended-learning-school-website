# Quick Deployment Guide

## 3-Step Deployment Process

### Step 1: Prepare Your Server
```bash
# SSH into your server
ssh root@your_server_ip

# Navigate to app directory
cd /app/blsschool

# Copy your project files here
# (use git clone or SCP)
```

### Step 2: Run Automated Deployment
```bash
# Download and run the deployment script
bash deploy.sh

# The script will:
# ✓ Install Docker & Docker Compose
# ✓ Setup SSL certificates
# ✓ Configure environment variables
# ✓ Build Docker containers
# ✓ Start the application
# ✓ Configure firewall
```

### Step 3: Setup Your Domain
1. Go to your domain registrar
2. Add/Update DNS records:
   - **A Record**: `@` → your server IP
   - **A Record**: `www` → your server IP
3. Wait 5-15 minutes for DNS propagation
4. Visit `https://yourdomain.com`

---

## File Descriptions

| File | Purpose |
|------|---------|
| `Dockerfile` | Container configuration for your app |
| `docker-compose.yml` | Orchestrates all services (DB, App, Nginx) |
| `nginx.conf` | Web server configuration & reverse proxy |
| `deploy.sh` | Automated deployment script |
| `.env.production.example` | Environment variables template |
| `DEPLOYMENT.md` | Detailed deployment documentation |

---

## What Gets Deployed

```
┌─────────────────────────────────┐
│     Your Domain (HTTPS)         │
│  yourdomain.com                 │
└──────────────┬──────────────────┘
               │
        ┌──────▼───────┐
        │ Nginx Proxy  │ (Port 80/443)
        │ (SSL/TLS)    │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │ Express.js   │ (Port 3001)
        │ Backend API  │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │ PostgreSQL   │ (Port 5432)
        │ Database     │
        └──────────────┘
```

---

## Security Features Included

✅ **HTTPS/SSL** - Uses Let's Encrypt (free)  
✅ **Firewall** - UFW configured to allow only SSH, HTTP, HTTPS  
✅ **Rate Limiting** - Nginx rate limiting per IP  
✅ **Security Headers** - HSTS, X-Frame-Options, etc.  
✅ **Environment Secrets** - Auto-generated secure passwords  
✅ **Database Security** - PostgreSQL with strong authentication  
✅ **Process Isolation** - Docker containers isolated  

---

## Verification Commands

```bash
# Check all services running
docker-compose ps

# View logs in real-time
docker-compose logs -f

# Test API endpoint
curl https://yourdomain.com/api/health

# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Monitor resource usage
docker stats
```

---

## Troubleshooting

### Site not accessible?
```bash
# Check DNS propagation
nslookup yourdomain.com

# Check if services running
docker-compose ps

# View error logs
docker-compose logs app
docker-compose logs nginx
```

### Database connection error?
```bash
# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db

# Verify environment variables
grep DATABASE_URL .env.production
```

### SSL certificate issues?
```bash
# Check certificate expiry
openssl x509 -in ssl/cert.pem -text -noout | grep "Not After"

# Replace with Let's Encrypt
certbot certonly --standalone -d yourdomain.com
ln -sf /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
ln -sf /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
docker-compose restart nginx
```

---

## Regular Maintenance

### Daily
- Monitor logs: `docker-compose logs`
- Check resource usage: `docker stats`

### Weekly
- Backup database: `docker-compose exec db pg_dump -U postgres blsschool > backup.sql`
- Check SSL expiry: `certbot certificates`

### Monthly
- Update system: `apt update && apt upgrade`
- Update containers: `docker-compose build --no-cache && docker-compose up -d`

---

## Server Specs Recommended

- **CPU**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 20GB+ (depends on data)
- **Bandwidth**: Unmetered or generous
- **OS**: Ubuntu 20.04 LTS or newer

### Budget Options
- **DigitalOcean**: $6/month (2GB RAM) - $24/month (4GB RAM)
- **Linode**: $5-6/month starter
- **AWS**: Free tier eligible for 12 months
- **Hetzner**: ~€3/month

---

## Support Resources

- **Docker Docs**: https://docs.docker.com
- **Nginx**: https://nginx.org/en/docs/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Ubuntu Server**: https://ubuntu.com/server/docs

---

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Port 80/443 already in use | `lsof -i :80` and kill the process |
| Container won't start | `docker-compose logs` to see why |
| Database permissions | Run `docker-compose exec db psql` to check |
| SSL certificate error | Ensure `/ssl/cert.pem` and `/ssl/key.pem` exist |
| DNS not resolving | Wait 15-30 minutes, check registrar settings |
| Out of disk space | `docker system prune` to clean up |

---

## You're All Set! 🎉

Your application is now ready for production. Access it at:
```
https://yourdomain.com
```

For detailed documentation, see `DEPLOYMENT.md`
