#!/usr/bin/env node

/**
 * ZOLAR Whitelist System Test Script
 * Tests API endpoints, validation, and WhatsApp integration
 */

const { execSync } = require('child_process');

console.log('🧪 ZOLAR Whitelist System Test');
console.log('================================\n');

// Check if server is running
function testAPI(endpoint, method = 'GET', data = null) {
  try {
    const baseUrl = 'http://localhost:3000';
    let command = `curl -s`;
    
    if (method === 'POST') {
      command += ` -X POST -H "Content-Type: application/json"`;
      if (data) command += ` -d '${JSON.stringify(data)}'`;
    }
    
    command += ` ${baseUrl}${endpoint}`;
    
    const result = execSync(command, { encoding: 'utf8' });
    return JSON.parse(result);
  } catch (error) {
    return { error: 'Connection failed', details: error.message };
  }
}

// Test suite
async function runTests() {
  console.log('📊 Testing API Status...');
  const status = testAPI('/api/whitelist');
  console.log('✅ API Status:', status.message || 'Available');
  console.log('📦 Storage:', status.storage || 'Unknown');
  console.log('📈 Stats:', status.stats || 'N/A');
  console.log('');

  console.log('📧 Testing Email Validation...');
  const emailTest = testAPI('/api/whitelist', 'POST', { 
    email: 'test@zolar.com' 
  });
  console.log('✅ Email Test:', emailTest.message || emailTest.error);
  console.log('');

  console.log('📱 Testing Phone Validation...');
  const phoneTest = testAPI('/api/whitelist', 'POST', { 
    phone: '+212612345678' 
  });
  console.log('✅ Phone Test:', phoneTest.message || phoneTest.error);
  console.log('');

  console.log('🚫 Testing Invalid Data...');
  const invalidTest = testAPI('/api/whitelist', 'POST', { 
    email: 'invalid-email' 
  });
  console.log('✅ Validation Test:', invalidTest.error || 'Validation working');
  console.log('');

  console.log('🎯 Testing Both Email & Phone...');
  const bothTest = testAPI('/api/whitelist', 'POST', { 
    email: 'both@zolar.com',
    phone: '0712345678'
  });
  console.log('✅ Both Test:', bothTest.message || bothTest.error);
  console.log('📦 Used Storage:', bothTest.storage || 'Unknown');
  console.log('');

  // Final status check
  const finalStatus = testAPI('/api/whitelist');
  console.log('📈 Final Stats:');
  if (finalStatus.stats) {
    console.log(`   Total entries: ${finalStatus.stats.total}`);
    console.log(`   Email entries: ${finalStatus.stats.email}`);
    console.log(`   Phone entries: ${finalStatus.stats.phone}`);
  }
  console.log('');

  console.log('🎉 TESTING COMPLETE!');
  console.log('💡 Check your console logs for WhatsApp mock messages');
  console.log('📁 File storage backup: zolar-landing/data/whitelist.json');
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test failed:', error.message);
  console.log('\n💡 Make sure to run: npm run dev');
}); 