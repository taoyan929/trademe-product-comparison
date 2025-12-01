#!/usr/bin/env node

const { program } = require('commander');
const { connectDB, disconnectDB } = require('./db');
const Auction = require('./models/Auction');
const auctionsData = require('../data/auctions.json');

program
  .name('auction-seeder')
  .description('CLI tool to seed and manage auction data in MongoDB')
  .version('1.0.0');

// Seed command
program
  .command('seed')
  .description('Seed the database with sample auction data')
  .action(async () => {
    try {
      await connectDB();

      // Check if data already exists
      const existingCount = await Auction.countDocuments();
      if (existingCount > 0) {
        console.log(`Database already contains ${existingCount} auction(s).`);
        console.log('Use "delete" command first if you want to reseed.');
        await disconnectDB();
        return;
      }

      // Insert seed data
      const result = await Auction.insertMany(auctionsData);
      console.log(`Successfully seeded ${result.length} auction items.`);

      await disconnectDB();
    } catch (error) {
      console.error('Error seeding database:', error.message);
      process.exit(1);
    }
  });

// Delete command
program
  .command('delete')
  .description('Delete all auction data from the database')
  .option('-f, --force', 'Skip confirmation')
  .action(async (options) => {
    try {
      await connectDB();

      const count = await Auction.countDocuments();
      if (count === 0) {
        console.log('Database is already empty.');
        await disconnectDB();
        return;
      }

      if (!options.force) {
        console.log(`About to delete ${count} auction(s).`);
        console.log('Use --force flag to confirm deletion.');
        await disconnectDB();
        return;
      }

      const result = await Auction.deleteMany({});
      console.log(`Successfully deleted ${result.deletedCount} auction(s).`);

      await disconnectDB();
    } catch (error) {
      console.error('Error deleting data:', error.message);
      process.exit(1);
    }
  });

// List command
program
  .command('list')
  .description('List all auctions in the database')
  .action(async () => {
    try {
      await connectDB();

      const auctions = await Auction.find({});

      if (auctions.length === 0) {
        console.log('No auctions found in database.');
        console.log('Run "seed" command to add sample data.');
      } else {
        console.log(`\nFound ${auctions.length} auction(s):\n`);
        auctions.forEach((auction, index) => {
          console.log(`${index + 1}. ${auction.title}`);
          console.log(`   Description: ${auction.description.substring(0, 60)}...`);
          console.log(`   Start Price: $${auction.start_price}`);
          console.log(`   Reserve Price: $${auction.reserve_price}`);
          console.log('');
        });
      }

      await disconnectDB();
    } catch (error) {
      console.error('Error listing auctions:', error.message);
      process.exit(1);
    }
  });

program.parse();
