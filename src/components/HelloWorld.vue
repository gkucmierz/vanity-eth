<template>
  <div class="hello">
    <h1>Vanity ETH Address Generator</h1>
    <input type="text" placeholder="0000000000..."/>
    <input type="button" value="generate"/>
  </div>
</template>

<script>

import Worker from '../vanity.worker.js';
// import eca from 'ethereum-checksum-address';
// console.log(eca.toChecksumAddress('0x7a9e457991352f8fefb90ab1ce7488df7cda6ed5'));

const worker = new Worker();

worker.postMessage({ phrase: '000' });

worker.onmessage =  event => {
  console.log(event.data);
};

export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
