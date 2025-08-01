import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Phone number validation for Morocco format
const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;

// Schema for validation
const whitelistSchema = z.object({
  email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }).optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, { message: 'Veuillez entrer un numéro de téléphone valide (+212 ou 0)' }).optional().or(z.literal(''))
}).refine((data) => {
  // At least one field must be provided
  return (data.email && data.email.length > 0) || (data.phone && data.phone.length > 0);
}, {
  message: 'Veuillez fournir soit une adresse email soit un numéro WhatsApp'
});

// Types for Brevo API
interface BrevoContactData {
  email?: string;
  attributes: {
    WHATSAPP?: string;
    SMS?: string;
    SOURCE: string;
    SIGNUP_DATE: string;
    LANGUAGE: string;
  };
  listIds: number[];
  updateEnabled: boolean;
}

interface BrevoUpdateData {
  attributes: {
    WHATSAPP?: string;
    SMS?: string;
    SOURCE: string;
    SIGNUP_DATE: string;
    LANGUAGE: string;
  };
  listIds: number[];
}

interface BrevoResponse {
  id?: string | number;
}

interface BrevoListResponse {
  name: string;
  totalSubscribers: number;
}

interface BrevoError {
  message?: string;
  code?: string;
}

// Format phone number to international format
function formatPhoneNumber(phone: string): string {
  if (phone.startsWith('0')) {
    return '+212' + phone.substring(1);
  }
  return phone;
}

// Create or update contact in Brevo
async function createBrevoContact(contactData: BrevoContactData): Promise<BrevoResponse> {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY || ''
    },
    body: JSON.stringify(contactData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null) as BrevoError | null;
    throw new Error(`Brevo API Error: ${response.status} - ${errorData?.message || response.statusText}`);
  }

  return await response.json() as BrevoResponse;
}

// Update existing contact in Brevo
async function updateBrevoContact(email: string, updateData: BrevoUpdateData): Promise<BrevoResponse> {
  const response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY || ''
    },
    body: JSON.stringify(updateData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null) as BrevoError | null;
    throw new Error(`Brevo Update Error: ${response.status} - ${errorData?.message || response.statusText}`);
  }

  return await response.json() as BrevoResponse;
}

// Get list information from Brevo
async function getBrevoList(listId: number): Promise<BrevoListResponse> {
  const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY || ''
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null) as BrevoError | null;
    throw new Error(`Brevo List Error: ${response.status} - ${errorData?.message || response.statusText}`);
  }

  return await response.json() as BrevoListResponse;
}

// Send auto-reply email using Brevo's transactional email API
async function sendAutoReplyEmail(email: string): Promise<void> {
  try {
    const emailData = {
      sender: { email: 'no-reply@zolar.com', name: 'Équipe Zolar' },
      to: [{ email: email }],
      subject: 'Bienvenue dans la liste d\'attente Zolar ! 🌟',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Bienvenue chez Zolar ! ✨</h1>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Bonjour,</p>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Merci de vous être inscrit(e) à notre liste d'attente ! Vous faites désormais partie de la communauté exclusive Zolar.
            </p>
            
            <div style="background-color: #f1f3f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Ce qui vous attend :</h3>
              <ul style="color: #555; font-size: 14px;">
                <li>🎯 Accès prioritaire aux nouvelles collections</li>
                <li>💎 Offres exclusives réservées aux membres</li>
                <li>📱 Notifications en avant-première sur WhatsApp</li>
                <li>🎁 Surprises et cadeaux spéciaux</li>
              </ul>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Nous vous tiendrons informé(e) dès que notre prochaine collection sera disponible. Restez connecté(e) !
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Suivez-nous sur Instagram
              </a>
            </div>
            
            <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">
              Équipe Zolar - Mode Authentique Marocaine<br>
              Si vous ne souhaitez plus recevoir nos emails, <a href="#" style="color: #888;">cliquez ici</a>
            </p>
          </div>
        </div>
      `
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Email API Error: ${response.status}`);
    }

    console.log('✅ Auto-reply email sent successfully');
    await response.json();
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error);
    // Don't fail the main request if email fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate environment variables
    if (!process.env.BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Configuration du service email manquante. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Clean and validate the input
    const cleanedData = {
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || ''
    };
    
    const validatedData = whitelistSchema.parse(cleanedData);
    
    // Prepare data for Brevo
    const email = validatedData.email && validatedData.email.length > 0 ? validatedData.email : null;
    const phone = validatedData.phone && validatedData.phone.length > 0 ? formatPhoneNumber(validatedData.phone) : null;
    
    console.log('📧 Processing whitelist request:');
    console.log('   Email:', email || 'None');
    console.log('   Phone:', phone || 'None');
    
    // Prepare contact data
    const contactData: BrevoContactData = {
      updateEnabled: true, // Update if contact already exists
      attributes: {
        SOURCE: 'Zolar Landing Page',
        SIGNUP_DATE: new Date().toISOString().split('T')[0],
        LANGUAGE: 'FR'
      },
      listIds: [parseInt(process.env.BREVO_LIST_ID || '2')]
    };

    // Add email if provided
    if (email) {
      contactData.email = email;
    }

    // Add phone as custom attribute if provided
    if (phone) {
      contactData.attributes.WHATSAPP = phone;
      contactData.attributes.SMS = phone; // Also add as SMS for backup
    }

    try {
      // Create or update contact in Brevo
      const result = await createBrevoContact(contactData);
      console.log('✅ Contact successfully added to Brevo');

      // Send auto-reply email if email is provided
      if (email) {
        await sendAutoReplyEmail(email);
      }

      return NextResponse.json(
        { 
          message: 'Merci ! Vous serez averti dès que la collection sera disponible.',
          brevoContactId: result.id || 'created',
          services: {
            brevo: 'Ajouté à la liste d\'attente',
            email: email ? 'Email de confirmation envoyé' : 'Non fourni',
            whatsapp: phone ? 'Numéro WhatsApp enregistré' : 'Non fourni'
          }
        },
        { status: 200 }
      );

    } catch (brevoError: unknown) {
      const error = brevoError as Error;
      console.error('❌ Brevo API Error:', error);
      
      // Handle duplicate contact (this is usually OK)
      if (error.message?.includes('400') || error.message?.includes('duplicate')) {
        console.log('ℹ️  Contact already exists in Brevo, updating...');
        
        // Try to update the existing contact
        try {
          if (email) {
            await updateBrevoContact(email, {
              attributes: contactData.attributes,
              listIds: contactData.listIds
            });
          }
          
          return NextResponse.json(
            { 
              message: 'Vous êtes déjà inscrit ! Vos informations ont été mises à jour.',
              status: 'updated'
            },
            { status: 200 }
          );
        } catch (updateError) {
          console.error('❌ Failed to update existing contact:', updateError);
        }
      }

      // For other Brevo errors, return user-friendly message
      return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' },
        { status: 500 }
      );
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    const err = error as Error;
    console.error('❌ Whitelist submission error:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Validate environment variables
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { 
          message: 'API de la liste d\'attente Zolar (Brevo)',
          error: 'BREVO_API_KEY not configured',
          status: 'error'
        },
        { status: 500 }
      );
    }
    
    try {
      const listId = parseInt(process.env.BREVO_LIST_ID || '2');
      const listInfo = await getBrevoList(listId);
      
      return NextResponse.json(
        { 
          message: 'API de la liste d\'attente Zolar (Brevo)',
          service: 'Brevo (Sendinblue)',
          stats: {
            listId: listId,
            totalContacts: listInfo.totalSubscribers || 0,
            listName: listInfo.name || 'Liste d\'attente Zolar'
          },
          status: 'active',
          lastUpdated: new Date().toISOString()
        },
        { status: 200 }
      );
    } catch (brevoError) {
      console.error('❌ Brevo API Error (GET):', brevoError);
      return NextResponse.json(
        { 
          message: 'API de la liste d\'attente Zolar (Brevo)',
          service: 'Brevo (Sendinblue)',
          error: 'Unable to fetch list statistics',
          status: 'error'
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('❌ API GET error:', error);
    return NextResponse.json(
      { 
        message: 'API de la liste d\'attente Zolar',
        error: 'Service unavailable',
        status: 'error'
      },
      { status: 500 }
    );
  }
} 