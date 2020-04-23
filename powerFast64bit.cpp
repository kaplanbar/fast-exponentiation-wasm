typedef long int i32;
typedef long long int i64;

extern "C" {

  i64 powerFunc(i64 base, i64 _power) {
    i64 result = 1;
    while (_power) {
      if (_power & 1)
      result *= base;
      _power = _power >> 1;
      base = base * base;
    }
    return result;
  }

  void powerFastBigInt(i32 base1, i32 base2, i32 power1, i32 power2, i32 *results) {
    i64 base = static_cast<i64>(base1) << 32 | base2;
    i64 _power = static_cast<i64>(power1) << 32 | power2;
    i64 result = powerFunc(base, _power);
    results[0] = static_cast<i32>((result & 0xFFFFFFFF00000000LL) >> 32);
    results[1] = static_cast<i32>(result & 0xFFFFFFFFLL);
  }

}