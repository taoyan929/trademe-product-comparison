/**
 * TDD Tests for Auction Model
 *
 * RED PHASE: Tests written first, model not implemented yet
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Auction = require('../src/models/Auction');

let mongoServer;

// Setup in-memory MongoDB before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Clean up after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear database between tests
afterEach(async () => {
  await Auction.deleteMany({});
});

describe('Auction Model', () => {

  describe('Schema Validation', () => {

    test('should create an auction with valid fields', async () => {
      const auctionData = {
        title: 'Test Item',
        description: 'A test auction item',
        start_price: 100,
        reserve_price: 200
      };

      const auction = await Auction.create(auctionData);

      expect(auction.title).toBe('Test Item');
      expect(auction.description).toBe('A test auction item');
      expect(auction.start_price).toBe(100);
      expect(auction.reserve_price).toBe(200);
      expect(auction._id).toBeDefined();
      expect(auction.createdAt).toBeDefined();
      expect(auction.updatedAt).toBeDefined();
    });

    test('should fail when title is missing', async () => {
      const auctionData = {
        description: 'A test auction item',
        start_price: 100,
        reserve_price: 200
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should fail when description is missing', async () => {
      const auctionData = {
        title: 'Test Item',
        start_price: 100,
        reserve_price: 200
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should fail when start_price is missing', async () => {
      const auctionData = {
        title: 'Test Item',
        description: 'A test auction item',
        reserve_price: 200
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should fail when reserve_price is missing', async () => {
      const auctionData = {
        title: 'Test Item',
        description: 'A test auction item',
        start_price: 100
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should fail when start_price is negative', async () => {
      const auctionData = {
        title: 'Test Item',
        description: 'A test auction item',
        start_price: -50,
        reserve_price: 200
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should fail when reserve_price is negative', async () => {
      const auctionData = {
        title: 'Test Item',
        description: 'A test auction item',
        start_price: 100,
        reserve_price: -50
      };

      await expect(Auction.create(auctionData)).rejects.toThrow();
    });

    test('should trim whitespace from title', async () => {
      const auctionData = {
        title: '  Trimmed Title  ',
        description: 'A test auction item',
        start_price: 100,
        reserve_price: 200
      };

      const auction = await Auction.create(auctionData);

      expect(auction.title).toBe('Trimmed Title');
    });

    test('should trim whitespace from description', async () => {
      const auctionData = {
        title: 'Test Item',
        description: '  Trimmed Description  ',
        start_price: 100,
        reserve_price: 200
      };

      const auction = await Auction.create(auctionData);

      expect(auction.description).toBe('Trimmed Description');
    });

    test('should allow start_price of 0', async () => {
      const auctionData = {
        title: 'Free Item',
        description: 'Starting at zero',
        start_price: 0,
        reserve_price: 100
      };

      const auction = await Auction.create(auctionData);

      expect(auction.start_price).toBe(0);
    });

  });

  describe('CRUD Operations', () => {

    test('should find all auctions', async () => {
      await Auction.create([
        { title: 'Item 1', description: 'Desc 1', start_price: 10, reserve_price: 20 },
        { title: 'Item 2', description: 'Desc 2', start_price: 30, reserve_price: 40 }
      ]);

      const auctions = await Auction.find({});

      expect(auctions).toHaveLength(2);
    });

    test('should find auction by ID', async () => {
      const created = await Auction.create({
        title: 'Findable Item',
        description: 'Can be found by ID',
        start_price: 100,
        reserve_price: 200
      });

      const found = await Auction.findById(created._id);

      expect(found).not.toBeNull();
      expect(found.title).toBe('Findable Item');
    });

    test('should update an auction', async () => {
      const auction = await Auction.create({
        title: 'Original Title',
        description: 'Original Description',
        start_price: 100,
        reserve_price: 200
      });

      auction.title = 'Updated Title';
      await auction.save();
      const updated = await Auction.findById(auction._id);

      expect(updated.title).toBe('Updated Title');
    });

    test('should delete an auction', async () => {
      const auction = await Auction.create({
        title: 'To Be Deleted',
        description: 'Will be removed',
        start_price: 100,
        reserve_price: 200
      });

      await Auction.findByIdAndDelete(auction._id);
      const found = await Auction.findById(auction._id);

      expect(found).toBeNull();
    });

    test('should count documents', async () => {
      await Auction.create([
        { title: 'Item 1', description: 'Desc 1', start_price: 10, reserve_price: 20 },
        { title: 'Item 2', description: 'Desc 2', start_price: 30, reserve_price: 40 },
        { title: 'Item 3', description: 'Desc 3', start_price: 50, reserve_price: 60 }
      ]);

      const count = await Auction.countDocuments();

      expect(count).toBe(3);
    });

    test('should delete many documents', async () => {
      await Auction.create([
        { title: 'Item 1', description: 'Desc 1', start_price: 10, reserve_price: 20 },
        { title: 'Item 2', description: 'Desc 2', start_price: 30, reserve_price: 40 }
      ]);

      const result = await Auction.deleteMany({});

      expect(result.deletedCount).toBe(2);
      const remaining = await Auction.countDocuments();
      expect(remaining).toBe(0);
    });

    test('should insert many documents at once', async () => {
      const items = [
        { title: 'Bulk 1', description: 'Bulk Desc 1', start_price: 10, reserve_price: 20 },
        { title: 'Bulk 2', description: 'Bulk Desc 2', start_price: 30, reserve_price: 40 },
        { title: 'Bulk 3', description: 'Bulk Desc 3', start_price: 50, reserve_price: 60 }
      ];

      const result = await Auction.insertMany(items);

      expect(result).toHaveLength(3);
      const count = await Auction.countDocuments();
      expect(count).toBe(3);
    });

  });

});
