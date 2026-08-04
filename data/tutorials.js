export const uraLangTutorial = {
  id: "ura-lang",
  label: "Language Docs",
  title: "Ura Language",
  tagline: "A compiled, statically-typed language with Python's clean indentation syntax — built on LLVM and written entirely in C.",
  github: "https://github.com/mohammedhrima/ura-lang",
  groups: [
    {
      label: "Getting Started",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          blocks: [
            { type: "text", content: "Ura is a compiled, statically-typed language that borrows Python's indentation-based syntax and compiles straight to native machine code through LLVM. No interpreter, no virtual machine, no garbage collector. No braces, no semicolons." },
            { type: "text", content: "The compiler is written from scratch in C — lexer, parser, semantic analysis and code generation are all hand-built. LLVM is used for exactly one job: turning the IR the backend emits into optimized machine code." },
            { type: "code", label: "tour.ura", code: `struct Hero:
    name  char[]
    level i32

    pub fn create(name char[]) Hero:
        h Hero
        h.name  = name
        h.level = 1
        ret h

    fn promote() void:
        self.level = self.level + 1

main():
    hero Hero = Hero::create("Aldric")
    hero.promote()
    output(hero, "\\n")` },
            { type: "output", label: "output", code: `Hero{name: Aldric, level: 2}` },
            { type: "heading", content: "What it gives you" },
            { type: "list", items: [
              "Native speed — LLVM's full optimization pipeline, `-O0` through `-O3`, `-Os`, `-Oz`",
              "Clean syntax — indentation blocks, no braces, no semicolons, no header files",
              "Real types — sized integers, `f32`/`f64`, arrays that carry their length, optionals the compiler enforces",
              "Deterministic memory — `new` and `clean`, plus `operator drop` destructors that run at predictable points",
              "Zero-cost C interop — one `proto` line and you can call any C function",
              "Exceptions without unwind tables — `try`/`catch`/`throw` compiled to a flag check",
            ]},
            { type: "info", content: "Every code sample in this documentation is compiled and run before publishing. The `output` blocks are captured program output, not hand-written." },
          ],
        },
        {
          id: "install",
          title: "Install & Build",
          blocks: [
            { type: "text", content: "You need LLVM 14 and clang. Clone the repo, build the compiler, and you have a `build/ura` binary that compiles and runs `.ura` files." },
            { type: "code", label: "bash", code: `git clone https://github.com/mohammedhrima/ura-lang
cd ura-lang

# install LLVM 14 (once per machine)
brew install llvm@14                              # macOS
sudo apt install clang-14 llvm-14 llvm-14-tools   # Debian/Ubuntu

make build        # compile the compiler -> build/ura
./build/ura hello.ura -exec` },
            { type: "heading", content: "The task shell" },
            { type: "text", content: "`make dev` opens a small task shell (it needs uv) where the development verbs live." },
            { type: "table", headers: ["Command", "Does"],
              rows: [
                ["`check`", "verify clang and `llvm-config-14` are present"],
                ["`install`", "install the LLVM/clang dependencies"],
                ["`build`", "compile the compiler to `build/ura`"],
                ["`tests`", "run the whole golden suite, or `tests <group>.md` for one group"],
                ["`update <group>.md`", "regenerate one group's recorded output"],
                ["`show`, `index`, `doctor`", "inspect the test corpus"],
              ]
            },
            { type: "info", content: "Ura pins LLVM 14 on purpose. LLVM 15+ switched to opaque pointers (`ptr`), while 14 still prints typed pointers like `i32*` — which makes the generated `.ll` far easier to read when debugging the backend." },
            { type: "heading", content: "The standard library path" },
            { type: "text", content: "`use \"@/...\"` resolves against the standard library directory. The compiler finds it next to the binary; set `URA_LIB` to override that." },
            { type: "code", label: "bash", code: `export URA_LIB=/path/to/ura-lang/ura-lib` },
          ],
        },
        {
          id: "hello-world",
          title: "Hello World",
          blocks: [
            { type: "text", content: "`main()` needs no return type and no arguments. `output` is built in — no import, no format string. It takes any number of values of any type and formats each one by its type." },
            { type: "code", label: "hello.ura", code: `main():
    output("Hello, world!\\n")` },
            { type: "output", label: "output", code: `Hello, world!` },
            { type: "heading", content: "Printing anything" },
            { type: "text", content: "There is no `%d` or `%s` to get wrong. Pass values directly and each is formatted from its static type." },
            { type: "code", label: "print.ura", code: `main():
    name  char[] = "ura"
    count i32    = 3
    ratio f32    = 0.5
    ok    bool   = True

    output("name=", name, " count=", count, "\\n")
    output("ratio=", ratio, " ok=", ok, "\\n")
    errput("this line goes to stderr, in red\\n")` },
            { type: "output", label: "stdout", code: `name=ura count=3
ratio=0.500000 ok=True` },
            { type: "text", content: "`errput` is the same printer pointed at standard error, in red. Use it for diagnostics that should survive a redirect of stdout." },
            { type: "table", headers: ["", "Stream", "Colour"],
              rows: [
                ["`output(...)`", "stdout", "plain"],
                ["`errput(...)`", "stderr", "red"],
              ]
            },
            { type: "info", content: "Neither adds a newline. The `\\n` is yours to place, which makes building one line out of several calls easy." },
          ],
        },
      ],
    },
    {
      label: "Language Basics",
      sections: [
        {
          id: "variables",
          title: "Variables & Types",
          blocks: [
            { type: "text", content: "A declaration is `name Type = value` — the name first, then its type. There is no keyword and no inference: types are always written down." },
            { type: "code", label: "variables.ura", code: `main():
    // signed
    a i8  = -128
    b i16 = -32768
    c i32 = -2147483648
    d i64 = 9000000000

    // unsigned
    e u8  = 255
    f u16 = 65535
    g u32 = 4294967295
    h u64 = 9000000000

    // floating point
    i f32 = 1.5
    j f64 = 3.141592653589793

    // the rest
    k bool   = True
    l char   = 'A'
    m char[] = "text"

    output(a, " ", b, " ", c, " ", d, "\\n")
    output(e, " ", f, " ", g, " ", h, "\\n")
    output(i, " ", j, "\\n")
    output(k, " ", l, " ", m, "\\n")` },
            { type: "output", label: "output", code: `-128 -32768 -2147483648 9000000000
255 65535 4294967295 9000000000
1.500000 3.141593
True A text` },
            { type: "heading", content: "The type list" },
            { type: "table", headers: ["Type", "Width", "Notes"],
              rows: [
                ["`i8` `i16` `i32` `i64`", "8–64 bit", "signed integers"],
                ["`u8` `u16` `u32` `u64`", "8–64 bit", "unsigned integers"],
                ["`f32` `f64`", "32 / 64 bit", "floating point"],
                ["`bool`", "1 bit", "`True` or `False`, nothing else"],
                ["`char`", "8 bit", "a single character, `'A'`"],
                ["`char[]`", "pointer + length", "a string; an array of `char`"],
                ["`pointer`", "machine word", "a raw address, for C interop"],
                ["`void`", "—", "return type only"],
              ]
            },
            { type: "heading", content: "Zero by default" },
            { type: "text", content: "A declaration with no initialiser is zeroed — `0`, `False`, an empty string. There is no uninitialised memory to read by accident." },
            { type: "heading", content: "Literals take the width they need" },
            { type: "text", content: "An integer literal is `i32` if it fits and `i64` if it does not, and an explicit type on the left always wins. A literal that cannot fit the type you asked for is a compile error rather than a silent truncation." },
            { type: "code", label: "literals.ura", code: `main():
    ok    i64 = 9000000000   // fits, stays i64
    small i8  = 300          // error: does not fit` },
            { type: "output", label: "compiler error", code: `error: 300 does not fit in 'i8' (range -128 to 127); widen the type, or convert explicitly with 'as'
  literals.ura:3:17
  |
3 |     small i8  = 300
  |                 ^^^` },
            { type: "heading", content: "Globals" },
            { type: "text", content: "A declaration outside any function is a global — every function in the file can read and write it. A local of the same name shadows it for the rest of its block." },
            { type: "code", label: "globals.ura", code: `version char[] = "1.0"
counter i32    = 0
limit   i32

fn bump() void:
    counter = counter + 1

main():
    output("version ", version, " limit ", limit, "\\n")
    bump()
    bump()
    output("counter ", counter, "\\n")

    // a local shadows the global for the rest of the block
    counter i32 = 99
    output("local  ", counter, "\\n")` },
            { type: "output", label: "output", code: `version 1.0 limit 0
counter 2
local  99` },
          ],
        },
        {
          id: "operators",
          title: "Operators",
          blocks: [
            { type: "text", content: "The usual set, with the precedence you expect. Logical operators come in both symbol and word form — pick whichever reads better — and `is` is a synonym for `==`." },
            { type: "code", label: "operators.ura", code: `main():
    a i32 = 17
    b i32 = 5

    output(a + b, " ", a - b, " ", a * b, " ", a / b, " ", a % b, "\\n")
    output(a & b, " ", a | b, " ", a ^ b, " ", ~a, "\\n")
    output(a << 2, " ", a >> 2, "\\n")
    output(a == b, " ", a != b, " ", a < b, " ", a >= b, "\\n")
    output(a is 17, "\\n")

    ready bool = True
    tired bool = False
    output(ready and not tired, " ", ready or tired, "\\n")
    output(ready && !tired, " ", ready || tired, "\\n")

    n i32 = 10
    n += 5
    n -= 3
    n *= 2
    n /= 4
    n %= 5
    output("compound ", n, "\\n")

    bits i32 = 1
    bits <<= 4
    bits |= 3
    bits &= 30
    output("bits ", bits, "\\n")

    output("precedence ", 2 + 3 * 4, " ", (2 + 3) * 4, "\\n")` },
            { type: "output", label: "output", code: `22 12 85 3 2
1 21 20 -18
68 4
False True False True
True
True True
True True
compound 1
bits 18
precedence 14 20` },
            { type: "table", headers: ["Group", "Operators"],
              rows: [
                ["Arithmetic", "`+` `-` `*` `/` `%`"],
                ["Bitwise", "`&` `|` `^` `~` `<<` `>>`"],
                ["Comparison", "`==` `!=` `<` `>` `<=` `>=`, and `is` for `==`"],
                ["Logical", "`and` `or` `not`, or `&&` `||` `!`"],
                ["Assignment", "`=` `+=` `-=` `*=` `/=` `%=`"],
                ["Compound bitwise", "`&=` `|=` `^=` `<<=` `>>=`"],
              ]
            },
            { type: "info", content: "Shifts follow the operand's signedness: `>>` on an unsigned type is a logical shift, on a signed type an arithmetic one." },
            { type: "warning", content: "A comparison produces a `bool`, not an integer — you cannot add it to a number without an explicit `as`. Dividing an integer by zero traps at runtime with a `file:line` message instead of returning garbage." },
          ],
        },
        {
          id: "casting",
          title: "Type Casting",
          blocks: [
            { type: "text", content: "`as` converts between numeric types, `char`, `bool` and pointers. It is the explicit escape hatch: unlike an out-of-range literal, a cast that loses information is allowed, because you asked for it." },
            { type: "code", label: "casting.ura", code: `main():
    big  i32 = 300
    small i8 = big as i8
    wide i64 = big as i64

    output(big, " -> i8 ", small, " -> i64 ", wide, "\\n")

    // float and int both ways
    pi   f64 = 3.9
    trunc i32 = pi as i32
    back f32 = trunc as f32
    output(pi, " -> ", trunc, " -> ", back, "\\n")

    // char is an integer underneath
    letter char = 'A'
    code   i32  = letter as i32
    next   char = (code + 1) as char
    output(letter, " ", code, " ", next, "\\n")

    // bool converts too
    flag bool = True
    output(flag as i32, " ", flag as f32, "\\n")

    // casts chain left to right
    output(4.9 as i32 as f32, "\\n")` },
            { type: "output", label: "output", code: `300 -> i8 44 -> i64 300
3.900000 -> 3 -> 3.000000
A 65 B
1 1.000000
4.000000` },
            { type: "info", content: "`300 as i8` gives `44`, and float-to-int truncates toward zero rather than rounding. Both are deliberate: `as` never inserts a check." },
            { type: "warning", content: "A struct cannot be cast to a scalar or the other way round — that is a compile error, not a reinterpretation of its bytes." },
          ],
        },
        {
          id: "control-flow",
          title: "Control Flow",
          blocks: [
            { type: "text", content: "`if` / `elif` / `else` with indented blocks, and no parentheses around the condition. A single-statement body can sit on the same line after the colon." },
            { type: "code", label: "control.ura", code: `fn describe(n i32) void:
    if n < 0:
        output(n, " is negative\\n")
    elif n == 0:
        output("zero\\n")
    elif n < 10:
        output(n, " is small\\n")
    else:
        output(n, " is large\\n")

main():
    describe(-4)
    describe(0)
    describe(7)
    describe(900)

    // while
    i i32 = 0
    while i < 3:
        output("while ", i, "\\n")
        i = i + 1

    // loop runs until something breaks it
    n i32 = 0
    loop:
        n = n + 1
        if n == 2: continue
        if n > 4: break
        output("loop ", n, "\\n")` },
            { type: "output", label: "output", code: `-4 is negative
zero
7 is small
900 is large
while 0
while 1
while 2
loop 1
loop 3
loop 4` },
            { type: "text", content: "`while` takes a condition; `loop` takes none and runs until a `break` (or a `return`) leaves it. `continue` skips to the next iteration of either." },
          ],
        },
        {
          id: "for-loops",
          title: "For Loops",
          blocks: [
            { type: "text", content: "`for i in a..b` walks a range. The end is exclusive, and when the start is larger than the end the range counts down on its own — there is no reversed-comparison special case to write." },
            { type: "code", label: "for.ura", code: `main():
    // a..b is exclusive at the top
    for i in 0..4:
        output(i, " ")
    output("\\n")

    // it counts down on its own when the start is bigger
    for i in 4..0:
        output(i, " ")
    output("\\n")

    // by sets the step
    for i in 0..10 by 3:
        output(i, " ")
    output("\\n")

    // walk an array by value
    nums i32[] = [10, 20, 30]
    for n in nums:
        output(n, " ")
    output("\\n")

    // for ref aliases each element, so writes land in the array
    for ref n in nums:
        n = n * 2
    output(nums, "\\n")` },
            { type: "output", label: "output", code: `0 1 2 3
4 3 2 1
0 3 6 9
10 20 30
[20, 40, 60]` },
            { type: "table", headers: ["Form", "Yields"],
              rows: [
                ["`for i in 0..n`", "each integer, end exclusive"],
                ["`for i in n..0`", "the same, counting down"],
                ["`for i in a..b by k`", "every `k`-th value; `k` must be positive"],
                ["`for x in arr`", "a copy of each element"],
                ["`for ref x in arr`", "an alias — writing to `x` writes into `arr`"],
              ]
            },
            { type: "warning", content: "`by` needs a range on its left, and the step must be positive — direction comes from the range itself, not from the sign of the step. `for ref` needs an array: a range yields values, not storage to point at." },
          ],
        },
        {
          id: "match",
          title: "Match",
          blocks: [
            { type: "text", content: "`match` dispatches on a value. Labels can be integers or enum variants, one `case` can carry several of them, and `default` catches the rest." },
            { type: "code", label: "match.ura", code: `enum Level: DEBUG, INFO, WARN, ERROR

fn label(l Level) char[]:
    match l:
        case DEBUG: ret "debug"
        case INFO:  ret "info"
        case WARN:  ret "warn"
        default:    ret "error"

fn describe(roll i32) void:
    match roll:
        case 1, 2, 3:
            output("low     ")
        case 4, 5:
            output("mid     ")
        case 20:
            output("crit    ")
            break
        default:
            output("ordinary")
    output(" (", roll, ")\\n")

main():
    output(label(DEBUG), " ", label(WARN), " ", label(ERROR), "\\n")
    describe(2)
    describe(5)
    describe(20)
    describe(11)

    // continue inside a match belongs to the loop
    for i in 0..5:
        match i:
            case 2: continue
            default: output(i, " ")
    output("\\n")` },
            { type: "output", label: "output", code: `debug warn error
low      (2)
mid      (5)
crit     (20)
ordinary (11)
0 1 3 4` },
            { type: "heading", content: "The rules" },
            { type: "list", items: [
              "Cases never fall through — no `break` is needed to end one",
              "`break` inside a `match` leaves the `match`, not an enclosing loop",
              "`continue` inside a `match` belongs to the enclosing loop",
              "Every label must have the subject's type, so an enum subject rejects an integer case",
              "`case` outside a `match`, or an empty `case`, is a compile error",
            ]},
          ],
        },
      ],
    },
    {
      label: "Functions",
      sections: [
        {
          id: "functions",
          title: "Functions",
          blocks: [
            { type: "text", content: "`fn name(params) ReturnType:` — each parameter is `name Type`, and the return type sits after the closing paren. A body that fits on one line can follow the colon directly." },
            { type: "code", label: "functions.ura", code: `fn clamp(val i32, lo i32, hi i32) i32:
    if val < lo: ret lo
    if val > hi: ret hi
    ret val

fn is_even(n i32) bool: ret n % 2 == 0

fn announce(hp i32) void:
    if hp <= 0:
        output("down\\n")
        ret
    output("standing: ", hp, "\\n")

fn factorial(n i32) i32:
    if n <= 1: return 1
    return n * factorial(n - 1)

main():
    // later() is declared after main and still callable
    output(later(), "\\n")
    output(clamp(120, 0, 100), " ", clamp(-5, 0, 100), "\\n")
    output(is_even(4), " ", is_even(7), "\\n")
    announce(0)
    announce(12)
    output("5! = ", factorial(5), "\\n")

fn later() char[]:
    ret "no forward declaration needed"` },
            { type: "output", label: "output", code: `no forward declaration needed
100 0
True False
down
standing: 12
5! = 120` },
            { type: "heading", content: "ret and return" },
            { type: "text", content: "`ret` is a shorter spelling of `return`. They are the same keyword and mix freely in one file — the compiler's own `.ura` sources mostly use `ret`. A bare `ret` leaves a `void` function early." },
            { type: "heading", content: "Order does not matter" },
            { type: "text", content: "Functions and methods can be called before the line that declares them, so there are no forward declarations and no header files. `main()` itself needs no return type; it is the entry point wherever you put it." },
            { type: "info", content: "A function that runs off the end of a non-`void` body returns an unspecified value — declare what you mean to return on every path." },
          ],
        },
        {
          id: "function-values",
          title: "Functions as Values",
          blocks: [
            { type: "text", content: "A function type is written the way it is called: `fn(i32) i32`. Values of that type can be stored in variables, passed as arguments and swapped at runtime." },
            { type: "code", label: "fnvalues.ura", code: `fn double(n i32) i32: ret n * 2
fn square(n i32) i32: ret n * n

fn apply(f fn(i32) i32, x i32) i32:
    ret f(x)

fn apply_twice(f fn(i32) i32, x i32) i32:
    ret f(f(x))

main():
    // a function stored in a variable
    op fn(i32) i32 = double
    output(op(21), "\\n")

    // passed as an argument
    output(apply(square, 7), "\\n")
    output(apply_twice(double, 3), "\\n")

    // swap the implementation at runtime
    op = square
    output(op(9), "\\n")

    // a nested helper: visible only inside main
    fn shout(text char[]) void:
        output("[", text, "]\\n")
    shout("nested")` },
            { type: "output", label: "output", code: `42
49
12
81
[nested]` },
            { type: "heading", content: "No closures, on purpose" },
            { type: "text", content: "A nested function is a plain function that happens to be scoped to its parent. It **cannot** capture the enclosing function's locals — reaching for one is a compile error, not a hidden allocation. When a helper needs shared state, pass it a `ref` parameter." },
            { type: "warning", content: "A function-typed variable is zero-initialised to null. Calling it before assigning a real function traps at runtime with a `file:line` message rather than jumping to address zero." },
          ],
        },
        {
          id: "ref-parameters",
          title: "Reference Parameters",
          blocks: [
            { type: "text", content: "Arguments are passed by value. Mark a parameter `ref` and it binds to the caller's variable instead — reads and writes go straight through. The call site repeats `ref`, so a mutation is never invisible at the point where it happens." },
            { type: "code", label: "refparams.ura", code: `fn heal(ref hp i32, amount i32) void:
    hp = hp + amount

fn by_value(hp i32) void:
    hp = 9999

fn swap(ref a i32, ref b i32) void:
    tmp i32 = a
    a = b
    b = tmp

// a nested fn cannot capture, so share state through a ref parameter
fn tally(ref total i32, values i32[]) void:
    fn add(ref acc i32, v i32) void:
        acc = acc + v
    for v in values:
        add(ref total, v)

main():
    hp i32 = 50
    heal(ref hp, 25)
    output("after heal ", hp, "\\n")

    by_value(hp)
    output("after by_value ", hp, "\\n")

    x i32 = 1
    y i32 = 2
    swap(ref x, ref y)
    output("swapped ", x, " ", y, "\\n")

    total i32 = 0
    tally(ref total, [1, 2, 3, 4])
    output("total ", total, "\\n")` },
            { type: "output", label: "output", code: `after heal 75
after by_value 75
swapped 2 1
total 10` },
            { type: "info", content: "The rule runs both ways: passing a value where a `ref` is wanted is an error, and so is passing a `ref` where a value is wanted. Neither direction is inferred." },
          ],
        },
      ],
    },
    {
      label: "Composite Types",
      sections: [
        {
          id: "arrays",
          title: "Arrays & Slices",
          blocks: [
            { type: "text", content: "`T[]` is an array: a pointer and a length travelling together, so `.len` is always available and bounds are always knowable. Write `T[n]` to make one of a given size, zeroed." },
            { type: "code", label: "arrays.ura", code: `main():
    // a literal infers its element type
    nums i32[] = [10, 20, 30]

    // sized and zeroed
    slots i32[] = i32[4]

    // the size can be a runtime value
    n i32 = 3
    dyn i32[] = i32[n * 2]

    output(nums, " len ", nums.len, "\\n")
    output(slots, " len ", slots.len, "\\n")
    output(dyn.len, "\\n")

    // index to read and write
    nums[1] = 99
    output(nums[0], " ", nums[1], "\\n")

    // multi-dimensional
    grid i32[][] = [[1, 2], [3, 4]]
    output(grid, " ", grid[1][0], "\\n")

    // a slice is a view, not a copy: lo..hi with hi exclusive
    letters char[] = "abcdefg"
    output(letters[1..4], "\\n")

    view i32[] = nums[1..3]
    view[0] = 7
    output("through the view ", nums[1], "\\n")` },
            { type: "output", label: "output", code: `[10, 20, 30] len 3
[0, 0, 0, 0] len 4
6
10 99
[[1, 2], [3, 4]] 3
bcd
through the view 7` },
            { type: "heading", content: "Slices share storage" },
            { type: "text", content: "`a[lo..hi]` produces a view over the same memory, with the end exclusive. Writing through the view writes into the original array — that is the point, and it means no copy is made." },
            { type: "heading", content: "Bounds checking is opt-in per access" },
            { type: "text", content: "A plain `a[i]` is unchecked, exactly like C. Append `?` and the access is bounds-checked: out of range traps with a `file:line` message instead of reading whatever was next in memory." },
            { type: "code", label: "guard.ura", code: `main():
    a i32[] = [1, 2, 3]
    output(a[9]?, "\\n")   // traps, reports the file and line` },
            { type: "info", content: "Making the check explicit keeps hot loops free of branches you did not ask for, while giving you a one-character way to be safe wherever the index came from outside." },
          ],
        },
        {
          id: "strings",
          title: "Strings",
          blocks: [
            { type: "text", content: "A string literal has type `char[]` — an array of characters, so it carries its own length and is not NUL-terminated. Everything that works on arrays works on strings, including slicing." },
            { type: "text", content: "For text you need to build up, the standard library provides `String`: a growable buffer with a destructor, so it frees itself when it leaves scope." },
            { type: "code", label: "strings.ura", code: `use "@/header"

main():
    // char[] is a slice: a pointer and a length
    plain char[] = "hello"
    output(plain, " len ", plain.len, " first ", plain[0], "\\n")

    // String is a growable buffer from the standard library
    s String = String::from("hello")
    s.join(" world")
    s.push('!')
    output(s.value, " len ", s.len(), "\\n")

    output(s.upper().value, " ", s.lower().value, "\\n")
    output(s.substr(0, 5).value, " ", s.reverse().value, "\\n")
    output(s.find("world"), " ", s.contains("lo w"), "\\n")
    output(s.starts_with("hello"), " ", s.ends_with("!"), "\\n")

    trimmed String = String::from("   padded   ")
    output("[", trimmed.trim().value, "]\\n")

    swapped String = String::from("a-b-c")
    output(swapped.replace("-", "+").value, "\\n")

    output(String::from("ab").repeat(3).value, "\\n")
    output(String::from_int(1234).value, " ", String::from("42").to_int(), "\\n")

    // operators are overloaded, against String and against char[]
    a String = String::from("abc")
    b String = a + "def"
    output(b.value, " ", a == "abc", " ", a < b, "\\n")` },
            { type: "output", label: "output", code: `hello len 5 first h
hello world! len 12
HELLO WORLD! hello world!
hello !dlrow olleh
6 True
True True
[padded]
a+b+c
ababab
1234 42
abcdef True True` },
            { type: "heading", content: "The String API" },
            { type: "table", headers: ["Group", "Members"],
              rows: [
                ["Construct", "`String::create()`, `String::from(char[])`, `String::from_int(i32)`"],
                ["Inspect", "`.len()`, `.empty()`, `.at(i)`, `.value`, `.c_str()`"],
                ["Modify", "`.push(c)`, `.pop()`, `.join(s)`, `.assign(s)`, `.clear()`"],
                ["Search", "`.find(s)`, `.contains(s)`, `.starts_with(s)`, `.ends_with(s)`"],
                ["Transform", "`.upper()`, `.lower()`, `.trim()`, `.substr(i, n)`, `.replace(a, b)`, `.repeat(n)`, `.reverse()`"],
                ["Convert", "`.to_int()`, `.compare(other)`"],
                ["Operators", "`+` `+=` `==` `!=` `<` `>` `=` — against a `String` or a `char[]` literal"],
              ]
            },
            { type: "info", content: "`.at(i)` is bounds-safe, and `.c_str()` hands you a NUL-terminated copy for passing to C. The buffer grows on demand and `operator drop` releases it at scope exit." },
          ],
        },
        {
          id: "structs",
          title: "Structs",
          blocks: [
            { type: "text", content: "A `struct` groups fields under one name. Fields are declared one per line in the indented body, and every one is zeroed until you assign it." },
            { type: "code", label: "structs.ura", code: `struct Stats:
    atk i32
    def i32

struct Hero:
    name  char[]
    stats Stats
    gear  char[][]

fn buff(h Hero) void:
    h.stats.atk = 999

main():
    // every field is zeroed until you set it
    blank Hero
    output(blank, "\\n")

    h Hero
    h.name = "Aldric"
    h.stats.atk = 18
    h.stats.def = 7
    h.gear = ["sword", "shield"]
    output(h, "\\n")

    // assignment copies the whole struct
    copy Hero = h
    copy.name = "Copy"
    output(h.name, " vs ", copy.name, "\\n")

    // so does passing one by value
    buff(h)
    output("after buff ", h.stats.atk, "\\n")

    // arrays of structs
    party Hero[] = Hero[2]
    party[0].name = "First"
    party[1].name = "Second"
    for p in party:
        output(p.name, " ")
    output("\\n")` },
            { type: "output", label: "output", code: `Hero{name: , stats: Stats{atk: 0, def: 0}, gear: []}
Hero{name: Aldric, stats: Stats{atk: 18, def: 7}, gear: [sword, shield]}
Aldric vs Copy
after buff 18
First Second` },
            { type: "text", content: "Structs are values. Assigning one copies every field, and so does passing one to a by-value parameter — which is why `buff` above changes nothing the caller can see. Take a `ref` parameter when you mean to mutate." },
            { type: "info", content: "Printing a struct needs no work from you: `output` walks the fields and prints them recursively, nested structs and arrays included." },
            { type: "warning", content: "A struct cannot contain itself by value — that would need infinite space, and the compiler says so. Point at your own type through a `ref?` field instead (see Recursive Data)." },
          ],
        },
        {
          id: "methods",
          title: "Methods & Statics",
          blocks: [
            { type: "text", content: "Functions declared inside a struct body are its methods. A plain `fn` takes an implicit `self`; a `pub fn` takes none and is called on the type itself with `::`." },
            { type: "code", label: "methods.ura", code: `struct Counter:
    value i32
    step  i32

    // pub = static: no self, called with Counter::create(...)
    pub fn create(step i32) Counter:
        c Counter
        c.step = step
        ret c

    // no pub = instance method, with an implicit self
    fn bump() void:
        self.value = self.value + self.step

    fn peek() i32:
        ret self.value

    // methods can call their siblings in either order
    fn bump_twice() void:
        self.bump()
        self.bump()

struct Point:
    x i32
    y i32

    pub fn at(x i32, y i32) Point:
        p Point
        p.x = x
        p.y = y
        ret p

    fn sum() i32:
        ret self.x + self.y

main():
    c Counter = Counter::create(5)
    c.bump()
    c.bump_twice()
    output("counter ", c.peek(), "\\n")

    // chain a field or a method straight onto the constructor
    output(Point::at(3, 4).x, " ", Point::at(3, 4).sum(), "\\n")` },
            { type: "output", label: "output", code: `counter 15
3 7` },
            { type: "table", headers: ["Declared", "Called", "Receives"],
              rows: [
                ["`fn bump() void:`", "`c.bump()`", "an implicit `self`"],
                ["`pub fn create(...) T:`", "`Counter::create(...)`", "nothing — it is a static"],
              ]
            },
            { type: "text", content: "There is no built-in constructor that runs on declaration. The convention is a `pub fn create` that builds the value and returns it, which keeps construction an ordinary, visible function call." },
            { type: "warning", content: "The two forms do not mix: calling a static with `.` or an instance method with `::` is a compile error that names the right form to use." },
          ],
        },
        {
          id: "enums",
          title: "Enums",
          blocks: [
            { type: "text", content: "An `enum` declares named integer constants. Values start at zero and count up, and writing an explicit value resets the counter from there." },
            { type: "code", label: "enums.ura", code: `// values start at 0 and count up
enum Dir: NORTH, EAST, SOUTH, WEST

// an explicit value resets the counter
enum Code:
    OK = 200,
    MOVED = 301,
    NOT_FOUND = 404,
    TEAPOT,

// an enum can be a struct field
struct Move:
    dir  Dir
    cost i32

fn name(d Dir) char[]:
    match d:
        case NORTH: ret "north"
        case EAST:  ret "east"
        case SOUTH: ret "south"
        default:    ret "west"

main():
    d Dir = SOUTH
    output(d as i32, " ", name(d), "\\n")
    output(OK as i32, " ", NOT_FOUND as i32, " ", TEAPOT as i32, "\\n")

    // variants are plain integers, so they index an array
    costs i32[] = [1, 2, 3, 4]
    output("cost of west ", costs[WEST as i32], "\\n")

    m Move
    m.dir  = EAST
    m.cost = 5
    output(name(m.dir), " costs ", m.cost, "\\n")

    if d == SOUTH: output("heading south\\n")` },
            { type: "output", label: "output", code: `2 south
200 404 405
cost of west 4
east costs 5
heading south` },
            { type: "text", content: "`TEAPOT` comes out as `405` — it continues from the `404` before it. A one-line form works too: `enum Color: RED, GREEN, BLUE`." },
            { type: "info", content: "Variants live in the enclosing scope, so you write `SOUTH` rather than `Dir::SOUTH`. An enum name is also a real type, usable for variables, struct fields, parameters and return types." },
            { type: "warning", content: "An empty enum, a duplicated variant, and a non-integer explicit value are each compile errors." },
          ],
        },
      ],
    },
    {
      label: "References & Nullability",
      sections: [
        {
          id: "references",
          title: "References",
          blocks: [
            { type: "text", content: "A reference is a second name for an existing variable, not a pointer you can do arithmetic on. `ref x T = ref y` binds once, and from then on every read and write through `x` lands in `y`." },
            { type: "code", label: "refs.ura", code: `struct Hero:
    hp i32

fn strongest(party Hero[]) ref Hero:
    best i32 = 0
    for i in 1..party.len:
        if party[i].hp > party[best].hp: best = i
    ret ref party[best]

main():
    hp i32 = 100

    // bind once; every read and write goes to hp
    ref r i32 = ref hp
    r = 40
    output("hp ", hp, "\\n")
    r += 10
    output("hp ", hp, "\\n")

    // two names, one variable
    ref again i32 = ref hp
    output("same storage ", ref again == ref r, "\\n")

    // rebinding vs writing through
    a i32 = 1
    b i32 = 2
    ref cur i32 = ref a
    cur = 99          // writes into a
    cur = ref b       // now points at b
    cur = 77          // writes into b
    output(a, " ", b, "\\n")

    // a function can return a reference into an array
    party Hero[] = Hero[3]
    party[0].hp = 10
    party[1].hp = 40
    party[2].hp = 25
    ref champ Hero = strongest(party)
    champ.hp = champ.hp - 15
    output("champion now ", party[1].hp, "\\n")` },
            { type: "output", label: "output", code: `hp 40
hp 50
same storage True
99 77
champion now 25` },
            { type: "heading", content: "Writing through vs rebinding" },
            { type: "text", content: "This is the distinction that matters most. `cur = 99` writes the value 99 into whatever `cur` currently names. `cur = ref b` leaves the old target untouched and points `cur` somewhere new. The `ref` keyword at the call site is what tells the two apart." },
            { type: "table", headers: ["Written", "Means"],
              rows: [
                ["`ref r i32 = ref hp`", "bind `r` to `hp` (required at declaration)"],
                ["`r = 5`", "write 5 into `hp`"],
                ["`r = ref other`", "rebind `r` to `other`"],
                ["`ref a == ref b`", "do these two name the same storage?"],
              ]
            },
            { type: "heading", content: "Returning a reference" },
            { type: "text", content: "A function declared `ref T` returns a reference rather than a copy, so the caller can write through it — `strongest` above hands back the actual array element, and mutating it changes the array." },
            { type: "warning", content: "A non-nullable `ref` must be bound where it is declared; there is no unbound state to read by accident. Binding to a literal, or to something that has no storage, is a compile error." },
          ],
        },
        {
          id: "nullable",
          title: "Nullable Types",
          blocks: [
            { type: "text", content: "`T?` holds a `T` or `null`. Nullable and non-nullable are genuinely different types, and the compiler will not let you confuse them — which is what makes `null` safe to have at all." },
            { type: "code", label: "nullable.ura", code: `fn find_weapon(chest i32) char[]?:
    if chest == 1: ret "Iron Sword"
    if chest == 2: ret "Magic Staff"
    ret null

main():
    loot char[]? = find_weapon(1)
    if loot != null:
        output("found ", loot?, "\\n")

    empty char[]? = find_weapon(99)
    if empty == null:
        output("chest is empty\\n")

    // ?? supplies a default and produces a real char[]
    named char[] = empty ?? "nothing"
    output(named, "\\n")

    // ?? chains left to right until something is non-null
    a char[]? = null
    b char[]? = null
    output(a ?? b ?? "last resort", "\\n")

    // a non-null value widens into an optional for free
    sure  char[]  = "Iron Sword"
    maybe char[]? = sure
    output(maybe?, "\\n")` },
            { type: "output", label: "output", code: `found Iron Sword
chest is empty
nothing
last resort
Iron Sword` },
            { type: "heading", content: "? guards a use, ?? produces a value" },
            { type: "text", content: "These two are not interchangeable, and it is the single most common thing to get wrong. `x?` unwraps for one use and traps if it was null. `??` supplies a fallback, and it is the only one of the two that yields a genuine non-nullable `T` you can assign." },
            { type: "code", label: "narrowing.ura", code: `main():
    maybe char[]? = "Iron Sword"

    output(maybe?, "\\n")          // ok: guarded read
    named char[] = maybe          // error: 'maybe' may be null
    named char[] = maybe?         // error: ? does not narrow the type
    named char[] = maybe ?? ""    // ok: ?? lands in a char[]` },
            { type: "heading", content: "Checks that cannot fire are errors" },
            { type: "table", headers: ["You write", "On a `T?`", "On a plain `T`"],
              rows: [
                ["`x == null` / `x != null`", "narrows", "**error** — never null"],
                ["`x ?? d`", "uses `d` when null", "**error** — `d` unreachable"],
                ["`a ?? b ?? c`", "chains", "the last one must be non-null"],
                ["`x = null`", "ok", "**error** — needs an optional target"],
                ["`x?`", "traps if null", "accepted, does nothing"],
              ]
            },
            { type: "text", content: "The same split applies to references. `ref x T` must be bound at its declaration and can never be null; `ref? x T` may be unbound or `null`, and a guarded use `x?` traps rather than following a dangling pointer." },
          ],
        },
        {
          id: "recursive-data",
          title: "Recursive Data",
          blocks: [
            { type: "text", content: "A struct cannot contain itself by value — that would need infinite space. It can point at itself through a `ref?` field, which is how lists and trees are built." },
            { type: "code", label: "linked.ura", code: `struct Node:
    value i32
    ref? next Node

struct Chain:
    ref? head Node

    fn push(ref node Node) void:
        node.next = ref self.head
        self.head = ref node

    fn walk() void:
        ref? cur Node = ref self.head
        while cur != null:
            output(cur.value, " ")
            cur = ref cur.next
        output("\\n")

    fn total() i32:
        sum i32 = 0
        ref? cur Node = ref self.head
        while cur != null:
            sum = sum + cur.value
            cur = ref cur.next
        ret sum

main():
    a Node
    b Node
    c Node
    a.value = 1
    b.value = 2
    c.value = 3

    lst Chain
    lst.push(ref a)
    lst.push(ref b)
    lst.push(ref c)

    lst.walk()
    output("sum ", lst.total(), "\\n")

    // drop the head by rebinding through the chain
    lst.head = ref lst.head.next
    lst.walk()` },
            { type: "output", label: "output", code: `3 2 1
sum 6
2 1` },
            { type: "text", content: "`cur = ref cur.next` is the walking idiom: it rebinds the cursor to the next link rather than writing into the current one. The loop ends when the cursor compares equal to `null`." },
            { type: "info", content: "`output` follows `ref?` fields when it prints a struct, and it detects cycles — a structure that points back at itself prints `[Circular]` instead of recursing forever." },
          ],
        },
      ],
    },
    {
      label: "Memory",
      sections: [
        {
          id: "heap-arrays",
          title: "Heap Arrays",
          blocks: [
            { type: "text", content: "`new T[n]` allocates an array on the heap, sized at runtime and zeroed. `clean` releases it. There is no garbage collector — the pair is yours to write, and nothing runs behind your back." },
            { type: "code", label: "heaparrays.ura", code: `main():
    // sized at runtime, zeroed, lives until you clean it
    n i32 = 4
    buf i32[] = new i32[n]
    for i in 0..n:
        buf[i] = i * i
    output(buf, " len ", buf.len, "\\n")

    // multi-dimensional heap allocation
    grid i32[][] = new i32[2][3]
    grid[1][2] = 9
    output(grid, "\\n")

    // clean frees the buffer and nulls the variable
    clean buf
    clean grid

    // cleaning twice is a no-op, not a double free
    clean buf
    output("survived double clean\\n")` },
            { type: "output", label: "output", code: `[0, 1, 4, 9] len 4
[[0, 0, 0], [0, 0, 9]]
survived double clean` },
            { type: "text", content: "`clean` nulls the variable as well as freeing it, which is what makes a second `clean` harmless and makes a guarded access `buf[0]?` afterwards trap instead of touching freed memory." },
            { type: "warning", content: "An unguarded read after `clean` is undefined, exactly as it would be in C. Use `?` on any access whose index or lifetime you are not certain of." },
          ],
        },
        {
          id: "heap-objects",
          title: "Heap Objects",
          blocks: [
            { type: "text", content: "Drop the `[n]` and `new T` allocates a single zeroed object, handing back its address. It binds to a nullable reference, which is what lets a function build a node and return it to its caller." },
            { type: "code", label: "heapobjects.ura", code: `struct Node:
    value i32
    ref? left  Node
    ref? right Node

    pub fn create(v i32) ref? Node:
        ref? n Node = new Node
        n.value = v
        ret ref n

    @no-warn
    operator drop:
        clean self.left
        clean self.right

fn sum(ref? n Node) i32:
    if n == null: ret 0
    ret n.value + sum(ref n.left) + sum(ref n.right)

main():
    // new T allocates one zeroed object and hands back its address
    ref? root Node = Node::create(1)
    ref? l Node = Node::create(2)
    ref? r Node = Node::create(3)
    root.left  = ref l
    root.right = ref r

    output("sum ", sum(ref root), "\\n")

    // one clean frees the whole tree: drop cascades into the children
    clean root
    output("root is null: ", root == null, "\\n")` },
            { type: "output", label: "output", code: `sum 6
root is null: True` },
            { type: "heading", content: "What clean does, in order" },
            { type: "text", content: "`clean x` on a heap object runs three steps: it calls `operator drop`, frees the memory, then sets `x` to `null`. Running the destructor first is what makes one `clean root` collapse an entire tree — each node's `drop` cleans its children before it dies." },
            { type: "table", headers: ["", "`new T[n]`", "`new T`"],
              rows: [
                ["Result", "an array (pointer + length)", "one zeroed object"],
                ["Binds to", "`T[]`", "`ref? T`"],
                ["`clean`", "frees the buffer", "`operator drop` → free → null"],
              ]
            },
            { type: "info", content: "The example above allocates three nodes and frees them with a single `clean`. Checked with `leaks --atExit`: 0 leaks for 0 total leaked bytes." },
            { type: "warning", content: "`ref` binds to a variable, not to an expression — `root.left = ref make()` is rejected. Store the result in a local first, as the example does." },
          ],
        },
        {
          id: "destructors",
          title: "Destructors",
          blocks: [
            { type: "text", content: "`operator drop` is a struct's destructor. The compiler runs it at every point a value stops being reachable, and those points are fixed at compile time — there is no collector deciding later." },
            { type: "code", label: "destructors.ura", code: `struct Res:
    id i32

    pub fn create(id i32) Res:
        r Res
        r.id = id
        output("  open  ", id, "\\n")
        ret r

    @no-warn
    operator drop:
        output("  close ", self.id, "\\n")

struct Owner:
    tag  i32
    held Res

    @no-warn
    operator drop:
        output("  owner ", self.tag, " going\\n")

fn scope_exit() void:
    output("scope_exit:\\n")
    a Res = Res::create(1)
    b Res = Res::create(2)

fn early(flag bool) void:
    output("early:\\n")
    a Res = Res::create(3)
    if flag:
        return
    output("  not reached\\n")

fn in_a_loop() void:
    output("in_a_loop:\\n")
    for i in 0..2:
        r Res = Res::create(10 + i)

fn owned() void:
    output("owned:\\n")
    o Owner
    o.tag = 7
    o.held = Res::create(99)

main():
    scope_exit()
    early(True)
    in_a_loop()
    owned()` },
            { type: "output", label: "output", code: `scope_exit:
  open  1
  open  2
  close 2
  close 1
early:
  open  3
  close 3
in_a_loop:
  open  10
  close 10
  open  11
  close 11
owned:
  open  99
  owner 7 going
  close 99` },
            { type: "text", content: "Read the order: locals die in reverse declaration order, an early `return` still runs them, each loop iteration destroys its own, and an owned field is destroyed after its owner's `drop` body has finished." },
            { type: "heading", content: "Where drop runs" },
            { type: "list", items: [
              "At the end of the enclosing scope, in reverse declaration order",
              "On `return`, including an early one — the returned value itself survives",
              "On `break` and `continue`, for everything the jump leaves behind",
              "Once per loop iteration, for values declared inside the body",
              "At the end of the statement, for temporaries",
              "On `clean`, for a heap object — before the memory is freed",
            ]},
            { type: "heading", content: "Owned versus borrowed" },
            { type: "text", content: "Fields held by value are owned, and are destroyed with their parent, recursively, at any depth. Fields held through `ref?` are borrowed and are **not** destroyed automatically — so two structs pointing at the same object cannot double-free it. Freeing a borrowed field is an explicit `clean` in your own `drop`." },
            { type: "heading", content: "The copy warning, and @no-warn" },
            { type: "text", content: "A struct with `operator drop` but no `operator =` earns a warning: copying it would produce two owners of the same memory and destroy both. Define `operator =` to deep-copy, or write `@no-warn` above the destructor when the type is never copied — which is why the examples here carry it." },
            { type: "code", label: "nowarn.ura", code: `struct Node:
    ref? next Node

    @no-warn
    operator drop:
        clean self.next` },
            { type: "info", content: "`@no-warn` silences only the declaration directly below it, and only warnings — errors are never suppressed." },
          ],
        },
      ],
    },
    {
      label: "Operators & Printing",
      sections: [
        {
          id: "operator-overloading",
          title: "Operator Overloading",
          blocks: [
            { type: "text", content: "A struct can define what the built-in operators mean for it. Overloads are dispatched on the type of the right-hand side, so one operator can have several meanings, and each may return whatever type makes sense." },
            { type: "code", label: "overload.ura", code: `struct Vec:
    x i32
    y i32

    pub fn create(x i32, y i32) Vec:
        v Vec
        v.x = x
        v.y = y
        ret v

    // one operator, several right-hand types
    operator +(other Vec) Vec:
        ret Vec::create(self.x + other.x, self.y + other.y)

    operator +(n i32) Vec:
        ret Vec::create(self.x + n, self.y + n)

    // an overload may return whatever makes sense
    operator *(other Vec) i32:
        ret self.x * other.x + self.y * other.y

    operator ==(other Vec) bool:
        ret self.x == other.x and self.y == other.y

    operator +=(other Vec) void:
        self.x = self.x + other.x
        self.y = self.y + other.y

    operator output() char[]:
        ret "a vector"

main():
    a Vec = Vec::create(1, 2)
    b Vec = Vec::create(10, 20)

    output((a + b).x, " ", (a + b).y, "\\n")
    output((a + 100).x, "\\n")
    output("dot ", a * b, "\\n")
    output(a == b, " ", a == Vec::create(1, 2), "\\n")

    a += b
    output(a.x, " ", a.y, "\\n")

    output(a, "\\n")` },
            { type: "output", label: "output", code: `11 22
101
dot 50
False True
11 22
a vector` },
            { type: "heading", content: "The overloadable set" },
            { type: "table", headers: ["Group", "Operators"],
              rows: [
                ["Arithmetic", "`+` `-` `*` `/` `%`"],
                ["Bitwise", "`&` `|` `^` `<<` `>>`"],
                ["Comparison", "`==` `!=` `<` `>` `<=` `>=`"],
                ["Compound", "`+=` `-=` `*=` `/=` `%=` `&=` `|=` `^=` `<<=` `>>=`"],
                ["Assignment", "`=` — see below"],
                ["Lifetime", "`drop` — the destructor"],
                ["Printing", "`output` — see the next section"],
              ]
            },
            { type: "heading", content: "operator = runs on reassignment only" },
            { type: "text", content: "Declaring a variable from another value is a bitwise copy; `operator =` runs when you assign to one that already exists. That is the hook for deep-copying an owned buffer, and the reason a type with `operator drop` and no `operator =` gets a warning." },
            { type: "warning", content: "Using an operator on a struct that has no overload for it is a compile error naming the operator and the type — never a silent field-by-field guess." },
          ],
        },
        {
          id: "printing",
          title: "Printing",
          blocks: [
            { type: "text", content: "`output` formats each argument from its static type, and knows how to walk a struct: fields are printed recursively, arrays expanded, bound references followed." },
            { type: "code", label: "printing.ura", code: `struct Inner:
    n i32

struct Outer:
    label char[]
    inner Inner
    list  i32[]
    ref? peer Outer

struct Tagged:
    id i32

    operator output() char[]:
        ret "a tagged value"

main():
    // every scalar type formats itself
    output(42, " ", 9000000000, " ", 'x', " ", True, " ", 1.5, "\\n")

    // structs expand recursively, arrays included
    o Outer
    o.label = "root"
    o.inner.n = 7
    o.list = [1, 2, 3]
    output(o, "\\n")

    // a bound ref? is followed; an unbound one prints null
    other Outer
    other.label = "leaf"
    o.peer = ref other
    output(o.peer, "\\n")

    // a cycle is detected instead of recursing forever
    other.peer = ref o
    output(o, "\\n")

    // operator output replaces the default dump
    t Tagged
    t.id = 1
    output(t, "\\n")` },
            { type: "output", label: "output", code: `42 9000000000 x True 1.500000
Outer{label: root, inner: Inner{n: 7}, list: [1, 2, 3], peer: null}
Outer{label: leaf, inner: Inner{n: 0}, list: [], peer: null}
Outer{label: root, inner: Inner{n: 7}, list: [1, 2, 3], peer: ref Outer{label: leaf, inner: Inner{n: 0}, list: [], peer: ref [Circular]}}
a tagged value` },
            { type: "text", content: "The cycle in the fourth line would be infinite recursion in a naive printer. `output` threads a chain of what it has already visited down the walk and prints `[Circular]` when it meets one again." },
            { type: "heading", content: "How each type is formatted" },
            { type: "table", headers: ["Type", "Printed as"],
              rows: [
                ["`i8`…`i64`, `u8`…`u64`", "decimal, sign-aware"],
                ["`f32`, `f64`", "fixed point, e.g. `1.500000`"],
                ["`bool`", "`True` / `False`"],
                ["`char`", "the character itself"],
                ["`char[]`", "the text, using the slice's length"],
                ["`T[]`", "`[a, b, c]`, nested arrays included"],
                ["a struct", "`Name{field: value, ...}`, recursive"],
                ["an unbound `ref?`", "`null`"],
                ["a cycle", "`[Circular]`"],
              ]
            },
            { type: "heading", content: "Custom printing" },
            { type: "text", content: "Define `operator output()` returning `char[]` (or a `String`) and it replaces the default dump for that type everywhere, including when the struct is nested inside another." },
            { type: "warning", content: "Return `char[]` or `String` and nothing else. A printer returning some other struct is read as though it were a `char[]` and crashes at runtime — `String` works only because its first two fields happen to match the layout of a slice." },
          ],
        },
      ],
    },
    {
      label: "Code Organization",
      sections: [
        {
          id: "modules",
          title: "Modules",
          blocks: [
            { type: "text", content: "`use` brings in another file. `mod` carves a namespace inside the file you are already writing. Members are reached with `::` — the same operator that calls a `pub fn` on a type." },
            { type: "code", label: "modules.ura", code: `mod Lexer:
    fn run(text char[]) i32:
        ret text.len as i32

    fn helper() char[]:
        // siblings inside a module are called unqualified
        ret describe()

    fn describe() char[]:
        ret "lexer module"

mod Geo:
    enum Kind: CIRCLE, SQUARE

    struct Point:
        x i32
        y i32

        pub fn make(v i32) Point:
            p Point
            p.x = v
            ret p

    mod Deep:
        fn nested() i32:
            ret 42

main():
    output(Lexer::run("2 * (3 + 4)"), "\\n")
    output(Lexer::helper(), "\\n")

    p Geo::Point = Geo::Point::make(3)
    k Geo::Kind  = Geo::CIRCLE
    output(p.x, " ", k == Geo::CIRCLE, "\\n")

    output(Geo::Deep::nested(), "\\n")` },
            { type: "output", label: "output", code: `11
lexer module
3 True
42` },
            { type: "text", content: "A module body holds declarations — `fn`, `struct`, `enum` and further `mod`. Modules nest to any depth, may be used before the line that declares them, and inside one, siblings are called without the prefix." },
            { type: "table", headers: ["Written", "Reaches"],
              rows: [
                ["`use \"path\"`", "another file"],
                ["`mod name:` then `name::x`", "a namespace inside this file"],
                ["`Type::method()`", "a `pub fn` static"],
                ["`value.method()`", "an instance method"],
              ]
            },
            { type: "warning", content: "`::` is not `.` — reaching a module member with a dot is a compile error. A bare statement inside a module body is one too: modules hold declarations, not code to run." },
          ],
        },
        {
          id: "imports",
          title: "Imports",
          blocks: [
            { type: "text", content: "`use \"name\"` loads another `.ura` file, resolved relative to the file doing the importing. A leading `@/` resolves against the standard library instead." },
            { type: "code", label: "imports.ura", code: `use "helper"        // helper.ura, next to this file
use "sub/deep"      // sub/deep.ura
use "@/string"      // the standard library's string module
use "@/header"      // every stdlib module at once` },
            { type: "text", content: "A file is loaded once no matter how many paths reach it, so a diamond of imports is silent rather than a redefinition error. An import cycle warns and still compiles." },
            { type: "heading", content: "The standard library" },
            { type: "table", headers: ["Module", "Contents"],
              rows: [
                ["`@/io`", "printf, fopen, fread, fwrite, dprintf, …"],
                ["`@/string`", "strlen, strcmp, strcpy … and the `String` type"],
                ["`@/memory`", "malloc, calloc, realloc, free"],
                ["`@/stdlib`", "atoi, rand, srand, exit, …"],
                ["`@/math`", "sin, cos, sqrt, pow, …"],
                ["`@/ctype`", "isalpha, isdigit, tolower, …"],
                ["`@/net`", "socket, bind, listen, accept, send, recv"],
                ["`@/time`", "time, clock, difftime"],
                ["`@/unistd`", "read, write, close, fork, …"],
                ["`@/fcntl`, `@/stat`, `@/dirent`", "file descriptors, stat, directories"],
                ["`@/signals`, `@/errno`", "signal handling, errno"],
                ["`@/error`", "the throwable `Error` struct"],
                ["`@/header`", "everything above at once"],
              ]
            },
            { type: "info", content: "`@/header` pulls in fourteen modules but deliberately not `@/error`, `@/dirent` or `@/raylib` — import those explicitly. A program that throws typically starts with both `use \"@/header\"` and `use \"@/error\"`." },
            { type: "heading", content: "Linking a C header" },
            { type: "text", content: "`link \"file.h\"` is the top-level directive for pulling in a C header when you are binding to a library, alongside the `proto` declarations that give its functions Ura signatures." },
          ],
        },
        {
          id: "directives",
          title: "Compile-Time Directives",
          blocks: [
            { type: "text", content: "`@if` / `@elif` / `@else` select code by target platform. The branch that does not match is removed **before parsing**, so it may contain declarations that would not even be valid on this target." },
            { type: "code", label: "directives.ura", code: `// the branch that does not match is removed before parsing,
// so it may contain code that would not even compile here
@if unix:
    proto fn getpid() i32
@else:
    proto fn GetCurrentProcessId() u32

struct Owned:
    tag i32

    @no-warn
    operator drop:
        output("dropping ", self.tag, "\\n")

main():
    @if macos:
        output("built for macOS\\n")
    @elif linux:
        output("built for Linux\\n")
    @else:
        output("built for something else\\n")

    @if unix:
        output("pid > 0: ", getpid() > 0, "\\n")

    o Owned
    o.tag = 1` },
            { type: "output", label: "output (macOS build)", code: `built for macOS
pid > 0: True
dropping 1` },
            { type: "text", content: "The tags are `macos`, `linux`, `windows` and `unix`, and the platform comes from the LLVM target triple — there are no `-D` flags to pass. Directives work at the top level and inside a function body." },
            { type: "heading", content: "@no-warn" },
            { type: "text", content: "`@no-warn` silences the warning attached to the declaration directly below it, and only that one. The usual use is a struct that owns memory through a `ref?` field, where `operator drop` is deliberate and `operator =` is not wanted." },
            { type: "info", content: "Only warnings are suppressed. Errors always fire." },
          ],
        },
      ],
    },
    {
      label: "Errors",
      sections: [
        {
          id: "exceptions",
          title: "Exceptions",
          blocks: [
            { type: "text", content: "`throw` unwinds to the nearest enclosing `catch`, across as many call frames as it takes. The only throwable type is `Error`, from `@/error` — an ordinary struct with a `message` field and a `pub fn make`." },
            { type: "code", label: "exceptions.ura", code: `use "@/error"

fn divide(a i32, b i32) i32:
    if b == 0: throw Error::make("division by zero")
    ret a / b

fn compute(a i32, b i32) i32:
    // no try here: the throw travels straight through
    ret divide(a, b) * 2

fn risky() void:
    try:
        throw Error::make("inner")
    catch e:
        output("inner caught: ", e.message, "\\n")
        throw Error::make("rethrown from the catch")

main():
    try:
        output("ok: ", compute(10, 5), "\\n")
        output("bad: ", compute(8, 0), "\\n")
        output("never reached\\n")
    catch e:
        output("caught: ", e.message, "\\n")

    // nesting: the innermost catch wins
    try:
        try:
            throw Error::make("deep")
        catch e:
            output("inner handler: ", e.message, "\\n")
    catch e:
        output("not reached\\n")

    // a catch can throw again
    try:
        risky()
    catch e:
        output("outer caught: ", e.message, "\\n")

    // break leaves the loop from inside a try
    for i in 0..5:
        try:
            if i == 2: break
            output("i ", i, "\\n")
        catch e:
            output("unused\\n")
    output("done\\n")` },
            { type: "output", label: "output", code: `ok: 4
caught: division by zero
inner handler: deep
inner caught: inner
outer caught: rethrown from the catch
i 0
i 1
done` },
            { type: "heading", content: "How it is compiled" },
            { type: "text", content: "There are no unwind tables and no libunwind. A `throw` sets a global error flag and value, then branches; every call site that could throw tests the flag and either jumps to the enclosing `catch` or returns so its own caller can propagate. The cost is one compare per fallible call, and the binary carries no `.eh_frame`." },
            { type: "heading", content: "Behaviour worth knowing" },
            { type: "list", items: [
              "Only `Error` can be thrown — throwing anything else is a compile error",
              "Code after a `throw` in the same block is unreachable and is dropped",
              "`try` blocks nest, and the innermost `catch` wins",
              "A `catch` may throw again, to hand a different error upward",
              "`return` inside a `try` returns from the function; `break` exits the enclosing loop",
              "An uncaught throw reaching `main` prints its message and exits non-zero",
            ]},
          ],
        },
        {
          id: "runtime-traps",
          title: "Runtime Traps",
          blocks: [
            { type: "text", content: "Traps are not exceptions. They are the checks the compiler inserts where continuing would be undefined — they print the source location and stop the program, and they cannot be caught." },
            { type: "code", label: "trap.ura", code: `main():
    a i32[] = [1, 2, 3]
    output("before the trap\\n")
    output(a[9]?, "\\n")
    output("never reached\\n")` },
            { type: "output", label: "stderr, exit 1", code: `runtime error: array index out of bounds
  trap.ura:4:13
  |
4 |     output(a[9]?, "\\n")
  |             ^` },
            { type: "table", headers: ["Trap", "Raised by"],
              rows: [
                ["array index out of bounds", "`a[i]?` past the end"],
                ["slice out of bounds", "`a[lo..hi]?` past the end"],
                ["use after clean", "reading a freed array or object"],
                ["unbound reference", "`x?` on a `ref?` that was never bound"],
                ["divide by zero", "integer **and** float division"],
                ["null function value", "calling a zero-initialised `fn` variable"],
                ["stack overflow", "runaway recursion"],
              ]
            },
            { type: "info", content: "Bounds checks are opt-in per access: `a[i]` is unchecked, `a[i]?` is checked. That keeps hot loops branch-free while making the safe version one character away." },
            { type: "warning", content: "Because traps abort rather than throw, `try`/`catch` will not save you from one. Guard the access with `?` and handle the condition yourself if it is recoverable." },
          ],
        },
      ],
    },
    {
      label: "C Interop & System",
      sections: [
        {
          id: "c-interop",
          title: "C Interoperability",
          blocks: [
            { type: "text", content: "`proto fn` declares a C function so Ura knows its signature. There is no binding layer and no marshalling — the call goes straight through, because Ura already uses the platform's C ABI." },
            { type: "code", label: "interop.ura", code: `// declare a C function and call it — no headers, no bindings
proto fn puts(str pointer) i32
proto fn abs(n i32) i32
proto fn strlen(s pointer) i64

// variadics work too
proto fn printf(fmt pointer, ...) i32

main():
    puts("straight to libc")
    output(abs(-42), " ", strlen("hello"), "\\n")
    printf("%s scored %d (%.1f%%)\\n", "ura", 95, 95.0)` },
            { type: "output", label: "output", code: `straight to libc
42 5
ura scored 95 (95.0%)` },
            { type: "text", content: "`...` marks a variadic, and the usual C promotions apply at the call: sub-`i32` integers widen, `f32` widens to double. A `proto` may be declared before or after the code that calls it." },
            { type: "heading", content: "Linking a library" },
            { type: "text", content: "`link \"file.h\"` names a header to pull in, and setting `URA_LINK_<name>` in the environment passes the corresponding linker flags — that is how the `@/raylib` bindings work." },
            { type: "info", content: "The standard library is nothing but `proto` declarations in `.ura` files. `printf`, `calloc`, `free`, `write` and `exit` are declared in `common.ura`, which every program loads — so the compiler depends on that file rather than having libc hardcoded into its backend." },
            { type: "warning", content: "Redeclaring a prelude function with a different signature is an error. Identical declarations collapse harmlessly, which is why importing several modules that each declare `write` is fine." },
          ],
        },
        {
          id: "os",
          title: "Command Line & Environment",
          blocks: [
            { type: "text", content: "A global `os` is populated before `main` runs when you `use \"@/header\"`. It carries the argument count, the argument vector, and a lookup for environment variables." },
            { type: "code", label: "os.ura", code: `use "@/header"

main():
    output("argc ", os.argc, "\\n")
    for i in 0..os.argv.len:
        output("  argv[", i, "] ", os.argv[i], "\\n")

    home pointer = os.get("HOME")
    output("HOME is set: ", home != null, "\\n")` },
            { type: "output", label: "output", code: `argc 1
  argv[0] ./exe.out
HOME is set: True` },
            { type: "table", headers: ["Member", "Type", "Is"],
              rows: [
                ["`os.argc`", "`i32`", "the argument count"],
                ["`os.argv`", "`char[][]`", "the arguments, `argv[0]` being the program"],
                ["`os.get(name)`", "`pointer`", "an environment variable, or null"],
              ]
            },
          ],
        },
      ],
    },
    {
      label: "Real Programs",
      sections: [
        {
          id: "project-calculator",
          title: "A Recursive-Descent Calculator",
          blocks: [
            { type: "text", content: "A complete expression compiler in one file: a lexer in its own module, a recursive-descent parser building a heap AST, a tree printer, and an evaluator that throws on division by zero. Nothing here is elided." },
            { type: "text", content: "It exercises most of the language at once — `enum`, `struct`, `pub fn` statics, `mod`, `new`/`clean`, `operator drop` cascading through a tree, `ref?` recursion, `match`, `try`/`catch`/`throw`, `ret` and `errput`." },
            { type: "code", label: "calc/main.ura", code: `use "@/header"
use "@/error"

enum Type: NONE, NUMBER, ADD, SUB, MUL, DIV, LPAREN, RPAREN

struct Token:
    value i32
    type Type

    pub fn number(v i32) ref? Token:
        ref? t Token = new Token
        t.type = NUMBER
        t.value = v
        ret ref t

    pub fn op(k Type) ref? Token:
        ref? t Token = new Token
        t.type = k
        ret ref t

struct Node:
    ref? token Token
    ref? left Node
    ref? right Node

    pub fn create(ref? token Token) ref? Node:
        ref? n Node = new Node
        n.token = ref token
        ret ref n

    @no-warn
    operator drop:
        clean self.token
        clean self.left
        clean self.right

mod Lexer:
    fn run(ref src String, toks Token[]) i32:
        fn is_digit(c char) bool: ret c >= '0' and c <= '9'
        n i32 = 0
        i i32 = 0
        while i < src.len():
            c char = src.at(i)
            if c == ' ':
                i = i + 1
                continue
            elif is_digit(c):
                v i32 = 0
                while i < src.len() and is_digit(src.at(i)):
                    v = v * 10 + ((src.at(i) as i32) - 48)
                    i = i + 1
                toks[n].type = NUMBER
                toks[n].value = v
                n = n + 1
                continue
            else:
                k Type = NUMBER
                match c:
                    case '+': k = ADD
                    case '-': k = SUB
                    case '*': k = MUL
                    case '/': k = DIV
                    case '(': k = LPAREN
                    case ')': k = RPAREN
                toks[n].type = k
                toks[n].value = 0
                n = n + 1
                i = i + 1
        ret n

mod Parser:
    fn factor(toks Token[], ref p i32, n i32) ref? Node:
        if p < n and toks[p].type == LPAREN:
            p = p + 1
            ref? inner Node = expr(toks, ref p, n)
            if p < n and toks[p].type == RPAREN:
                p = p + 1
            ret ref inner
        ref? lf Node = Node::create(Token::number(toks[p].value))
        p = p + 1
        ret ref lf

    fn term(toks Token[], ref p i32, n i32) ref? Node:
        ref? l Node = factor(toks, ref p, n)
        while p < n and (toks[p].type == MUL or toks[p].type == DIV):
            k Type = toks[p].type
            p = p + 1
            ref? r Node = factor(toks, ref p, n)
            ref? parent Node = Node::create(Token::op(k))
            parent.left = ref l
            parent.right = ref r
            l = ref parent
        ret ref l

    fn expr(toks Token[], ref p i32, n i32) ref? Node:
        ref? l Node = term(toks, ref p, n)
        while p < n and (toks[p].type == ADD or toks[p].type == SUB):
            k Type = toks[p].type
            p = p + 1
            ref? r Node = term(toks, ref p, n)
            ref? parent Node = Node::create(Token::op(k))
            parent.left = ref l
            parent.right = ref r
            l = ref parent
        ret ref l

fn sign(k Type) char[]:
    match k:
        case ADD: ret "+"
        case SUB: ret "-"
        case MUL: ret "*"
        case DIV: ret "/"
        default: ret "?"

fn label(ref? n Node) void:
    if n.token.type == NUMBER: output(n.token.value, "\\n")
    else:                      output("op: ", sign(n.token.type), "\\n")

fn show(ref? n Node, pre char[], last bool) void:
    output(pre)
    if last: output("└─ ")
    else:    output("├─ ")
    label(ref n)
    kid String = String::from(pre)
    if last: kid.join("   ")
    else:    kid.join("│  ")
    if n.left != null:  show(ref n.left, kid.c_str(), n.right == null)
    if n.right != null: show(ref n.right, kid.c_str(), True)

fn tree(ref? n Node) void:
    label(ref n)
    if n.left != null:  show(ref n.left, "", n.right == null)
    if n.right != null: show(ref n.right, "", True)

fn eval(ref? n Node) i32:
    match n?.token?.type:
        case NUMBER: ret n.token.value
        case ADD:    ret eval(ref n.left) + eval(ref n.right)
        case SUB:    ret eval(ref n.left) - eval(ref n.right)
        case MUL:    ret eval(ref n.left) * eval(ref n.right)
        case DIV:
            d i32 = eval(ref n.right)
            if d == 0: throw Error::make("division by zero")
            ret eval(ref n.left) / d
        default:    ret 0

fn calc(text char[]) void:
    output("========================================\\n")
    output("calculate expr:  ", text, "\\nast:\\n")
    src String = String::from(text)
    toks Token[] = new Token[64]
    n i32 = Lexer::run(ref src, toks)
    p i32 = 0
    ref? root Node = Parser::expr(toks, ref p, n)
    tree(ref root)
    try:
        output("result: ", eval(ref root), "\\n")
    catch e:
        errput("\\nError: ", e.message, "\\n")
    clean root
    clean toks

main():
    calc("2 * (3 + 4) - 10 / 5")
    calc("8 / (3 - 3)")
    output("========================================\\n")` },
            { type: "output", label: "output", code: `========================================
calculate expr:  2 * (3 + 4) - 10 / 5
ast:
op: -
├─ op: *
│  ├─ 2
│  └─ op: +
│     ├─ 3
│     └─ 4
└─ op: /
   ├─ 10
   └─ 5
result: 12
========================================
calculate expr:  8 / (3 - 3)
ast:
op: /
├─ 8
└─ op: -
   ├─ 3
   └─ 3
========================================` },
            { type: "output", label: "stderr", code: `Error: division by zero` },
            { type: "text", content: "The whole AST is freed by the single `clean root` in `calc`. Each `Node`'s `operator drop` cleans its own children first, so one call collapses the tree — checked with `leaks --atExit`: 0 leaks for 0 total leaked bytes, including on the run that throws." },
          ],
        },
        {
          id: "project-libft",
          title: "libft — a C Standard Library, Reimplemented",
          blocks: [
            { type: "text", content: "The classic 42 exercise written in Ura: character classification, string handling, memory routines, and a linked list built on `ref?` fields. This is the library half." },
            { type: "code", label: "libft/libft.ura", code: `fn ft_isalpha(c char) bool:
    return (c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z')

fn ft_isdigit(c char) bool:
    return c >= '0' and c <= '9'

fn ft_isalnum(c char) bool:
    return ft_isalpha(c) or ft_isdigit(c)

fn ft_isascii(c char) bool:
    return c >= 0 as char and c <= 127 as char

fn ft_isprint(c char) bool:
    return c >= 32 as char and c <= 126 as char

fn ft_toupper(c char) char:
    if c >= 'a' and c <= 'z':
        return (c as i32 - 32) as char
    return c

fn ft_tolower(c char) char:
    if c >= 'A' and c <= 'Z':
        return (c as i32 + 32) as char
    return c

fn ft_strlen(s char[]) i32:
    return s.len as i32

fn ft_strncmp(a char[], b char[], n i32) i32:
    i i32 = 0
    while i < n:
        ca i32 = 0
        cb i32 = 0
        if i < a.len as i32:
            ca = a[i] as i32
        if i < b.len as i32:
            cb = b[i] as i32
        if ca != cb:
            return ca - cb
        if ca == 0:
            return 0
        i += 1
    return 0

fn ft_memcmp(a char[], b char[], n i32) i32:
    i i32 = 0
    while i < n:
        if a[i] != b[i]:
            return a[i] as i32 - b[i] as i32
        i += 1
    return 0

fn ft_strchr(s char[], c char) i32:
    i i32 = 0
    while i < s.len as i32:
        if s[i] == c:
            return i
        i += 1
    if c == 0 as char:
        return s.len as i32
    return -1

fn ft_strrchr(s char[], c char) i32:
    i i32 = s.len as i32 - 1
    while i >= 0:
        if s[i] == c:
            return i
        i -= 1
    return -1

fn ft_memchr(s char[], c char, n i32) i32:
    i i32 = 0
    while i < n:
        if s[i] == c:
            return i
        i += 1
    return -1

fn ft_strnstr(hay char[], needle char[], n i32) i32:
    m i32 = needle.len as i32
    if m == 0:
        return 0
    i i32 = 0
    while i + m <= n and i + m <= hay.len as i32:
        if ft_strncmp(hay[i..i + m], needle, m) == 0:
            return i
        i += 1
    return -1

fn ft_atoi(s char[]) i32:
    i i32 = 0
    while i < s.len as i32 and (s[i] == ' ' or s[i] == '\\t' or s[i] == '\\n'):
        i += 1
    sign i32 = 1
    if i < s.len as i32 and (s[i] == '-' or s[i] == '+'):
        if s[i] == '-':
            sign = -1
        i += 1
    n i32 = 0
    while i < s.len as i32 and ft_isdigit(s[i]):
        n = n * 10 + (s[i] as i32 - 48)
        i += 1
    return n * sign

fn ft_memset(b char[], c char, n i32) void:
    i i32 = 0
    while i < n:
        b[i] = c
        i += 1

fn ft_bzero(b char[], n i32) void:
    ft_memset(b, 0 as char, n)

fn ft_memcpy(dst char[], src char[], n i32) void:
    i i32 = 0
    while i < n:
        dst[i] = src[i]
        i += 1

fn ft_memmove(dst char[], src char[], n i32) void:
    tmp char[] = new char[n]
    ft_memcpy(tmp, src, n)
    ft_memcpy(dst, tmp, n)
    clean tmp

fn ft_strlcpy(dst char[], src char[], size i32) i32:
    slen i32 = src.len as i32
    i i32 = 0
    while i + 1 < size and i < slen:
        dst[i] = src[i]
        i += 1
    if size > 0:
        dst[i] = 0 as char
    return slen

fn ft_strlcat(dst char[], src char[], size i32) i32:
    dlen i32 = 0
    while dlen < size and dlen < dst.len as i32 and dst[dlen] != 0 as char:
        dlen += 1
    slen i32 = src.len as i32
    if dlen == size:
        return size + slen
    i i32 = 0
    while dlen + i + 1 < size and i < slen:
        dst[dlen + i] = src[i]
        i += 1
    dst[dlen + i] = 0 as char
    return dlen + slen

fn ft_strdup(s char[]) char[]:
    n i32 = s.len as i32
    out char[] = new char[n]
    ft_memcpy(out, s, n)
    return out

fn ft_calloc(count i32, size i32) char[]:
    return new char[count * size]

fn ft_substr(s char[], start i32, len i32) char[]:
    slen i32 = s.len as i32
    if start >= slen:
        return new char[0]
    stop i32 = start + len
    if stop > slen:
        stop = slen
    n i32 = stop - start
    out char[] = new char[n]
    i i32 = 0
    while i < n:
        out[i] = s[start + i]
        i += 1
    return out

fn ft_strjoin(a char[], b char[]) char[]:
    la i32 = a.len as i32
    lb i32 = b.len as i32
    out char[] = new char[la + lb]
    ft_memcpy(out, a, la)
    i i32 = 0
    while i < lb:
        out[la + i] = b[i]
        i += 1
    return out

fn ft_in_set(c char, set char[]) bool:
    i i32 = 0
    while i < set.len as i32:
        if set[i] == c:
            return True
        i += 1
    return False

fn ft_strtrim(s char[], set char[]) char[]:
    slen i32 = s.len as i32
    start i32 = 0
    while start < slen and ft_in_set(s[start], set):
        start += 1
    stop i32 = slen
    while stop > start and ft_in_set(s[stop - 1], set):
        stop -= 1
    return ft_substr(s, start, stop - start)

fn ft_count_words(s char[], c char) i32:
    slen i32 = s.len as i32
    wc i32 = 0
    i i32 = 0
    while i < slen:
        if s[i] != c:
            wc += 1
            while i < slen and s[i] != c:
                i += 1
        else:
            i += 1
    return wc

fn ft_split(s char[], c char) char[][]:
    slen i32 = s.len as i32
    wc i32 = ft_count_words(s, c)
    if wc == 0:
        return new char[0][1]
    out char[][] = new char[wc][1]
    w i32 = 0
    i i32 = 0
    while i < slen:
        if s[i] != c:
            start i32 = i
            while i < slen and s[i] != c:
                i += 1
            out[w] = ft_substr(s, start, i - start)
            w += 1
        else:
            i += 1
    return out

fn ft_num_digits(n i32) i32:
    d i32 = 0
    tmp i32 = n
    while tmp != 0:
        tmp = tmp / 10
        d += 1
    return d

fn ft_itoa(n i32) char[]:
    if n == 0:
        z char[] = new char[1]
        z[0] = '0'
        return z
    neg bool = n < 0
    digits i32 = ft_num_digits(n)
    total i32 = digits
    if neg:
        total += 1
    out char[] = new char[total]
    num i32 = n
    idx i32 = total - 1
    i i32 = 0
    while i < digits:
        d i32 = num % 10
        if d < 0:
            d = -d
        out[idx] = (d + 48) as char
        num = num / 10
        idx -= 1
        i += 1
    if neg:
        out[0] = '-'
    return out

fn ft_strmapi(s char[], f fn(u32, char) char) char[]:
    n i32 = s.len as i32
    out char[] = new char[n]
    i i32 = 0
    while i < n:
        out[i] = f(i as u32, s[i])
        i += 1
    return out

fn ft_striteri(s char[], f fn(u32, char) char) void:
    i i32 = 0
    while i < s.len as i32:
        s[i] = f(i as u32, s[i])
        i += 1

fn ft_putchar_fd(c char, fd i32) void:
    b char[] = new char[1]
    b[0] = c
    write(fd, b, 1)
    clean b

fn ft_putstr_fd(s char[], fd i32) void:
    write(fd, s, s.len as i64)

fn ft_putendl_fd(s char[], fd i32) void:
    ft_putstr_fd(s, fd)
    ft_putchar_fd('\\n', fd)

fn ft_putnbr_fd(n i32, fd i32) void:
    s char[] = ft_itoa(n)
    ft_putstr_fd(s, fd)
    clean s

struct Node:
    content char[]
    ref? next Node

struct Lst:
    ref? head Node

fn ft_lstnew(content char[]) ref Node:
    n Node[] = new Node[1]
    n[0].content = content
    return ref n[0]

fn ft_lstadd_front(ref lst Lst, ref node Node) void:
    node.next = ref lst.head
    lst.head  = ref node

fn ft_lstadd_back(ref lst Lst, ref node Node) void:
    if lst.head == null:
        lst.head = ref node
        return
    ref? cur Node = ref lst.head
    while cur.next != null:
        cur = ref cur.next
    cur.next = ref node

fn ft_lstsize(ref lst Lst) i32:
    ref? cur Node = ref lst.head
    count i32 = 0
    while cur != null:
        count += 1
        cur = ref cur.next
    return count

fn ft_lstlast(ref lst Lst) ref? Node:
    ref? cur Node = ref lst.head
    if cur == null:
        return null
    while cur.next != null:
        cur = ref cur.next
    return ref cur

fn ft_lstiter(ref lst Lst, f fn(char[]) char[]) void:
    ref? cur Node = ref lst.head
    while cur != null:
        cur.content = f(cur.content)
        cur = ref cur.next

fn ft_lstmap(ref lst Lst, f fn(char[]) char[]) Lst:
    out Lst
    ref? cur Node = ref lst.head
    while cur != null:
        ft_lstadd_back(ref out, ft_lstnew(f(cur.content)))
        cur = ref cur.next
    return out

fn ft_lstdelone(ref lst Lst, idx i32) void:
    if lst.head == null:
        return
    if idx <= 0:
        lst.head = ref lst.head.next
        return
    ref? prev Node = ref lst.head
    i i32 = 1
    while i < idx and prev.next != null:
        prev = ref prev.next
        i += 1
    if prev.next != null:
        prev.next = ref prev.next.next

fn ft_lstclear(ref lst Lst) void:
    lst.head = null` },
            { type: "heading", content: "Using it" },
            { type: "code", label: "libft/main.ura", code: `use "libft"

fn upcase_i(i u32, c char) char:
    if c >= 'a' and c <= 'z':
        return (c as i32 - 32) as char
    return c

fn upcase(s char[]) char[]:
    n i32 = s.len as i32
    out char[] = new char[n]
    i i32 = 0
    while i < n:
        c char = s[i]
        if c >= 'a' and c <= 'z':
            out[i] = (c as i32 - 32) as char
        else:
            out[i] = c
        i += 1
    return out

fn lower(s char[]) char[]:
    n i32 = s.len as i32
    out char[] = new char[n]
    i i32 = 0
    while i < n:
        c char = s[i]
        if c >= 'A' and c <= 'Z':
            out[i] = (c as i32 + 32) as char
        else:
            out[i] = c
        i += 1
    return out

fn dump(ref lst Lst) void:
    ref? cur Node = ref lst.head
    while cur != null:
        output(cur.content, " ")
        cur = ref cur.next
    output("\\n")

main():
    output("ft_isalpha('a')=", ft_isalpha('a'), " ('1')=", ft_isalpha('1'), "\\n")
    output("ft_isdigit('7')=", ft_isdigit('7'), " ('x')=", ft_isdigit('x'), "\\n")
    output("ft_isalnum('Z')=", ft_isalnum('Z'), " (' ')=", ft_isalnum(' '), "\\n")
    output("ft_toupper('a')=", ft_toupper('a'), " ft_tolower('A')=", ft_tolower('A'), "\\n")
    output("ft_strlen(\\"hello\\")=", ft_strlen("hello"), "\\n")
    output("ft_strncmp(abc,abd,3)=", ft_strncmp("abc", "abd", 3), "\\n")
    output("ft_strchr(hello,l)=", ft_strchr("hello", 'l'), "\\n")
    output("ft_strrchr(hello,l)=", ft_strrchr("hello", 'l'), "\\n")
    output("ft_strnstr(hello world,wor,11)=", ft_strnstr("hello world", "wor", 11), "\\n")
    output("ft_atoi(\\"  -42abc\\")=", ft_atoi("  -42abc"), "\\n")

    buf char[] = new char[8]
    ft_memset(buf, 'x', 4)
    buf[4] = 0 as char
    output("ft_memset -> ", buf, "\\n")
    n i32 = ft_strlcpy(buf, "hi", 8)
    output("ft_strlcpy -> ", buf, " (ret ", n, ")\\n")
    clean buf

    output("--- part 2 ---\\n")
    a char[] = ft_substr("hello world", 6, 5)
    output("ft_substr -> ", a, "\\n")
    clean a

    j char[] = ft_strjoin("foo", "bar")
    output("ft_strjoin -> ", j, "\\n")
    clean j

    t char[] = ft_strtrim("xxhelloxx", "x")
    output("ft_strtrim -> ", t, "\\n")
    clean t

    parts char[][] = ft_split("a,bb,ccc", ',')
    output("ft_split -> ", parts.len as i32, " words: ")
    i i32 = 0
    while i < parts.len as i32:
        output(parts[i], " ")
        i += 1
    output("\\n")

    p char[] = ft_itoa(-2147483648)
    output("ft_itoa(INT_MIN) -> ", p, "\\n")
    clean p
    q char[] = ft_itoa(0)
    output("ft_itoa(0) -> ", q, "\\n")
    clean q

    m char[] = ft_strmapi("hello", upcase_i)
    output("ft_strmapi -> ", m, "\\n")
    clean m

    it char[] = ft_strdup("world")
    ft_striteri(it, upcase_i)
    output("ft_striteri -> ", it, "\\n")
    clean it

    output("ft_putnbr_fd -> ")
    ft_putnbr_fd(-42, 1)
    output("\\n")
    ft_putendl_fd("ft_putendl_fd works", 1)

    output("--- bonus: linked list ---\\n")
    lst Lst
    ft_lstadd_back(ref lst, ft_lstnew("a"))
    ft_lstadd_back(ref lst, ft_lstnew("b"))
    ft_lstadd_back(ref lst, ft_lstnew("c"))
    ft_lstadd_front(ref lst, ft_lstnew("z"))
    output("list:   ")
    dump(ref lst)
    output("size:   ", ft_lstsize(ref lst), "\\n")

    ref? L Node = ft_lstlast(ref lst)
    output("last:   ", L.content, "\\n")

    ft_lstiter(ref lst, upcase)
    output("iter:   ")
    dump(ref lst)

    mapped Lst = ft_lstmap(ref lst, lower)
    output("map:    ")
    dump(ref mapped)

    ft_lstdelone(ref lst, 1)
    output("del 1:  ")
    dump(ref lst)

    ft_lstdelone(ref lst, 0)
    output("del 0:  ")
    dump(ref lst)

    ft_lstclear(ref lst)
    output("clear:  size ", ft_lstsize(ref lst), "\\n")` },
            { type: "output", label: "output", code: `` },
          ],
        },
        {
          id: "project-net",
          title: "A TCP Chat Server",
          blocks: [
            { type: "text", content: "POSIX sockets through `@/header`, with no fork and no threads: one `poll()` loop owns every file descriptor — stdin, the listener and each connected client — and services whichever is ready." },
            { type: "text", content: "The C structs are laid out by hand. `SockAddr` mirrors macOS's `sockaddr_in` field for field, including the big-endian port, and `PollFd` matches `struct pollfd`. That is the whole binding layer." },
            { type: "code", label: "net/server.ura", code: `// net_server.ura — a TCP chat server (macOS), single-process event loop.
//
// No fork, no threads: one \`poll()\` loop owns every fd — stdin, the listener,
// and all connected clients — and handles whichever is ready. A line typed at
// the server is broadcast to every client; a line from a client is printed.
//
// The poll set is a \`PollFd[]\`: slot 0 is stdin, slot 1 is the listener, and
// slots 2.. are clients. Because the loop owns the client fds and closes them
// deliberately on disconnect, they are tracked as raw fds here (a Socket with
// \`operator drop\` would close a fd when a copy of it went out of scope).

AF_INET      i32 = 2
SOCK_STREAM  i32 = 1
SOL_SOCKET   i32 = 65535
SO_REUSEADDR i32 = 4
SO_REUSEPORT i32 = 512
PORT         i32 = 8080
POLLIN       i16 = 1
MAX          i32 = 64

// macOS sockaddr_in, 16 bytes: len(1) family(1) port(2,BE) ip(4) zero(8)
struct SockAddr:
    len    char
    family char
    port   i16
    ip     i32
    zero   i64

    pub fn create(port i32, ip i32) SockAddr:
        a SockAddr
        a.len    = 16 as char
        a.family = AF_INET as char
        a.port   = (((port & 255) << 8) | (port >> 8)) as i16
        a.ip     = ip
        a.zero   = 0
        return a

// C: struct pollfd { int fd; short events; short revents; }  (8 bytes)
struct PollFd:
    fd      i32
    events  i16
    revents i16

    fn watch(fd i32) void:
        self.fd      = fd
        self.events  = POLLIN
        self.revents = 0

    fn has_input() bool:
        return (self.revents & POLLIN) != 0

proto fn socket(domain i32, type i32, protocol i32) i32
proto fn bind(fd i32, ref addr SockAddr, len i32) i32
proto fn listen(fd i32, backlog i32) i32
proto fn accept(fd i32, addr pointer, len pointer) i32
proto fn setsockopt(fd i32, level i32, opt i32, val pointer, len i32) i32
proto fn close(fd i32) i32
proto fn read(fd i32, buf pointer, n i64) i64
proto fn poll(ref fds PollFd, nfds i32, timeout i32) i32

// Unbuffered terminal write, so prompts appear before we block on poll.
fn log(msg char[]) void:
    write(1, msg, strlen(msg))

struct Server:
    fd i32

    pub fn create() Server:
        s Server
        s.fd = socket(AF_INET, SOCK_STREAM, 0)
        return s

    fn valid() bool:
        return self.fd >= 0

    fn reuse() void:
        opt char[] = new char[4]
        opt[0] = 1 as char
        setsockopt(self.fd, SOL_SOCKET, SO_REUSEADDR, opt, 4)
        setsockopt(self.fd, SOL_SOCKET, SO_REUSEPORT, opt, 4)
        clean opt

    fn bind_listen(port i32) bool:
        addr SockAddr = SockAddr::create(port, 0)
        if bind(self.fd, ref addr, 16) < 0:
            return False
        listen(self.fd, 5)
        return True

    // raw fd, not a Socket: the poll loop owns and closes it explicitly
    fn accept_raw() i32:
        none pointer = null
        return accept(self.fd, none, none)

    operator drop:
        if self.fd >= 0:
            close(self.fd)

main():
    server Server = Server::create()
    if not server.valid():
        log("\\033[0;31m[server] socket failed\\033[0m\\n")
        return 1

    server.reuse()
    if not server.bind_listen(PORT):
        log("\\033[0;31m[server] bind failed\\033[0m\\n")
        return 1

    log("\\033[0;32m[server]\\033[0m listening on port 8080...\\n")

    // poll set: [0] = stdin, [1] = listener, [2..nfds) = clients
    fds PollFd[] = new PollFd[MAX]
    fds[0].watch(0)
    fds[1].watch(server.fd)
    nfds i32 = 2

    buf char[] = new char[1024]
    r i32 = 0

    log("\\033[0;32m[server]\\033[0m > ")
    loop:
        poll(ref fds[0], nfds, -1)

        // a line typed here -> broadcast to every client
        if fds[0].has_input():
            r = read(0, buf, 1023) as i32
            if r <= 0:
                break
            buf[r - 1] = 0 as char
            i i32 = 2
            while i < nfds:
                write(fds[i].fd, buf, strlen(buf))
                i += 1
            log("\\033[0;32m[server]\\033[0m > ")
        elif fds[0].revents != 0:
            // stdin is not a live terminal (redirected / closed): a negative
            // fd tells poll to skip it, so we keep serving clients instead of
            // spinning on POLLNVAL.
            fds[0].fd = -1

        // a new connection -> add it to the poll set
        if fds[1].has_input():
            cfd i32 = server.accept_raw()
            if cfd >= 0 and nfds < MAX:
                fds[nfds].watch(cfd)
                nfds += 1
                log("\\r\\033[2K\\033[0;32m[server]\\033[0m client connected\\n")
                log("\\033[0;32m[server]\\033[0m > ")

        // client traffic -> print it; compact the set on disconnect
        j i32 = 2
        while j < nfds:
            if not fds[j].has_input():
                j += 1
                continue
            r = read(fds[j].fd, buf, 1023) as i32
            if r <= 0:
                close(fds[j].fd)
                nfds -= 1
                fds[j].fd      = fds[nfds].fd
                fds[j].events  = fds[nfds].events
                fds[j].revents = fds[nfds].revents
                log("\\r\\033[2K\\033[0;31m[server]\\033[0m client disconnected\\n")
                log("\\033[0;32m[server]\\033[0m > ")
                continue
            buf[r] = 0 as char
            log("\\r\\033[2K\\033[0;36m[client]\\033[0m ")
            log(buf)
            log("\\n\\033[0;32m[server]\\033[0m > ")
            j += 1

    clean fds
    clean buf
    return 0` },
            { type: "heading", content: "The client" },
            { type: "code", label: "net/client.ura", code: `// net_client.ura — a TCP chat client (macOS), single-process event loop.
//
// No fork: one \`poll()\` loop watches both stdin and the socket, and handles
// whichever becomes ready. Structs used:
//   - SockAddr : the C sockaddr, passed to connect() by \`ref\`
//   - PollFd   : one entry of the poll set; poll() gets \`ref fds[0]\`
//   - Socket   : the connection, with \`operator drop\` (safe: one socket)
//
// write / strlen come from the auto-loaded common.ura; the socket calls are
// declared here so their address arguments can take a struct by \`ref\`.

AF_INET     i32 = 2
SOCK_STREAM i32 = 1
PORT        i32 = 8080
POLLIN      i16 = 1

// macOS sockaddr_in, 16 bytes: len(1) family(1) port(2,BE) ip(4) zero(8)
struct SockAddr:
    len    char
    family char
    port   i16
    ip     i32
    zero   i64

    pub fn create(port i32, ip i32) SockAddr:
        a SockAddr
        a.len    = 16 as char
        a.family = AF_INET as char
        a.port   = (((port & 255) << 8) | (port >> 8)) as i16
        a.ip     = ip
        a.zero   = 0
        return a

// C: struct pollfd { int fd; short events; short revents; }  (8 bytes)
struct PollFd:
    fd      i32
    events  i16
    revents i16

    fn watch(fd i32) void:
        self.fd      = fd
        self.events  = POLLIN
        self.revents = 0

    fn has_input() bool:
        return (self.revents & POLLIN) != 0

proto fn socket(domain i32, type i32, protocol i32) i32
proto fn connect(fd i32, ref addr SockAddr, len i32) i32
proto fn close(fd i32) i32
proto fn read(fd i32, buf pointer, n i64) i64
proto fn poll(ref fds PollFd, nfds i32, timeout i32) i32

// 127.0.0.1 -> the four octets in network order, packed into one i32.
fn ipv4(a i32, b i32, c i32, d i32) i32:
    return a | (b << 8) | (c << 16) | (d << 24)

// Unbuffered terminal write, so prompts appear before we block on poll.
fn log(msg char[]) void:
    write(1, msg, strlen(msg))

struct Socket:
    fd i32

    fn valid() bool:
        return self.fd >= 0

    fn send_text(msg char[]) void:
        write(self.fd, msg, strlen(msg))

    fn recv_into(buf char[], cap i32) i32:
        return read(self.fd, buf, cap as i64) as i32

    operator drop:
        if self.fd >= 0:
            close(self.fd)

main():
    sock Socket
    sock.fd = socket(AF_INET, SOCK_STREAM, 0)
    if not sock.valid():
        log("\\033[0;31m[client] socket failed\\033[0m\\n")
        return 1

    addr SockAddr = SockAddr::create(PORT, ipv4(127, 0, 0, 1))
    if connect(sock.fd, ref addr, 16) < 0:
        log("\\033[0;31m[client] connect failed\\033[0m\\n")
        return 1

    log("\\033[0;36m[client]\\033[0m connected to server on port 8080\\n")

    // poll set: [0] = stdin, [1] = the socket
    fds PollFd[] = new PollFd[2]
    fds[0].watch(0)
    fds[1].watch(sock.fd)

    buf  char[] = new char[1024]
    rbuf char[] = new char[1024]
    r i32 = 0

    log("\\033[0;36m[client]\\033[0m > ")
    loop:
        poll(ref fds[0], 2, -1)

        // a line typed at the terminal -> send it (drop the newline)
        if fds[0].has_input():
            r = read(0, buf, 1023) as i32
            if r <= 0:
                break
            buf[r - 1] = 0 as char
            sock.send_text(buf)
            log("\\033[0;36m[client]\\033[0m > ")
        elif fds[0].revents != 0:
            // stdin redirected / closed: skip it (negative fd) and keep
            // receiving from the server instead of spinning on POLLNVAL.
            fds[0].fd = -1

        // bytes from the server -> print them, then reprint the prompt
        if fds[1].has_input():
            r = sock.recv_into(rbuf, 1023)
            if r <= 0:
                log("\\r\\033[2K\\033[0;31m[client]\\033[0m server disconnected\\n")
                break
            rbuf[r] = 0 as char
            log("\\r\\033[2K\\033[0;33m[server]\\033[0m ")
            log(rbuf)
            log("\\n\\033[0;36m[client]\\033[0m > ")

    clean fds
    clean buf
    clean rbuf
    return 0` },
            { type: "info", content: "Run the server in one terminal and any number of clients in others. A line typed at the server is broadcast to every client; a line from a client is printed by the server." },
          ],
        },
      ],
    },
    {
      label: "Internals",
      sections: [
        {
          id: "pipeline",
          title: "The Compilation Pipeline",
          blocks: [
            { type: "text", content: "Five passes, each a plain C file. The front half turns text into a tree; the back half types that tree and walks it once more to emit LLVM IR." },
            { type: "code", label: "pipeline", code: `source.ura
    │
    ▼
  lexer.c        text -> a flat list of typed tokens
    │            tracks indentation, resolves keywords, handles
    │            string escapes and comments, expands \`use\`,
    │            and evaluates @if/@elif/@else before parsing
    ▼
  parser.c       tokens -> AST, by recursive descent
    │            precedence lives in the call chain; struct
    │            methods are given their qualified names here
    ▼
  analyze.c      resolves names to declarations, builds scopes,
    │            links every call to the function it means and
    │            every type name to its struct
    ▼
  typecheck.c    annotates each node with its type, adopts
    │            literals to their targets, and classifies each
    │            operation (value / slice / reference)
    ▼
  codegen.c      walks the typed AST once, emitting LLVM IR
    │            through the LLVM C API
    ▼
  LLVM           optimization passes, then object code
    │
    ▼
  clang          links the executable` },
            { type: "heading", content: "Source layout" },
            { type: "table", headers: ["Path", "Holds"],
              rows: [
                ["`src/main.c`", "argument parsing and the unity build — it `#include`s every other `.c`"],
                ["`src/header.h`", "`Token`, `Node`, the `Type` enum, and the global compiler state"],
                ["`src/frontend/lexer.c`", "tokenizer, keyword table, `use` expansion, `@if` directives"],
                ["`src/frontend/parser.c`", "recursive-descent parser and AST construction"],
                ["`src/backend/analyze.c`", "name resolution and scope building"],
                ["`src/backend/typecheck.c`", "type annotation and literal adoption"],
                ["`src/backend/codegen.c`", "LLVM IR emission"],
                ["`src/utils/diagnostics.c`", "error rendering, the caret display, AST printing"],
                ["`ura-lib/`", "the standard library, all of it `.ura`"],
              ]
            },
            { type: "info", content: "It is a unity build: `main.c` includes the other translation units, so the whole compiler is one object file. That keeps cross-pass inlining available and the build a single `clang` invocation." },
          ],
        },
        {
          id: "compiler-reference",
          title: "Compiler Reference",
          blocks: [
            { type: "code", label: "usage", code: `ura <file.ura> [options]
ura calc.ura -O2 -o calc
ura calc.ura -exec` },
            { type: "table", headers: ["Flag", "Does"],
              rows: [
                ["`-o <name>`", "output path (default: the source basename)"],
                ["`-exec`", "run the program straight after a successful build"],
                ["`-O0` … `-O3`, `-Os`, `-Oz`", "LLVM optimization level"],
                ["`-san`", "AddressSanitizer / UBSan plus debug info"],
                ["`-tree`", "print the typed AST"],
                ["`-ll`", "print the generated LLVM IR"],
                ["`-debug`", "verbose compiler diagnostics"],
                ["`-testing`", "strip colour from diagnostics, for golden tests"],
              ]
            },
            { type: "text", content: "`-tree` and `-ll` are the two worth knowing: between them they show exactly what the front half decided and what the back half emitted, which is usually enough to locate a miscompilation without a debugger." },
          ],
        },
        {
          id: "testing",
          title: "How It Is Tested",
          blocks: [
            { type: "text", content: "The suite is golden-file based. Each case is a Markdown section holding the program and four recorded artifacts, so a change anywhere in the pipeline shows up as a diff in whichever artifact it touched." },
            { type: "table", headers: ["Fence", "Records"],
              rows: [
                ["`ura`", "the program"],
                ["`tree`", "the typed AST, as `-tree` prints it"],
                ["`out`", "everything the program wrote to stdout"],
                ["`err`", "diagnostics, runtime traps, and the exit code"],
                ["`ll`", "the generated LLVM IR"],
              ]
            },
            { type: "text", content: "Recording the IR is the useful part: a codegen change that moves a single instruction is visible in review, rather than being hidden behind a program that still happens to print the right answer." },
            { type: "code", label: "bash", code: `uv run config/tasks.py tests                # everything
uv run config/tasks.py tests literals.md   # one group
uv run config/tasks.py update literals.md  # re-record a group` },
            { type: "info", content: "The corpus currently holds 408 cases across 29 groups, covering the language surface plus the three programs above." },
          ],
        },
        {
          id: "status",
          title: "Status & Roadmap",
          blocks: [
            { type: "heading", content: "Working today" },
            { type: "list", items: [
              "Sized integers `i8`–`i64` and `u8`–`u64`, `f32`/`f64`, `bool`, `char`, `char[]`, `pointer`",
              "Literals sized by magnitude, with out-of-range assignment rejected at compile time",
              "Optionals `T?`, `null`, the `?` guard and the `??` default",
              "`if`/`elif`/`else`, `while`, `loop`, `break`, `continue`",
              "`for` over ranges with `by`, over arrays, and `for ref` for in-place mutation",
              "`match` with multi-label cases and no fall-through",
              "Functions, single-line bodies, `ret`, forward references, nested non-capturing helpers",
              "Function values and higher-order functions",
              "`ref` parameters, `ref` and `ref?` returns, reference identity",
              "Structs, nested structs, methods with `self`, `pub fn` statics via `::`",
              "Enums with explicit values, usable as types, fields and indices",
              "Arrays with `.len`, slices, multi-dimensional arrays, opt-in bounds checking",
              "`new`/`clean` for arrays and single objects, `operator drop` with deterministic destruction",
              "The full operator overload set, plus `operator =` and `operator output`",
              "`mod` namespaces reached with `::`, and multi-file `use` imports",
              "`try`/`catch`/`throw` with the `Error` type, propagating across frames",
              "Seven runtime traps, each reporting `file:line`",
              "`proto` C interop with variadics, and the `@/` standard library",
              "`@if`/`@elif`/`@else` platform selection and `@no-warn`",
              "`output` and `errput`, formatting any type including recursive structs",
            ]},
            { type: "heading", content: "Coming next" },
            { type: "list", items: [
              "Tuples — multiple return values with typed destructuring",
              "Container types: `List[T]`, `Map[K, V]`, `Set[T]`",
              "String interpolation",
              "`const` and immutability, type inference, type aliases",
              "Function overloading, default arguments, named returns",
              "Generics",
            ]},
            { type: "heading", content: "Reserved words" },
            { type: "text", content: "Some names are taken by the lexer even where the feature is not built yet — `List` and `array` among them — so they cannot be used as identifiers." },
            { type: "code", label: "keywords", code: `bool char void pointer  i8 i16 i32 i64  u8 u16 u32 u64  f32 f64
if elif else            @if @elif @else @no-warn
for loop while by in    fn break return ret
case match continue     try catch throw
ref default struct mod  proto enum as pub operator
new clean               and or not is
typeof sizeof           List array null
use link                True False self` },
          ],
        },
      ],
    },
  ],
};
