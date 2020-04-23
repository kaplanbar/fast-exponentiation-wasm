'use strict';

import { unaryPlus, split, join } from './bigintHelperFunctions.js';

globalThis.naiveExponentiation = () => { };

(async () => {
  const response = await fetch('powerNaive.wasm');
  const file = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(file);
  const { memory, powerNaive } = wasm.instance.exports;

  globalThis.naiveExponentiation = function exponentiationBySquareingWithBigIntOutput() {
    let base = document.getElementById("number1_naive").value;
    let power = document.getElementById("number2_naive").value;
    base = BigInt(base);
    power = BigInt(power);
    let [base1, base2] = split(base);
    let [power1, power2] = split(power);
    const results = new Int32Array(memory.buffer, 0, 2);
    powerNaive(base1, base2, power1, power2, results.byteOffset);
    document.getElementById("result_naive").innerHTML = join(results[0], results[1]).toLocaleString();
  }
})();