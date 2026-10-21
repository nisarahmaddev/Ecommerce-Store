/**
 * Cleanup script for test orders
 * 
 * Removes orders with testOrder flag or @test.example/@example.com emails
 * Safe to run - only removes clearly marked test data
 */

import { getDb, closeDatabaseConnection } from '../lib/db.js';

async function cleanupTestOrders() {
  console.log('\n🧹 Cleaning up test orders from database\n');

  try {
    const db = await getDb();
    const ordersCollection = db.collection('orders');

    // Count test orders before deletion
    const testOrderCount = await ordersCollection.countDocuments({
      $or: [
        { testOrder: true },
        { customerEmail: { $regex: '@test\\.example', $options: 'i' } },
        { customerEmail: { $regex: '@example\\.com', $options: 'i' } },
      ],
    });

    if (testOrderCount === 0) {
      console.log('✓ No test orders found. Database is clean.');
      await closeDatabaseConnection();
      process.exit(0);
    }

    console.log(`Found ${testOrderCount} test order(s) to remove.\n`);

    // Show sample of orders to be deleted
    const samples = await ordersCollection
      .find({
        $or: [
          { testOrder: true },
          { customerEmail: { $regex: '@test\\.example', $options: 'i' } },
          { customerEmail: { $regex: '@example\\.com', $options: 'i' } },
        ],
      })
      .limit(5)
      .toArray();

    console.log('Sample orders to be deleted:');
    samples.forEach((order: any) => {
      console.log(`  - ${order.orderReference} (${order.customerEmail})`);
    });

    if (testOrderCount > 5) {
      console.log(`  ... and ${testOrderCount - 5} more`);
    }

    console.log('\n⚠️  This will permanently delete these orders.');
    console.log('Press Ctrl+C to cancel, or wait 3 seconds to proceed...\n');

    // Wait 3 seconds before deletion
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete test orders
    const result = await ordersCollection.deleteMany({
      $or: [
        { testOrder: true },
        { customerEmail: { $regex: '@test\\.example', $options: 'i' } },
        { customerEmail: { $regex: '@example\\.com', $options: 'i' } },
      ],
    });

    console.log(`✓ Deleted ${result.deletedCount} test order(s).`);
    console.log('✓ Database cleanup complete.\n');

    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    await closeDatabaseConnection();
    process.exit(1);
  }
}

cleanupTestOrders();
