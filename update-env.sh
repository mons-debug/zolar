#!/bin/bash

echo "🔧 Updating .env file for ZOLAR Landing Page..."

# Backup current .env
cp .env .env.backup
echo "✅ Backup created: .env.backup"

# Create new .env file
cat > .env << 'EOF'
# Database Configuration for ZOLAR Landing Page

# OPTION 1: MongoDB Atlas (Cloud) - RECOMMENDED FOR PRODUCTION  
# Uncomment and replace with your actual Atlas connection string:
# DATABASE_URL="mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/zolar_landing?retryWrites=true&w=majority"

# OPTION 2: Local MongoDB (Current - has transaction limitations)
DATABASE_URL="mongodb://localhost:27017/zolar_landing"

# OPTION 3: File Storage (Currently working perfectly)
# No DATABASE_URL needed - uses data/whitelist.json
# Current API endpoint: /api/whitelist-test (working now)

# MongoDB Atlas Setup Instructions:
# 1. Go to https://www.mongodb.com/atlas
# 2. Create free account (500MB free tier)
# 3. Create cluster and database
# 4. Get connection string from "Connect" button
# 5. Replace DATABASE_URL above with your Atlas string
# 6. Change API endpoint back to /api/whitelist in src/app/page.tsx

# WhatsApp Configuration (Optional - for notifications)
TWILIO_SID=your_twilio_account_sid_here
TWILIO_AUTH=your_twilio_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Production Environment
NODE_ENV=development
EOF

echo "✅ .env file updated successfully!"
echo "📋 Review the new configuration and update your MongoDB Atlas URL when ready"
echo "🎯 Your email collection is still working perfectly with file storage!" 