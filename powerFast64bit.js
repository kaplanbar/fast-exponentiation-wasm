'use strict';

import { unaryPlus, split, join } from './bigintHelperFunctions.js';

globalThis.powerFast64bit = () => { };

(async () => {
  const response = await fetch('powerFast64bit.wasm');
  const file = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(file);
  const { memory, powerFastBigInt } = wasm.instance.exports;

  globalThis.powerFast64bit = function() {
    let base = document.getElementById("number1_fast").value;
    let power = document.getElementById("number2_fast").value;
    base = BigInt(base);
    power = BigInt(power);
    let [base1, base2] = split(base);
    let [power1, power2] = split(power);
    const results = new Int32Array(memory.buffer, 0, 2);
    powerFastBigInt(base1, base2, power1, power2, results.byteOffset);
    document.getElementById("result_fast").innerHTML = join(results[0], results[1]).toLocaleString();
  }

})();
