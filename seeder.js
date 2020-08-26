const faker = require('faker');

const mongoose = require('mongoose');

const Review = require('./db/model/reviews.js');

const db = mongoose.connection;

// for using locally
const url = 'mongodb://localhost:27017/reviews';

// for using EC2
// const url = 'mongodb://database/reviews';

// // use npm run seed to seed database with 100 properties with 25-75 reviews each
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    const seedReviews = () => {
      console.log('seeding started');
      db.dropDatabase();
      const reviews = [];
      for (let i = 0; i < 100; i += 1) {
        const ranNum = Math.floor(Math.random() * 2);
        const propId = i;
        const property = faker.company.companyName();
        const reviewCount = Math.floor(Math.random() * 50) + 25;
        const hostName = [];
        const hostAvatar = faker.internet.avatar();
        if (ranNum === 0) {
          hostName.push('');
        } else {
          hostName.push(faker.name.firstName());
        }
        for (let j = 0; j < reviewCount; j += 1) {
          const revId = j;
          const postDate = faker.date.past();
          const review = new Review ({
            propertyId: propId,
            reviewId: revId,
            propertyName: property,
            username: faker.name.firstName(),
            avatar: faker.internet.avatar(),
            review: faker.lorem.paragraph(),
            dayPosted: postDate,
            rating: {
              cleanliness: faker.random.number({ min: 2, max: 5 }),
              communication: faker.random.number({ min: 2, max: 5 }),
              accuracy: faker.random.number({ min: 2, max: 5 }),
              checkIn: faker.random.number({ min: 2, max: 5 }),
              location: faker.random.number({ min: 2, max: 5 }),
              value: faker.random.number({ min: 2, max: 5 }),
            },
            response: {
              hostname: hostName[0],
              avatar: hostAvatar,
              response: faker.lorem.sentences(),
              dayCommented: postDate,
            },
          });
          reviews.push(review);
          review.save();
        }
      }
      // console.log(reviews);
      console.log('seeding done');
    };
    seedReviews();
  }
});
