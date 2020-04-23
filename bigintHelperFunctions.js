'use strict';

const unaryPlus = function ensureBigIntIsPositive(bigint) {
  if (bigint > 0n) {
    return bigint;
  } else {
    return -bigint;
  }
}

// Wasm & js both support 64bit ints.
// Sadly, they don't support sending them across the wasm-js boundary.
// So we've got to split them into a pair of 32bit ints,
// and rejoin them on the other side,
const split = function bigIntToNumbers(bigint) {
  bigint = BigInt(bigint);
  const x = (bigint & 0xFFFFFFFF00000000n) >> 32n;
  const y = bigint & 0xFFFFFFFFn;
  return [Number(x), Number(y)];
}

const join = function numbersToBigInt(x, y) {
  return unaryPlus(BigInt(x) << 32n | BigInt(y));
}

export { unaryPlus, split, join };