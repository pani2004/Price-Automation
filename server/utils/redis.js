import { createClient } from 'redis';
const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
await redisClient.connect();

export default redisClient;
