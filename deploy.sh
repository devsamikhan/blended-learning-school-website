#!/bin/bash

# BLS School Management System - Automated Deployment Script
# Run this script on your server: bash deploy.sh

set -e

echo "=========================================="
echo "BLS School Management System Deployment"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Function to print status
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check required variables
check_domain() {
    read -p "Enter your domain (e.g., yourdomain.com): " DOMAIN
    if [ -z "$DOMAIN" ]; then
        print_error "Domain cannot be empty"
        exit 1
    fi
    print_status "Domain set to: $DOMAIN"
}

# Step 1: Check Docker installation
echo ""
echo "Step 1: Checking Docker installation..."
if command -v docker &> /dev/null; then
    print_status "Docker is installed: $(docker --version)"
else
    print_error "Docker not found. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    print_status "Docker installed"
fi

if command -v docker-compose &> /dev/null; then
    print_status "Docker Compose is installed: $(docker-compose --version)"
else
    print_warning "Docker Compose not found. Installing..."
    apt install -y docker-compose
    print_status "Docker Compose installed"
fi

# Step 2: Get domain information
echo ""
echo "Step 2: Domain Configuration"
check_domain

# Step 3: Verify project files
echo ""
echo "Step 3: Checking project files..."
REQUIRED_FILES=("Dockerfile" "docker-compose.yml" "nginx.conf" ".env.production.example")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "Found: $file"
    else
        print_error "Missing: $file"
        exit 1
    fi
done

# Step 4: Setup SSL directory
echo ""
echo "Step 4: Setting up SSL certificates..."
mkdir -p ssl

if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    print_warning "SSL certificates not found. Creating self-signed certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout ssl/key.pem -out ssl/cert.pem \
      -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN"
    print_status "Self-signed certificate created"
    print_warning "Remember to replace with Let's Encrypt certificate!"
else
    print_status "SSL certificates found"
fi

# Step 5: Environment configuration
echo ""
echo "Step 5: Configuring environment variables..."

if [ ! -f ".env.production" ]; then
    cp .env.production.example .env.production
    print_status "Created .env.production"
    
    # Generate secure passwords
    DB_PASSWORD=$(openssl rand -base64 32)
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update environment file
    sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=$DB_PASSWORD|g" .env.production
    sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|g" .env.production
    sed -i "s|yourdomain.com|$DOMAIN|g" .env.production
    sed -i "s|your_secure_password_here|$DB_PASSWORD|g" .env.production
    sed -i "s|your_jwt_secret_here|$JWT_SECRET|g" .env.production
    
    print_status "Environment variables configured"
    echo ""
    echo -e "${YELLOW}Generated credentials (SAVE THESE):${NC}"
    echo "DB_PASSWORD: $DB_PASSWORD"
    echo "JWT_SECRET: $JWT_SECRET"
    echo ""
else
    print_warning ".env.production already exists. Skipping configuration."
fi

# Step 6: Update nginx.conf with domain
echo ""
echo "Step 6: Updating Nginx configuration..."
sed -i "s|yourdomain.com|$DOMAIN|g" nginx.conf
sed -i "s|www.yourdomain.com|www.$DOMAIN|g" nginx.conf
print_status "Nginx configuration updated with domain: $DOMAIN"

# Step 7: Setup firewall
echo ""
echo "Step 7: Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw --force enable
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    print_status "Firewall configured"
else
    print_warning "UFW not found. Installing..."
    apt install -y ufw
    ufw --force enable
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    print_status "Firewall configured"
fi

# Step 8: Build and start application
echo ""
echo "Step 8: Building and starting application..."
print_warning "This may take a few minutes..."

docker-compose build
if docker-compose up -d; then
    print_status "Application started"
else
    print_error "Failed to start application"
    docker-compose logs
    exit 1
fi

# Wait for services to be ready
echo ""
print_warning "Waiting for services to be ready (30 seconds)..."
sleep 30

# Step 9: Verify deployment
echo ""
echo "Step 9: Verifying deployment..."

SERVICES=$(docker-compose ps --services)
echo "Running services:"
for service in $SERVICES; do
    if docker-compose ps $service | grep -q "running"; then
        print_status "$service is running"
    else
        print_error "$service is not running"
    fi
done

# Step 10: Show next steps
echo ""
echo "=========================================="
echo -e "${GREEN}Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Point your domain DNS to this server's IP"
echo "   Update A records: @ and www to $(hostname -I | awk '{print $1}')"
echo ""
echo "2. Setup Let's Encrypt certificate (recommended):"
echo "   Install certbot: apt install -y certbot"
echo "   Run: certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN"
echo "   Then link certificates:"
echo "   ln -s /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem"
echo "   ln -s /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem"
echo "   Restart: docker-compose restart nginx"
echo ""
echo "3. Access your application:"
echo "   https://$DOMAIN"
echo ""
echo "4. View logs:"
echo "   docker-compose logs -f"
echo ""
echo "5. For maintenance commands, see DEPLOYMENT.md"
echo ""
print_status "Deployment script completed successfully!"
