<template>
  <div class="hello">
    <h1>Vanity ETH Address Generator</h1>
    <input type="text" placeholder="0000000000..."/>
    <input type="button" value="generate"/>
  </div>
</template>

<script>

import eca from 'ethereum-checksum-address';
import pk2a from 'ethereum-private-key-to-address';

console.log(eca.toChecksumAddress('0x7a9e457991352f8fefb90ab1ce7488df7cda6ed5'));
console.log(pk2a('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'))

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
