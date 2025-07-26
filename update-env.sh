#!/bin/bash

echo "🔧 Setting up ZOLAR Landing Page Environment..."

# Backup current .env if it exists
if [ -f .env ]; then
  cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
  echo "✅ Backup created: .env.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Create comprehensive .env file
cat > .env << 'EOF'
# ==============================================
# ZOLAR LANDING PAGE - ENVIRONMENT CONFIGURATION
# ==============================================

# 🗄️ DATABASE CONFIGURATION
# Replace this MongoDB Atlas URL with your own:
DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/zolar_landing?retryWrites=true&w=majority"

# 📱 TWILIO WHATSAPP CONFIGURATION 
# Get these from: https://console.twilio.com
TWILIO_SID="your_twilio_account_sid_here"
TWILIO_AUTH="your_twilio_auth_token_here"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# 🌍 ENVIRONMENT
NODE_ENV=development

# ==============================================
# 📋 QUICK SETUP INSTRUCTIONS:
# 
# 1. MongoDB Atlas (Free 500MB):
#    - Go to: https://www.mongodb.com/atlas
#    - Create account → Create cluster → Get connection string
#    - Replace DATABASE_URL above
#
# 2. Twilio WhatsApp (Free trial credits):
#    - Go to: https://www.twilio.com
#    - Create account → Get WhatsApp sandbox → Get credentials
#    - Replace TWILIO_* values above
#
# 3. Test your setup:
#    - npm run dev
#    - Visit http://localhost:3000/api/whitelist (should show stats)
#    - Submit test email/phone on homepage
# ==============================================
EOF

echo "✅ .env file created successfully!"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Edit .env file and replace YOUR_USERNAME, YOUR_PASSWORD, YOUR_CLUSTER with real values"
echo "2. Get MongoDB Atlas connection string from: https://www.mongodb.com/atlas"
echo "3. Get Twilio credentials from: https://console.twilio.com"
echo "4. Run: npm run dev"
echo "5. Test at: http://localhost:3000"
echo ""
echo "💡 TIP: Your whitelist system now has automatic fallback to file storage!"
echo "📱 WhatsApp messages will be sent automatically when users sign up!" 