/**
 * Test script for Orders API
 * 
 * Tests order creation with various validation scenarios
 * Uses clearly fake test data with @test.example emails
 */

const API_BASE = 'http://localhost:3000';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function logTest(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  const icon = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${icon}\x1b[0m ${name}: ${message}`);
}

async function runTests() {
  console.log('\n🧪 Testing Orders API\n');
  console.log('📝 Using test data with @test.example emails for easy cleanup\n');

  // ========================================
  // Test 1: Valid order creation
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 2,
            selectedSize: 'M',
          },
        ],
        idempotencyKey: `test-${Date.now()}-1`,
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success && result.orderReference) {
      logTest(
        'Valid order creation',
        true,
        `Order created: ${result.orderReference}`
      );
    } else {
      logTest(
        'Valid order creation',
        false,
        `Expected success but got: ${JSON.stringify(result)}`
      );
    }
  } catch (error) {
    logTest('Valid order creation', false, `Error: ${error}`);
  }

  // ========================================
  // Test 2: Empty cart rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('empty')) {
      logTest('Empty cart rejection', true, 'Correctly rejected empty cart');
    } else {
      logTest('Empty cart rejection', false, 'Should reject empty cart');
    }
  } catch (error) {
    logTest('Empty cart rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 3: Invalid quantity rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: -1, // Invalid
          },
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('quantity')) {
      logTest('Invalid quantity rejection', true, 'Correctly rejected negative quantity');
    } else {
      logTest('Invalid quantity rejection', false, 'Should reject invalid quantity');
    }
  } catch (error) {
    logTest('Invalid quantity rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 4: Non-integer quantity rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 2.5, // Invalid - not integer
          },
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('quantity')) {
      logTest('Non-integer quantity rejection', true, 'Correctly rejected decimal quantity');
    } else {
      logTest('Non-integer quantity rejection', false, 'Should reject non-integer quantity');
    }
  } catch (error) {
    logTest('Non-integer quantity rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 5: Unavailable product rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: 'nonexistent-product-id',
            productSlug: 'nonexistent-product',
            quantity: 1,
          },
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('available')) {
      logTest('Unavailable product rejection', true, 'Correctly rejected nonexistent product');
    } else {
      logTest('Unavailable product rejection', false, 'Should reject unavailable product');
    }
  } catch (error) {
    logTest('Unavailable product rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 6: Invalid email rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'invalid-email',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 1,
          },
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('email')) {
      logTest('Invalid email rejection', true, 'Correctly rejected invalid email');
    } else {
      logTest('Invalid email rejection', false, 'Should reject invalid email');
    }
  } catch (error) {
    logTest('Invalid email rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 7: Invalid ZIP code rejection
  // ========================================
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.user@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: 'INVALID',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 1,
          },
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok && result.message?.includes('ZIP')) {
      logTest('Invalid ZIP code rejection', true, 'Correctly rejected invalid ZIP');
    } else {
      logTest('Invalid ZIP code rejection', false, 'Should reject invalid ZIP code');
    }
  } catch (error) {
    logTest('Invalid ZIP code rejection', false, `Error: ${error}`);
  }

  // ========================================
  // Test 8: Idempotency check
  // ========================================
  try {
    const idempotencyKey = `test-idempotency-${Date.now()}`;
    
    // First request
    const response1 = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.idempotency@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 1,
          },
        ],
        idempotencyKey,
      }),
    });

    const result1 = await response1.json();

    // Second request with same idempotency key
    const response2 = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'test.idempotency@test.example',
        customerPhone: '(555) 123-4567',
        shippingFirstName: 'Test',
        shippingLastName: 'User',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'CA',
        shippingZipCode: '12345',
        items: [
          {
            productId: '2',
            productSlug: 'organic-linen-shirt',
            quantity: 1,
          },
        ],
        idempotencyKey,
      }),
    });

    const result2 = await response2.json();

    if (
      response1.ok &&
      response2.ok &&
      result1.orderReference === result2.orderReference
    ) {
      logTest(
        'Idempotency check',
        true,
        `Same order reference returned: ${result1.orderReference}`
      );
    } else {
      logTest('Idempotency check', false, 'Should return same order for same idempotency key');
    }
  } catch (error) {
    logTest('Idempotency check', false, `Error: ${error}`);
  }

  // ========================================
  // Summary
  // ========================================
  console.log('\n' + '='.repeat(60));
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const color = passed === total ? '\x1b[32m' : '\x1b[33m';
  console.log(`${color}${passed}/${total} tests passed\x1b[0m`);
  
  if (passed < total) {
    console.log('\nFailed tests:');
    results
      .filter(r => !r.passed)
      .forEach(r => console.log(`  - ${r.name}: ${r.message}`));
  }

  console.log('\n📋 Test Data Cleanup Instructions:');
  console.log('   To remove test orders from MongoDB:');
  console.log('   db.orders.deleteMany({ testOrder: true })');
  console.log('   or');
  console.log('   db.orders.deleteMany({ customerEmail: { $regex: "@test.example" } })');
  console.log('');

  process.exit(passed === total ? 0 : 1);
}

// Check if dev server is running
console.log('Checking if dev server is running...');
fetch(`${API_BASE}/api/db-test`)
  .then(() => {
    console.log('✓ Dev server is running\n');
    runTests();
  })
  .catch(() => {
    console.error('\x1b[31m✗ Dev server is not running\x1b[0m');
    console.error('Please start the dev server with: npm run dev');
    process.exit(1);
  });
