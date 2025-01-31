import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const data = new SharedArray('requests', function () {
  // return JSON.parse(open('./data/requests.json'));
  return JSON.parse(open('../data/requests.json')).filter((it) => !it.startsWith('/search'));
});

const host = __ENV.HOST || `http://192.168.31.144:3000`; // drizzle
// const host = `http://192.168.31.144:3001`; // prisma

export const options = {
  stages: [
    { duration: '5s', target: 200 },
    { duration: '15s', target: 200 },
    { duration: '5s', target: 400 },
    { duration: '15s', target: 400 },
    { duration: '5s', target: 600 },
    { duration: '15s', target: 600 },
    { duration: '5s', target: 800 },
    { duration: '15s', target: 800 },
    { duration: '5s', target: 1000 },
    { duration: '15s', target: 1000 },
    { duration: '5s', target: 1200 },
    { duration: '15s', target: 1200 },
    { duration: '5s', target: 1400 },
    { duration: '15s', target: 1400 },
    { duration: '5s', target: 1600 },
    { duration: '15s', target: 1600 },
    { duration: '5s', target: 1800 },
    { duration: '15s', target: 1800 },
    { duration: '5s', target: 2000 },
    { duration: '15s', target: 2000 },
    { duration: '5s', target: 2200 },
    { duration: '15s', target: 2200 },
    { duration: '5s', target: 2400 },
    { duration: '15s', target: 2400 },
    { duration: '5s', target: 2600 },
    { duration: '15s', target: 2600 },
    { duration: '5s', target: 2800 },
    { duration: '15s', target: 2800 },
    { duration: '5s', target: 3000 },
    { duration: '55s', target: 3000 },
  ],

  // vus: 2600,
  // duration: '60s',
  // iterations: 600000,
};

export default function () {
  const params = data[scenario.iterationInTest % data.length];
  const url = `${host}${params}`;
  // const url = `${host}${params}`;

  http.get(url, {
    headers: {
      Connection: 'keep-alive',
      'Keep-Alive': 'timeout=5, max=1000',
    },
    tags: { name: 'fetch' },
    timeout: '30s',
  });

  sleep(0.1 * (scenario.iterationInTest % 6));
}
