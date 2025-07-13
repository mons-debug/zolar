import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'whitelist.json');

interface WhitelistEntry {
  id: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read entries from file
async function readEntries(): Promise<WhitelistEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write entries to file
async function writeEntries(entries: WhitelistEntry[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

// Generate simple ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const fileStorage = {
  async create(data: { email?: string; phone?: string }): Promise<WhitelistEntry> {
    const entries = await readEntries();
    
    // Check for duplicates
    const exists = entries.find(entry => 
      (data.email && entry.email === data.email) ||
      (data.phone && entry.phone === data.phone)
    );
    
    if (exists) {
      throw new Error('Entry already exists');
    }
    
    const newEntry: WhitelistEntry = {
      id: generateId(),
      email: data.email || undefined,
      phone: data.phone || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    entries.push(newEntry);
    await writeEntries(entries);
    
    return newEntry;
  },

  async findFirst(where: { OR?: Array<{ email?: string; phone?: string }> }): Promise<WhitelistEntry | null> {
    const entries = await readEntries();
    
    if (where.OR) {
      for (const condition of where.OR) {
        const found = entries.find(entry => 
          (condition.email && entry.email === condition.email) ||
          (condition.phone && entry.phone === condition.phone)
        );
        if (found) return found;
      }
    }
    
    return null;
  },

  async count(where?: { email?: { not: null } } | { phone?: { not: null } }): Promise<number> {
    const entries = await readEntries();
    
    if (!where) return entries.length;
    
    if ('email' in where && where.email?.not === null) {
      return entries.filter(entry => entry.email).length;
    }
    
    if ('phone' in where && where.phone?.not === null) {
      return entries.filter(entry => entry.phone).length;
    }
    
    return entries.length;
  }
}; 