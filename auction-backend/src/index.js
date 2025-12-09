#!/usr/bin/env node

require('dotenv').config();
const { program } = require('commander');
const { connectDB, disconnectDB } = require('./db');
const Auction = require('./models/Auction');
const User = require('./models/User');
const auctionsData = require('../data/auctions.json');
const usersData = require('../data/users.json');

program
  .name('auction-seeder')
  .description('CLI tool to seed and manage auction data in MongoDB')
  .version('1.0.0');

// Seed command
program
  .command('seed')
  .description('Seed the database with sample auction and user data')
  .action(async () => {
    try {
      await connectDB();

      // Check if data already exists
      const existingAuctionCount = await Auction.countDocuments();
      const existingUserCount = await User.countDocuments();

      if (existingAuctionCount > 0 || existingUserCount > 0) {
        console.log(`Database already contains ${existingUserCount} user(s) and ${existingAuctionCount} auction(s).`);
        console.log('Use "delete" command first if you want to reseed.');
        await disconnectDB();
        return;
      }

      // Insert users first
      console.log('Seeding users...');
      const users = await User.insertMany(usersData);
      console.log(`✓ Created ${users.length} users`);

      // Create a map of username to user ID
      const userMap = {};
      users.forEach(user => {
        userMap[user.username] = user._id;
      });

      // Transform auction data
      console.log('Seeding auctions...');
      const transformedAuctions = auctionsData.map(auction => {
        const { seller_username, end_date_days_from_now, current_bid, ...rest } = auction;

        // Calculate dates
        const start_date = new Date();
        const end_date = new Date();
        end_date.setDate(end_date.getDate() + end_date_days_from_now);

        // Get seller ID
        const seller_id = userMap[seller_username];
        if (!seller_id) {
          throw new Error(`Seller '${seller_username}' not found in users data`);
        }

        // Calculate reserve_met
        const reserve_met = current_bid ? current_bid >= rest.reserve_price : false;

        return {
          ...rest,
          seller_id,
          start_date,
          end_date,
          current_bid: current_bid || 0,
          reserve_met,
          status: 'active'
        };
      });

      // Insert auctions
      const auctions = await Auction.insertMany(transformedAuctions);
      console.log(`✓ Created ${auctions.length} auctions`);

      console.log('\n✅ Database seeded successfully!');
      console.log(`   ${users.length} users`);
      console.log(`   ${auctions.length} auctions`);

      await disconnectDB();
    } catch (error) {
      console.error('Error seeding database:', error.message);
      process.exit(1);
    }
  });

// Delete command
program
  .command('delete')
  .description('Delete all auction and user data from the database')
  .option('-f, --force', 'Skip confirmation')
  .action(async (options) => {
    try {
      await connectDB();

      const auctionCount = await Auction.countDocuments();
      const userCount = await User.countDocuments();
      const totalCount = auctionCount + userCount;

      if (totalCount === 0) {
        console.log('Database is already empty.');
        await disconnectDB();
        return;
      }

      if (!options.force) {
        console.log(`About to delete ${userCount} user(s) and ${auctionCount} auction(s).`);
        console.log('Use --force flag to confirm deletion.');
        await disconnectDB();
        return;
      }

      const auctionResult = await Auction.deleteMany({});
      const userResult = await User.deleteMany({});

      console.log(`Successfully deleted ${userResult.deletedCount} user(s) and ${auctionResult.deletedCount} auction(s).`);

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

      const auctions = await Auction.find({}).populate('seller_id', 'username');
      const users = await User.find({});

      console.log(`\n📊 Database Summary:`);
      console.log(`   Users: ${users.length}`);
      console.log(`   Auctions: ${auctions.length}\n`);

      if (auctions.length === 0) {
        console.log('No auctions found in database.');
        console.log('Run "seed" command to add sample data.');
      } else {
        console.log(`Found ${auctions.length} auction(s):\n`);
        auctions.forEach((auction, index) => {
          const timeLeft = Math.ceil((new Date(auction.end_date) - new Date()) / (1000 * 60 * 60 * 24));
          console.log(`${index + 1}. ${auction.title}`);
          console.log(`   Seller: ${auction.seller_id?.username || 'Unknown'}`);
          console.log(`   Condition: ${auction.condition}`);
          console.log(`   Price: $${auction.start_price} (Reserve: $${auction.reserve_price})`);
          console.log(`   Bids: ${auction.bid_count} | Watchers: ${auction.watchers_count}`);
          console.log(`   Ends in: ${timeLeft} day(s)`);
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
