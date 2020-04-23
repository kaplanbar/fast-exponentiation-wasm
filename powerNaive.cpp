typedef long int i32;
typedef long long int i64;

extern "C" {
  void powerNaive(i32 base1, i32 base2, i32 power1, i32 power2, i32 *results) {
    i64 output = 1LL;
    i64 base = static_cast<i64>(base1) << 32 | base2;
    i64 power = static_cast<i64>(power1) << 32 | power2;
    for (int i = 0; i < power; i++) {
      output *= base;
    }
    results[0] = static_cast<i32>((output & 0xFFFFFFFF00000000LL) >> 32);
    results[1] = static_cast<i32>(output & 0xFFFFFFFFLL);
  }
}