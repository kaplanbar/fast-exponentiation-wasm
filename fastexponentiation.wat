(module
  ;; Calculates the `x^n` in O(logN) time.
  (func $power (param $x i32) (param $y i32) (result i32)
    (local $ret i32)
    (set_local $ret (i32.const 1))
    (block $break
      (loop $continue
        (br_if $break (i32.le_s (get_local $y) (i32.const 0)))        
        (if (i32.and (i32.const 1) (get_local $y))
            (set_local $ret (i32.mul (get_local $ret) (get_local $x)))
        )
        (set_local $x (i32.mul (get_local $x) (get_local $x)))
        (set_local $y (i32.shr_s (get_local $y) (i32.const 1)))
        (br $continue)
      )
    )
    (get_local $ret)
  )

  (export "power" (func $power))
)
