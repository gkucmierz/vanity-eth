
import pk2a from 'ethereum-private-key-to-address';
// console.log(pk2a('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'))

const SEND_TIMEOUT = 100;

const randomAddress = (buffer = Buffer(32)) => {
  self.crypto.getRandomValues(buffer);
  return pk2a(buffer);
};

const sendWork = data => {
  postMessage(data);
};

const clipAddr = addr => addr.substr(2);

const runner = (matchFn) => {
  const buffer = Buffer(32);
  let matches = [];
  let date = +new Date();
  let cnt = 0;
  const forever = true;
  while (forever) {
    const now = +new Date();
    if (now > date) {
      date = now + SEND_TIMEOUT;
      sendWork({ cnt, matches });
      matches = [];
    }
    const address = randomAddress(buffer);
    ++cnt;
    if (matchFn(clipAddr(address))) {
      matches.push(address);
    }
  }
};

const zeros = (len = 3) => {
  const match = '0'.repeat(len);
  return addr => addr.substr(0, len) === match;
};

// const leading = (match = '000') => {
//   const len = match.length;
//   return addr => addr.substr(0, len) === match;
// };

self.addEventListener('message', () => {
  // console.log('worker got, ', e.data, '12312312');

  runner(zeros(3));

  // postMessage({a:'123'});
});
