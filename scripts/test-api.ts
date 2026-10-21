// Simple API test script - run with: npm run test-api
// Requires dev server to be running on port 3000

const BASE_URL = "http://localhost:3000";

async function testAPI(endpoint: string, description: string) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`   GET ${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const data = await response.json();
    
    if (!response.ok) {
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
      console.log(`   Response:`, data);
      return false;
    }
    
    console.log(`   ✅ Success: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(data, null, 2).split('\n').slice(0, 15).join('\n'));
    if (JSON.stringify(data, null, 2).split('\n').length > 15) {
      console.log(`   ... (truncated)`);
    }
    return true;
  } catch (error) {
    console.log(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return false;
  }
}

async function runTests() {
  console.log("🚀 Starting API Tests");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const tests = [
    { endpoint: "/api/db-test", description: "Database connection" },
    { endpoint: "/api/products", description: "All products" },
    { endpoint: "/api/products?category=Skincare", description: "Products by category" },
    { endpoint: "/api/products?featured=true", description: "Featured products" },
    { endpoint: "/api/products/essential-cleanser", description: "Single product by slug" },
    { endpoint: "/api/categories", description: "All categories" },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testAPI(test.endpoint, test.description);
    if (result) passed++;
    else failed++;
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log("✨ All tests passed!\n");
  } else {
    console.log("⚠️  Some tests failed. Make sure the dev server is running on port 3000.\n");
    process.exit(1);
  }
}

runTests();
