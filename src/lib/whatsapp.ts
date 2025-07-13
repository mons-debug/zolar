import twilio from 'twilio';

// Twilio WhatsApp message function
export async function sendWhatsAppMessage(phone: string): Promise<void> {
  // Check if Twilio credentials are available
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH;
  const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !whatsappFrom) {
    console.log('📱 Twilio credentials not configured, simulating WhatsApp message...');
    console.log(`📱 Would send WhatsApp to ${phone}: "Merci d'avoir rejoint la whitelist ZOLAR ! Reste à l'écoute pour le drop exclusif."`);
    return;
  }

  try {
    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Ensure phone number has proper format for WhatsApp
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '+212' + phone.substring(1);
    } else if (!phone.startsWith('+')) {
      formattedPhone = '+' + phone;
    }

    // Send WhatsApp message via Twilio
    const message = await client.messages.create({
      body: "Merci d'avoir rejoint la whitelist ZOLAR ! Reste à l'écoute pour le drop exclusif.",
      from: whatsappFrom, // Should be something like 'whatsapp:+14155238886'
      to: `whatsapp:${formattedPhone}`
    });

    console.log(`✅ WhatsApp message sent successfully to ${formattedPhone}`);
    console.log(`📧 Message SID: ${message.sid}`);
    
  } catch (error) {
    console.error('❌ Failed to send WhatsApp message:', error);
    throw new Error('Failed to send WhatsApp confirmation message');
  }
} 