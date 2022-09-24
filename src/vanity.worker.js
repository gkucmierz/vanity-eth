
import pk2a from 'ethereum-private-key-to-address';

const SEND_TIMEOUT = 200;

const randomAddress = (buffer = Buffer(32)) => {
  self.crypto.getRandomValues(buffer);
  return pk2a(buffer);
};

const clipAddr = addr => addr.substr(2);

const buff2str = buffer => {
  return `0x${[...buffer].map(n => n.toString(16).padStart(2, '0')).join('')}`;
};

const runner = (sendWork => {
  const buffer = Buffer(32);
  let matches = [];
  let cnt = 0;
  let matcher;
  let stop = true;

  const loop = date => {
    let now;
    do {
      const address = randomAddress(buffer);
      if (matcher(clipAddr(address))) {
        matches.push([address, buff2str(buffer)]);
      }
      ++cnt;
      now = +new Date();
    } while(now < date);
    sendWork({ cnt, matches });
    matches = [];
    cnt = 0;
    if (!stop) {
      setTimeout(() => loop(+new Date() + SEND_TIMEOUT));
    }
  };

  return {
    start: () => {
      const lastStop = stop;
      stop = false;
      if (lastStop) {
        loop(+new Date());
      }
    },
    stop: () => {
      stop = true;
    },
    setMatcher: m => matcher = m
  };
})(data => postMessage(data));

const matchers = {
  zeros: (len = 3) => {
    const match = '0'.repeat(len);
    return addr => addr.substr(0, len) === match;
  },
  leading: (match = '000') => {
    const len = match.length;
    return addr => addr.substr(0, len) === match;
  },
  regex: (regex = /^000/) => addr => regex.test(addr)
};

self.addEventListener('message', e => {
  const data = e.data;
  switch (data.action) {
    case 'updateRegex':
      runner.setMatcher(matchers.regex(data.regex));
      break;
    case 'start':
      runner.start();
      break;
    case 'stop':
      runner.stop();
      break;
  }
});

runner.setMatcher(matchers.zeros());
