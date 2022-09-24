<template>
  <div class="hello">
    <h3>Vanity ETH Address Generator</h3>
    <input
      type="text"
      placeholder="0000000000..."
      v-model="input"
      v-bind:class="{ error: !correct }"
      />
    <input
      type="button"
      value="generate"
      @click="generate = !generate"
      v-bind:class="{ generate }"
      />
    <input
      type="button"
      value="clear"
      @click="result = []; cnt = 0;"
      />
    <pre>RegExp: {{ regex }}</pre>
    <pre>Results: {{ result.length }} / {{ cnt }}</pre>
    <div class="result">
      <table>
        <tr>
          <td>Address</td>
          <td>Privkey</td>
        </tr>
        <tr v-for="item in result" :key="item[0]">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Worker from '../vanity.worker.js';

const workers = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  workers[i] = new Worker();
}

const createRegex = str => {
  try {
    return new RegExp(str);
  } catch {
    return false;
  }
};

const init = that => {
  workers.map(worker => {
    worker.onmessage =  ({ data }) => {
      if (data.matches.length > 0) {
        that.cnt += data.cnt;
        that.result.push(...data.matches);
      }
    };
  });
};

export default {
  name: 'HelloWorld',
  data() {
    init(this);
    return {
      input: '',
      regex: '',
      correct: true,
      generate: false,
      cnt: 0,
      result: [],
    }
  },
  watch: {
    input(actual) {
      const regex = createRegex(actual);
      if (regex) {
        this.regex = regex;
        this.correct = true;
        workers.map(worker => worker.postMessage({ action: 'updateRegex', regex }));
      } else {
        this.regex = '';
        this.correct = false;
      }
    },
    generate(val) {
      if (val) {
        workers.map(worker => worker.postMessage({ action: 'start' }));
      } else {
        workers.map(worker => worker.postMessage({ action: 'stop' }));
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
input.error {
  color: #f00;
}
input.generate {
  background-color: #dfd;
}
.result {
  font-family: monospace;

  table {
    width: 100%;
    background: #eee;
  }
}
</style>
