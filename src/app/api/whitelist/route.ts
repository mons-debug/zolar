import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

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
    
    // Check for existing entries (handle potential duplicates gracefully)
    try {
      const existingEntry = await prisma.whitelistEntry.findFirst({
        where: {
          OR: [
            email ? { email } : {},
            phone ? { phone } : {}
          ].filter(condition => Object.keys(condition).length > 0)
        }
      });
      
      if (existingEntry) {
        let message = 'Vous êtes déjà inscrit à la liste d\'attente !';
        if (existingEntry.email === email) {
          message = 'Cette adresse email est déjà inscrite à la liste d\'attente !';
        } else if (existingEntry.phone === phone) {
          message = 'Ce numéro WhatsApp est déjà inscrit à la liste d\'attente !';
        }
        
        return NextResponse.json(
          { error: message },
          { status: 409 }
        );
      }
    } catch (findError: any) {
      console.log('Find query error (continuing):', findError.message);
    }
    
    // Create new entry (handle MongoDB without transactions)
    try {
      const newEntry = await prisma.whitelistEntry.create({
        data: {
          email,
          phone
        }
      });
      
      console.log('✅ New whitelist entry created:', newEntry.id);
      
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
        { message: 'Merci ! Vous serez averti dès que la collection sera disponible.' },
        { status: 200 }
      );
      
    } catch (createError: any) {
      // Handle duplicate key error specifically
      if (createError.code === 'P2002' || createError.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Cette adresse est déjà inscrite à la liste d\'attente !' },
          { status: 409 }
        );
      }
      throw createError;
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error('Whitelist submission error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.whitelistEntry.count();
    const emailCount = await prisma.whitelistEntry.count({
      where: { email: { not: null } }
    });
    const phoneCount = await prisma.whitelistEntry.count({
      where: { phone: { not: null } }
    });
    
    return NextResponse.json(
      { 
        message: 'API de la liste d\'attente',
        stats: {
          total: count,
          email: emailCount,
          phone: phoneCount
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching whitelist stats:', error);
    return NextResponse.json(
      { message: 'API de la liste d\'attente' },
      { status: 200 }
    );
  }
} 