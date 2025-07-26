import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { fileStorage } from '@/lib/file-storage';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Clean and validate the input
    const cleanedData = {
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || ''
    };
    
    const validatedData = whitelistSchema.parse(cleanedData);
    
    // Convert empty strings to null for database
    const email = validatedData.email && validatedData.email.length > 0 ? validatedData.email : null;
    const phone = validatedData.phone && validatedData.phone.length > 0 ? validatedData.phone : null;
    
    // Fast check: Use file storage directly (MongoDB fallback is too slow)
    console.log('🚀 Using fast file storage for instant response');
    
    // Check file storage for duplicates (instant)
    try {
      const fileEntries = await fileStorage.findFirst({
        OR: [
          email ? { email } : {},
          phone ? { phone } : {}
        ].filter(condition => Object.keys(condition).length > 0)
      });
      
      if (fileEntries) {
        let message = 'Vous êtes déjà inscrit à la liste d\'attente !';
        if (fileEntries.email === email) {
          message = 'Cette adresse email est déjà inscrite à la liste d\'attente !';
        } else if (fileEntries.phone === phone) {
          message = 'Ce numéro WhatsApp est déjà inscrit à la liste d\'attente !';
        }
        
        return NextResponse.json(
          { error: message },
          { status: 409 }
        );
      }
    } catch (fileError) {
      console.log('File storage duplicate check failed, continuing with creation');
    }
    
        // Use file storage directly for instant response (no MongoDB timeout)
    try {
      const newEntry = await fileStorage.create({ 
        email: email || undefined, 
        phone: phone || undefined 
      });
      
      console.log('✅ File storage entry created:', newEntry.id);
      console.log('📧 Email:', newEntry.email || 'None');
      console.log('📱 Phone:', newEntry.phone || 'None');
      
      // Send WhatsApp message if phone number is provided
      if (phone) {
        try {
          await sendWhatsAppMessage(phone);
          console.log('📱 WhatsApp message sent successfully');
        } catch (error) {
          console.error('Failed to send WhatsApp message:', error);
          // Don't fail the request if WhatsApp fails
        }
      }
      
      return NextResponse.json(
        { 
          message: 'Merci ! Vous serez averti dès que la collection sera disponible.',
          id: newEntry.id,
          storage: 'File Storage (Fast)'
        },
        { status: 200 }
      );
      
    } catch (fileError) {
      const fileErr = fileError as Error;
      console.error('File storage failed:', fileErr.message);
      
      // Handle file storage duplicate error specifically
      if (fileErr.message === 'Entry already exists') {
        return NextResponse.json(
          { error: 'Cette adresse est déjà inscrite à la liste d\'attente !' },
          { status: 409 }
        );
      }
      
      // For other file storage errors
      throw fileError;
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    const err = error as Error;
    console.error('Whitelist submission error:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Use file storage directly for instant response
    console.log('🚀 Using fast file storage for instant stats');
    
    const total = await fileStorage.count();
    const emailCount = await fileStorage.count({ email: { not: null } });
    const phoneCount = await fileStorage.count({ phone: { not: null } });
    
    return NextResponse.json(
      { 
        message: 'API de la liste d\'attente (File Storage)',
        stats: {
          total,
          email: emailCount,
          phone: phoneCount
        },
        storage: 'File Storage (Fast)',
        note: 'Using instant file storage for better performance'
      },
      { status: 200 }
    );
  } catch (fileError) {
    console.error('File storage failed:', fileError);
    return NextResponse.json(
      { 
        message: 'API de la liste d\'attente',
        error: 'File storage unavailable',
        storage: 'None'
      },
      { status: 500 }
    );
  }
} 