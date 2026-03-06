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
            { type: "text", content: "Ura is a compiled, statically-typed language that borrows Python's clean indentation-based syntax while compiling directly to native machine code through LLVM. No interpreter. No virtual machine. No braces. No semicolons." },
            { type: "text", content: "It started as a personal passion project: a love for C's raw performance and Python's readable style fused together. The entire compiler is written in C from scratch — the tokenizer, parser, semantic analysis, and code generation are all hand-built." },
            { type: "heading", content: "Why Ura?" },
            { type: "list", items: [
              "Fast — compiles to native machine code via LLVM's optimization pipeline",
              "Clean syntax — indentation-based blocks, no braces, no semicolons",
              "C interop — call any C library with a single proto declaration",
              "Explicit memory control — choose stack or heap allocation per variable",
              "Familiar — if you know C or Python, you'll feel at home immediately",
              "Cross-platform — targets any architecture LLVM supports (x86, ARM, ...)",
            ]},
          ],
        },
        {
          id: "quickstart",
          title: "Quick Start",
          blocks: [
            { type: "text", content: "Clone the repository, install LLVM, load the dev environment, build the compiler, and run your first program." },
            { type: "code", label: "bash", code: `# 1. Clone
git clone https://github.com/mohammedhrima/ura-lang
cd ura-lang

# 2. Install LLVM (if not already installed)
brew install llvm          # macOS
sudo apt install llvm-dev  # Ubuntu/Debian

# 3. Load the dev environment (sets $URA_LIB, $PATH, shell functions)
source config.sh

# 4. Build the Ura compiler
build

# 5. Write and run your first program
ura src/file.ura` },
            { type: "info", content: "source config.sh must be run once per shell session. It sets up $URA_LIB (stdlib path), adds build/ to $PATH, and defines all dev commands (build, tests, copy, examples, indent, update)." },
          ],
        },
        {
          id: "hello-world",
          title: "Hello World",
          blocks: [
            { type: "text", content: "Import the standard I/O module with the use keyword. The @ prefix resolves to the built-in standard library ($URA_LIB). Define main() with a colon — indentation defines the block." },
            { type: "code", label: "hello.ura", code: `use "@/io"

main():
    printf("Hello, World!\\n")` },
            { type: "output", label: "output", code: `Hello, World!` },
            { type: "info", content: "No main() return type is required. No semicolons. No curly braces. The file is compiled and immediately executed by the ura command." },
          ],
        },
      ],
    },
    {
      label: "Language Tour",
      sections: [
        {
          id: "variables",
          title: "Variables & Types",
          blocks: [
            { type: "text", content: "Variables are declared as name type = value. Types are always explicit — Ura has no type inference yet. This keeps code readable and avoids surprises." },
            { type: "code", label: "variables.ura", code: `main():
    name   chars = "Alice"
    age    int   = 30
    active bool  = True
    letter char  = 'A'
    score  float = 9.5` },
            { type: "heading", content: "Primitive Types" },
            { type: "table", headers: ["Type", "Description", "Example"],
              rows: [
                ["int", "32-bit signed integer", "42"],
                ["long", "64-bit signed integer", "9999999999"],
                ["short", "16-bit integer", "100"],
                ["float", "32-bit floating point", "3.14"],
                ["char", "single character", "'A'"],
                ["chars", "string (pointer to char)", "\"hello\""],
                ["bool", "boolean: True or False", "True"],
                ["void", "no return value", "(function only)"],
              ]
            },
          ],
        },
        {
          id: "functions",
          title: "Functions",
          blocks: [
            { type: "text", content: "Functions use the fn keyword with typed parameters and a return type. The function body is indented. Single-line functions are supported for simple cases." },
            { type: "code", label: "functions.ura", code: `use "@/io"

fn greet(name chars) void:
    printf("Hello, %s!\\n", name)

fn add(a int, b int) int:
    return a + b

main():
    greet("Ura")
    result int = add(10, 32)
    printf("Result: %d\\n", result)` },
            { type: "heading", content: "Single-line functions" },
            { type: "text", content: "When the function body is a single expression, you can write it on the same line as the declaration:" },
            { type: "code", label: "single-line.ura", code: `fn square(n int) int:     return n * n
fn is_digit(c char) bool: return c >= '0' and c <= '9'
fn max(a int, b int) int: return a if a > b else b` },
          ],
        },
        {
          id: "control-flow",
          title: "Control Flow",
          blocks: [
            { type: "text", content: "Conditionals use if / elif / else with indented blocks. Loops use while with break and continue. The syntax is intentionally close to Python." },
            { type: "code", label: "control.ura", code: `use "@/io"

main():
    a int = 2
    if a == 1:
        printf("is 1\\n")
    elif a == 2:
        printf("not 1 but 2\\n")
    else:
        printf("neither\\n")

    i int = 0
    while i < 5:
        if i == 3: break
        printf("i = %d\\n", i)
        i += 1
    printf("stopped at: %d\\n", i)` },
            { type: "output", label: "output", code: `not 1 but 2
i = 0
i = 1
i = 2
stopped at: 3` },
            { type: "info", content: "Single-line if and while bodies can be written on the same line: if i == 3: break" },
          ],
        },
        {
          id: "operators",
          title: "Operators",
          blocks: [
            { type: "text", content: "Ura supports the full set of arithmetic, bitwise, logical, comparison, and assignment operators. Boolean keywords and and or and not are preferred over && || ! but both work." },
            { type: "table", headers: ["Category", "Operators"],
              rows: [
                ["Arithmetic", "+ - * / %"],
                ["Bitwise", "& | ^ ~ << >>"],
                ["Comparison", "== != < > <= >= is"],
                ["Logical", "and or not && || !"],
                ["Assignment", "= += -= *= /= %="],
                ["Cast", "as"],
              ]
            },
            { type: "heading", content: "Bitwise example" },
            { type: "code", label: "bitwise.ura", code: `use "@/io"

main():
    a int = 60   // 0011 1100
    b int = 13   // 0000 1101

    printf("AND: %d\\n", a & b)          // 12  — 0000 1100
    printf("OR:  %d\\n", a | b)          // 61  — 0011 1101
    printf("XOR: %d\\n", a ^ b)          // 49  — 0011 0001
    printf("NOT: %d\\n", ~a)             // -61 — two's complement
    printf("LEFT  SHIFT: %d\\n", 1 << 3) // 8
    printf("RIGHT SHIFT: %d\\n", 60 >> 2)// 15` },
          ],
        },
        {
          id: "type-casting",
          title: "Type Casting",
          blocks: [
            { type: "text", content: "Use the as keyword to convert between types. This is explicit — Ura never casts silently. Casting is commonly used between char and int." },
            { type: "code", label: "casting.ura", code: `use "@/io"

main():
    // char → int
    c char = 'A'
    n int  = c as int
    printf("char '%c' as int: %d\\n", c, n)   // 65

    // int → char
    code   int  = 66
    letter char = code as char
    printf("int %d as char: %c\\n", code, letter)   // B

    // used in expressions
    left  chars = "d"
    right chars = "a"
    diff  int   = left[0] as int - right[0] as int
    printf("diff: %d\\n", diff)   // 3` },
          ],
        },
        {
          id: "references",
          title: "References",
          blocks: [
            { type: "text", content: "References bind to an existing variable — all reads and writes go through to the original. Declare a reference parameter with ref after the type. References eliminate the need for manual pointer arithmetic." },
            { type: "code", label: "references.ura", code: `use "@/io"

fn swap(a int ref, b int ref) void:
    temp int = a
    a = b
    b = temp

main():
    x int = 10
    y int = 20
    printf("Before: x=%d, y=%d\\n", x, y)
    swap(x, y)
    printf("After:  x=%d, y=%d\\n", x, y)` },
            { type: "output", label: "output", code: `Before: x=10, y=20
After:  x=20, y=10` },
            { type: "heading", content: "Unbound references" },
            { type: "text", content: "References can be declared without an immediate binding and assigned later:" },
            { type: "code", label: "unbound-ref.ura", code: `use "@/io"

main():
    a int = 1
    b int = 2
    choice int = 1

    r int ref         // declared, not yet bound
    if choice == 1:
        r = a         // now r references a
    else:
        r = b

    r = 100
    printf("%d\\n", a + b)   // 102 — a was modified through r` },
          ],
        },
        {
          id: "structs",
          title: "Structs & Methods",
          blocks: [
            { type: "text", content: "Structs group related data. Methods are defined inside the struct body with a self parameter that refers to the current instance. The init() method is a constructor that runs automatically when a struct is declared." },
            { type: "code", label: "structs.ura", code: `proto fn printf(fmt chars, ...) int

struct User:
    name array[char]
    age  int

    fn init() void:
        self.name = "new user"
        self.age  = 0

    fn greet() void:
        printf("Hello from %s, age %d\\n", self.name, self.age)

main():
    user User
    user.greet()   // init() ran automatically → "Hello from new user, age 0"` },
            { type: "heading", content: "Nested structs" },
            { type: "text", content: "Structs can be nested at any depth:" },
            { type: "code", label: "nested.ura", code: `use "@/io"

struct Address:
    city   chars
    street chars

struct Person:
    name    chars
    address Address

main():
    dev Person
    dev.name           = "Mohammed"
    dev.address.city   = "Casablanca"
    dev.address.street = "Rue des Compilateurs"
    printf("%s lives in %s\\n", dev.name, dev.address.city)` },
            { type: "heading", content: "Struct references" },
            { type: "text", content: "Pass structs by reference to let functions modify the caller's data:" },
            { type: "code", label: "struct-ref.ura", code: `use "@/io"

struct User:
    id int

fn update(u User ref) void:
    u.id = 99

main():
    user User
    user.id = 1
    update(user)
    printf("id: %d\\n", user.id)   // 99` },
          ],
        },
        {
          id: "memory",
          title: "Memory Control",
          blocks: [
            { type: "text", content: "Ura gives you direct, explicit control over where memory lives. stack[] allocates on the call stack — fast, automatically freed when the function returns. heap[] allocates on the heap — survives the function, must be freed manually with free()." },
            { type: "code", label: "memory.ura", code: `use "@/io"
use "@/memory"
use "@/string"

main():
    // Stack — freed automatically when function returns
    local chars = stack[char](64)
    strcpy(local, "stack allocated")
    printf("%s\\n", local)

    // Heap — must be freed manually
    buffer chars = heap[char](256)
    strcpy(buffer, "heap allocated")
    printf("%s\\n", buffer)
    free(buffer)` },
            { type: "heading", content: "Multi-level allocation" },
            { type: "code", label: "multi-level.ura", code: `// Array of int pointers
matrix array[[int]]   = heap[[int]](10)

// 3-level deep
cube   array[[[int]]] = heap[[[int]]](5)

// Direct index access
str array[char] = heap[char](20)
str[0] = 'H'
str[1] = 'i'` },
            { type: "table", headers: ["", "stack[type](n)", "heap[type](n)"],
              rows: [
                ["Cleanup", "Automatic", "Manual (free)"],
                ["Speed", "Faster", "Slower"],
                ["Capacity", "Limited", "Large"],
                ["Lifetime", "Function scope", "Until freed"],
              ]
            },
          ],
        },
        {
          id: "c-interop",
          title: "C Interoperability",
          blocks: [
            { type: "text", content: "Declare any C function with the proto keyword and call it immediately. No header files, no linking configuration. Variadic functions (printf, scanf, ...) work too." },
            { type: "code", label: "interop.ura", code: `proto fn strlen(s chars) int
proto fn write(fd int, ptr chars, len int) int
proto fn printf(format chars, ...) int

main():
    n int = strlen("hello")
    write(1, "hi\\n", 3)
    printf("length: %d\\n", n)` },
            { type: "heading", content: "Standard Library Modules" },
            { type: "text", content: "The stdlib wraps the most commonly needed C functions. Use the @ prefix to import from $URA_LIB:" },
            { type: "code", label: "imports.ura", code: `use "@/io"       // printf, puts, fopen, fclose, write, read, close
use "@/memory"   // malloc, calloc, realloc, free
use "@/string"   // strlen, strcmp, strcpy, strcat, strdup
use "@/math"     // sqrt, pow, abs, floor, ceil
use "@/stdlib"   // atoi, rand, srand, exit, system
use "@/time"     // time, clock, difftime
use "@/signals"  // signal, raise, SIGINT, SIGTERM
use "@/net"      // socket, bind, listen, accept, connect, send, recv
use "@/header"   // imports ALL of the above at once` },
          ],
        },
        {
          id: "networking",
          title: "Networking",
          blocks: [
            { type: "text", content: "Ura exposes POSIX socket APIs directly through the @/net module. You can build TCP servers and clients without leaving Ura." },
            { type: "code", label: "server.ura", code: `use "@/header"

main():
    server_fd int = socket(2, 1, 0)   // AF_INET, SOCK_STREAM
    if server_fd < 0:
        printf("socket failed\\n")
        return 1

    // Build sockaddr_in manually (16 bytes)
    addr chars = calloc(16, 1)
    addr[0] = 2 as char       // sin_family low byte  (AF_INET = 2)
    addr[1] = 0 as char       // sin_family high byte
    addr[2] = 31 as char      // sin_port high byte   (8080 >> 8 = 31)
    addr[3] = 144 as char     // sin_port low byte    (8080 & 255 = 144)
    // addr[4..7] = 0 from calloc → INADDR_ANY

    bind(server_fd, addr, 16)
    listen(server_fd, 5)
    printf("listening on :8080\\n")

    buf chars    = calloc(1024, 1)
    client_fd int = accept(server_fd, 0 as chars, 0)
    if client_fd >= 0:
        r int = read(client_fd, buf, 1023)
        if r > 0:
            printf("received: %s\\n", buf)
            write(client_fd, "hello from server\\n", 18)
        close(client_fd)

    free(buf)
    free(addr)
    return 0` },
            { type: "info", content: "The projects/tcp/ directory contains complete working examples: a basic chat room, a command-based server with /help, /time, /whoami commands, and shared utilities." },
          ],
        },
        {
          id: "type-introspection",
          title: "Type Introspection",
          blocks: [
            { type: "text", content: "typeof returns the type name of an expression as a string (uppercase). sizeof returns the byte size of a type or value. Both are evaluated at compile time." },
            { type: "code", label: "introspection.ura", code: `use "@/io"

main():
    printf("%s\\n", typeof(42))       // INT
    printf("%s\\n", typeof('a'))      // CHAR
    printf("%s\\n", typeof(True))     // BOOL
    printf("%s\\n", typeof("hello"))  // CHARS

    printf("%d\\n", sizeof(42))       // 4  (size of INT)
    printf("%d\\n", sizeof('a'))      // 1  (size of CHAR)
    printf("%d\\n", sizeof("hello"))  // 8  (pointer size on 64-bit)` },
          ],
        },
      ],
    },
    {
      label: "Real Examples",
      sections: [
        {
          id: "fibonacci",
          title: "Fibonacci",
          blocks: [
            { type: "text", content: "Recursive Fibonacci demonstrates function calls, return values, and the if/elif/else pattern. Ura handles recursion naturally." },
            { type: "code", label: "fibonacci.ura", code: `use "@/io"

fn fib(n int) int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

main():
    i int = 0
    while i < 10:
        printf("fib(%d) = %d\\n", i, fib(i))
        i += 1` },
            { type: "output", label: "output", code: `fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34` },
          ],
        },
        {
          id: "string-functions",
          title: "String Functions",
          blocks: [
            { type: "text", content: "Implementing classic C string utilities in Ura: strlen to count characters, strcmp to compare strings, and putnbr to print a number without using printf." },
            { type: "code", label: "strlen.ura", code: `use "@/io"

fn strlen(s chars) int:
    i int = 0
    while s[i] != '\\0':
        i += 1
    return i

main():
    printf("length: %d\\n", strlen("Hello, Ura!"))   // 11` },
            { type: "code", label: "strcmp.ura", code: `use "@/io"

fn strcmp(left chars, right chars) int:
    i int = 0
    while left[i] == right[i] and left[i] != '\\0':
        i += 1
    return left[i] as int - right[i] as int

main():
    printf("%d\\n", strcmp("d", "a"))   // 3` },
            { type: "code", label: "putnbr.ura", code: `proto fn calloc(len int, size int) chars
proto fn write(fd int, ptr chars, len int) int
proto fn free(ptr chars) int

fn putchar(c char) int:
    str chars = calloc(2, 1)
    str[0] = c
    write(1, str, 1)
    free(str)
    return 0

fn putnbr(n int) void:
    if n < 0:
        putchar('-')
        n = -n
    digits chars = "0123456789"
    temp   int   = n
    count  int   = 0
    while temp > 0:
        count += 1
        temp = temp / 10
    buffer chars = calloc(count + 1, 1)
    i int = count - 1
    while i >= 0:
        buffer[i] = digits[n % 10]
        n = n / 10
        i -= 1
    i = 0
    while i < count:
        putchar(buffer[i])
        i += 1
    free(buffer)

main():
    putnbr(42)
    putchar('\\n')
    putnbr(-456)
    putchar('\\n')` },
          ],
        },
        {
          id: "word-counter",
          title: "Word Counter",
          blocks: [
            { type: "text", content: "Count words in a string by tracking whether we're inside a word. Handles spaces, tabs, and newlines as delimiters." },
            { type: "code", label: "words.ura", code: `use "@/io"

fn count_words(s chars) int:
    count   int  = 0
    in_word bool = False
    i       int  = 0
    while s[i] != '\\0':
        if s[i] != ' ' and s[i] != '\\t' and s[i] != '\\n':
            if not in_word:
                count   += 1
                in_word  = True
        else:
            in_word = False
        i += 1
    return count

main():
    printf("words: %d\\n", count_words("the quick brown fox"))    // 4
    printf("words: %d\\n", count_words("  hello   world  "))      // 2
    printf("words: %d\\n", count_words("one\\ntwo\\tthree"))       // 3` },
          ],
        },
      ],
    },
    {
      label: "Internals",
      sections: [
        {
          id: "compilation-pipeline",
          title: "Compilation Pipeline",
          blocks: [
            { type: "text", content: "The Ura compiler is written entirely in C. The tokenizer, parser, and semantic analysis are all hand-built from scratch. LLVM is used only for the final step — generating and optimizing machine code." },
            { type: "code", label: "pipeline", code: `source.ura
    │
    ▼
 tokenize()      reads the file, produces a flat list of typed tokens
    │            handles strings, escape sequences, comments,
    │            indentation tracking, keywords, and use imports
    ▼
   AST           recursive descent parser builds the syntax tree
    │            operator precedence encoded directly in the call chain:
    │            expr → assign → logic → equality → comparison → add → mul → dot
    ▼
 gen_ir()        first pass: resolves identifiers, registers variables
    │            and functions in their scopes, annotates every node
    │            with its return type — tree is fully typed after this
    ▼
 gen_asm()       second pass: walks the typed AST and emits LLVM IR
    │            via the LLVM C API → writes build/file.ll
    ▼
   llc           LLVM's static compiler: .ll → .s  (native assembly)
    │
    ▼
  clang          assembles and links: .s → executable
    │
    ▼
  exe.out        runs automatically after a successful build` },
            { type: "heading", content: "Source Files" },
            { type: "table", headers: ["File", "Responsibility"],
              rows: [
                ["src/main.c", "Tokenizer, parser, gen_ir(), gen_asm(), main() orchestration"],
                ["src/llvm.c", "Thin wrappers around LLVM C API + helpers: allocate_stack, allocate_heap, ref_assign"],
                ["src/header.h", "Token and Node structs, Type enum, global declarations, function prototypes"],
                ["src/ura-lib/", "Standard library modules: io, memory, string, math, net, ..."],
              ]
            },
            { type: "info", content: "Why LLVM? Writing a code generator targeting x86, ARM, and other architectures directly means implementing instruction selection, register allocation, and calling conventions for each — thousands of lines. LLVM solves all of that. Ura emits architecture-independent LLVM IR and LLVM handles the rest, including -O0 through -O3 optimization passes at no extra cost." },
          ],
        },
        {
          id: "compiler-reference",
          title: "Compiler Reference",
          blocks: [
            { type: "code", label: "usage", code: `ura <file.ura> [options]

# Generates build/ next to the source file
# Executable is placed at build/exe.out (or -o path)
# The executable runs automatically after a successful build` },
            { type: "heading", content: "Compiler Flags" },
            { type: "table", headers: ["Flag", "Description"],
              rows: [
                ["-O0", "No optimization (debug builds)"],
                ["-O1", "Basic optimization"],
                ["-O2", "Standard optimization (recommended for release)"],
                ["-O3", "Aggressive optimization"],
                ["-Os", "Optimize for binary size"],
                ["-Oz", "Minimize binary size (more aggressive than -Os)"],
                ["-san", "Enable AddressSanitizer + debug info (-g)"],
                ["-o <name>", "Output executable name (default: build/exe.out)"],
              ]
            },
            { type: "heading", content: "Dev Commands (from config.sh)" },
            { type: "table", headers: ["Command", "Description"],
              rows: [
                ["build", "Compile the Ura compiler from src/"],
                ["ura <file>", "Compile and immediately run a .ura file"],
                ["tests [folder]", "Run the full test suite (filter by folder name)"],
                ["copy <file.ura>", "Save a .ura file as a test (reads destination from first-line comment)"],
                ["examples", "Generate examples.ura from all test files"],
                ["indent", "Auto-format all C source files with uncrustify"],
                ["update", "Reload config.sh without opening a new shell"],
              ]
            },
          ],
        },
        {
          id: "project-structure",
          title: "Project Structure",
          blocks: [
            { type: "code", label: "tree", code: `ura-lang/
├── src/
│   ├── main.c              # Tokenizer, parser, gen_ir, gen_asm, main
│   ├── llvm.c              # LLVM C API wrappers and helpers
│   ├── header.h            # Token, Node, Type enum, globals, declarations
│   ├── file.ura            # Development scratch file
│   └── ura-lib/            # Standard library
│       ├── header.ura      # Imports all modules at once
│       ├── io.ura          # printf, puts, fopen, fclose, write, read
│       ├── memory.ura      # malloc, calloc, free, realloc
│       ├── string.ura      # strlen, strcmp, strcpy, strcat, strdup
│       ├── math.ura        # sqrt, pow, abs
│       ├── stdlib.ura      # atoi, rand, exit
│       ├── time.ura        # time, clock, difftime
│       ├── signals.ura     # signal, raise
│       └── net.ura         # socket, bind, listen, accept, connect
├── tests/
│   ├── builtins/           # printf, puts, stack, heap, typeof, sizeof
│   ├── data_types/         # references, arrays
│   ├── fn/                 # functions, parameters, return values
│   ├── if/                 # conditionals
│   ├── while/              # loops, break, continue
│   ├── op/                 # arithmetic, logical, comparison, bitwise
│   ├── structs/            # structs, nested structs, methods
│   ├── net/                # TCP client/server examples
│   └── libft/              # strlen, strcmp, putnbr, isalpha ...
├── projects/
│   └── tcp/
│       ├── basic/          # Simple chat room (bidirectional)
│       │   ├── server.ura
│       │   └── client.ura
│       ├── cmd/            # Command-based server: /help /time /whoami
│       │   ├── server.ura
│       │   └── client.ura
│       └── utils.ura       # Shared: SockAddr struct, logging, timestamps
├── build/                  # Compiled compiler executable
├── config.sh               # Build system + dev commands
└── README.md` },
          ],
        },
        {
          id: "status",
          title: "Status & Roadmap",
          blocks: [
            { type: "heading", content: "Working Today" },
            { type: "list", items: [
              "Primitive types: int long short char chars bool float void",
              "Array type declarations: array[type], array[[type]], ...",
              "Stack and heap allocation: stack[type](n), heap[type](n)",
              "Functions, variadic functions (printf-style), single-line functions",
              "Function prototypes for C interop (proto keyword)",
              "References and reference parameters",
              "Structs, nested structs at any depth, methods with self parameter",
              "Struct init() constructor — runs automatically on declaration",
              "if / elif / else with indented blocks",
              "while loops with break and continue",
              "All standard operators: arithmetic, bitwise, logical, comparison, assignment",
              "Type casting with as",
              "typeof and sizeof (compile-time)",
              "Module imports with use (@ for stdlib, relative path for local files)",
              "Multi-file compilation",
              "Networking via POSIX socket APIs (@/net)",
              "Optimization levels (-O0 through -O3, -Os, -Oz)",
              "AddressSanitizer + memory leak detection (-san)",
            ]},
            { type: "heading", content: "Coming Next" },
            { type: "list", items: [
              "For loops",
              "Global variables",
              "Enums",
              "Switch / case",
              "Type inference",
              "Exception handling",
            ]},
          ],
        },
      ],
    },
  ],
};

export const uraJsTutorial = {
  id: "urajs",
  label: "Framework Docs",
  title: "UraJS",
  tagline: "A lightweight SPA framework with directory-based routing, reactive state, and live reload — inspired by React and Next.js.",
  github: "https://github.com/mohammedhrima/UraJS",
  groups: [
    {
      label: "Getting Started",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          blocks: [
            { type: "text", content: "UraJS is a lightweight single-page application (SPA) framework built from scratch. It combines the component model of React with the directory-based routing of Next.js, and adds its own custom JSX extensions for conditions and loops." },
            { type: "list", items: [
              "Directory-based routing — file structure automatically generates routes",
              "Reactive state — Ura.State() triggers DOM updates without a full re-render",
              "Custom JSX tags — <ura-if>, <ura-elif>, <ura-else>, <ura-loop>",
              "Live reloading — changes appear instantly during development",
              "CLI scaffolding — generate routes and components with one command",
              "Docker deployment — build command produces a ready-to-run container setup",
              "Optional TypeScript, SCSS, and Tailwind CSS support",
            ]},
          ],
        },
        {
          id: "quickstart",
          title: "Get Started",
          blocks: [
            { type: "code", label: "bash", code: `# 1. Clone
git clone https://github.com/mohammedhrima/UraJS
cd UraJS

# 2. Install dependencies
npm install

# 3. Start dev server (live reload on port 17000)
npm start

# Open http://localhost:17000` },
            { type: "heading", content: "All Commands" },
            { type: "table", headers: ["Command", "Description"],
              rows: [
                ["npm start", "Start development server with live reload"],
                ["npm run route <name>", "Generate a new route"],
                ["npm run comp <name>", "Generate a new component"],
                ["npm run build", "Build for production + generate Docker setup"],
                ["npm run config", "Interactively change framework configuration"],
                ["npm run clear", "Clear the output directory"],
              ]
            },
          ],
        },
      ],
    },
    {
      label: "Routing",
      sections: [
        {
          id: "generate-routes",
          title: "Generate Routes",
          blocks: [
            { type: "text", content: "UraJS automatically generates routes from the file structure. Running npm run route <name> scaffolds a complete page with Header, Main, and Footer components." },
            { type: "code", label: "bash", code: `# Basic route — accessible at /user
npm run route user

# Creates:
# pages/user/
#   user.jsx     ← main route file
#   header.jsx   ← header component
#   main.jsx     ← main content
#   footer.jsx   ← footer component
#   user.css     ← route styles
#   components/  ← route-specific components folder` },
            { type: "code", label: "bash", code: `# Nested route — accessible at /user/settings
npm run route user/settings
# Creates: pages/user/settings/settings.jsx

# Multiple routes at once
npm run route home about contact` },
            { type: "heading", content: "Generated route file" },
            { type: "code", label: "pages/user/user.jsx", code: `import Ura, { VDOM, Props } from 'ura';
import Header from './header';
import Main from './main';
import Footer from './footer';

function User(props: Props): VDOM {
  document.title = "user Page";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default User;` },
          ],
        },
        {
          id: "navigation",
          title: "Navigation",
          blocks: [
            { type: "text", content: "Use Ura.navigate() to programmatically change the current route. It updates the URL and loads the corresponding component without a full page reload." },
            { type: "code", label: "Navbar.jsx", code: `import Ura from 'ura';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li onclick={() => Ura.navigate("/home")}>
          <a href="/home">Home</a>
        </li>
        <li onclick={() => Ura.navigate("/about")}>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;` },
            { type: "info", content: "Event names in UraJS are lowercase: onclick, onchange, onkeyup, etc. This differs from React's camelCase (onClick). See W3Schools JS Events for the full list." },
          ],
        },
        {
          id: "navigate-params",
          title: "Navigate with Parameters",
          blocks: [
            { type: "text", content: "Pass a parameters object as the second argument to Ura.navigate(). Retrieve it in the target route with Ura.getParams()." },
            { type: "code", label: "pages/home/main.jsx — Sending params", code: `import Ura from 'ura';

function Home() {
  return (
    <div className="home">
      <h1>Welcome!</h1>
      <button onclick={() => Ura.navigate("/user", {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin"
      })}>
        Go to Profile
      </button>
    </div>
  );
}

export default Home;` },
            { type: "code", label: "pages/user/main.jsx — Receiving params", code: `import Ura from 'ura';

function Main() {
  const { name, email, role } = Ura.getParams();

  return (
    <main className="user-profile">
      <h1>User: {name}</h1>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </main>
  );
}

export default Main;` },
          ],
        },
      ],
    },
    {
      label: "Core Concepts",
      sections: [
        {
          id: "state",
          title: "State Management",
          blocks: [
            { type: "text", content: "Ura.State() creates reactive state. Unlike React's useState, the value is accessed by calling the getter as a function: count() not count. The setter triggers a re-render." },
            { type: "code", label: "Counter.jsx", code: `import Ura, { VDOM, Props } from 'ura';

function Counter(props: Props): VDOM {
  const [count, setCount] = Ura.State(0);
  const [name, setName]   = Ura.State("World");

  return (
    <div className="counter">
      <h1>Hello, {name()}!</h1>
      <p>Count: {count()}</p>

      <button onclick={() => setCount(count() + 1)}>
        Increment
      </button>
      <button onclick={() => setCount(count() - 1)}>
        Decrement
      </button>
      <button onclick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;` },
            { type: "table", headers: ["React", "UraJS"],
              rows: [
                ["useState(0)", "Ura.State(0)"],
                ["const [x, setX] = useState(0)", "const [x, setX] = Ura.State(0)"],
                ["x (direct access)", "x() (call as function)"],
                ["setX(newValue)", "setX(newValue)"],
                ["onClick", "onclick"],
              ]
            },
          ],
        },
        {
          id: "components",
          title: "Generate Components",
          blocks: [
            { type: "text", content: "Components can be shared globally (available across all routes) or scoped to a specific route. The CLI scaffolds the file in the right place automatically." },
            { type: "code", label: "bash — shared components", code: `# Shared (global) components → src/components/
npm run comp Navbar
npm run comp Button

# Creates:
# src/components/
#   Navbar.jsx  Navbar.css
#   Button.jsx  Button.css` },
            { type: "code", label: "bash — route-scoped components", code: `# Route-specific → pages/<route>/components/
npm run comp user/UserProfile user/UserStats

# Creates:
# pages/user/components/
#   UserProfile.jsx  UserProfile.css
#   UserStats.jsx    UserStats.css

# Deeply nested route component
npm run comp user/settings/SettingsForm
# → pages/user/settings/components/SettingsForm.jsx` },
            { type: "heading", content: "Generated component" },
            { type: "code", label: "Button.jsx", code: `import Ura, { VDOM, Props } from 'ura';

function Button(props: Props): VDOM {
  const [count, setCount] = Ura.State(0);

  return (
    <div className="button">
      <h1>Hello from Button!</h1>
      <button onclick={() => setCount(count() + 1)}>
        Click me [{count()}]
      </button>
    </div>
  );
}

export default Button;` },
          ],
        },
      ],
    },
    {
      label: "Templates",
      sections: [
        {
          id: "conditions",
          title: "Conditions",
          blocks: [
            { type: "text", content: "UraJS adds custom JSX tags for conditional rendering. You can use them as tags (<ura-if>) or as attributes on any element (ura-if={...}). Both forms work identically." },
            { type: "code", label: "WeatherDisplay.jsx", code: `import Ura from "ura";

function WeatherDisplay() {
  const [temp, setTemp]         = Ura.State(25);
  const [isRaining, setRaining] = Ura.State(false);

  return (
    <div className="weather">
      {/* Tag syntax — the tag itself doesn't appear in the DOM */}
      <ura-if cond={temp() > 30}>
        <div className="alert hot">Heat warning!</div>
      </ura-if>
      <ura-elif cond={temp() < 0}>
        <div className="alert cold">Freezing temperatures!</div>
      </ura-elif>
      <ura-else>
        <div>Normal temperature range</div>
      </ura-else>

      {/* Attribute syntax */}
      <div ura-if={isRaining()}>Bring an umbrella!</div>
      <div ura-else>No rain expected</div>

      {/* Standard JSX ternary still works */}
      <p>Currently: {temp() > 20 ? "Warm" : "Cool"} — {temp()}°C</p>

      <button onclick={() => setTemp(temp() + 5)}>+5°C</button>
      <button onclick={() => setTemp(temp() - 5)}>-5°C</button>
      <button onclick={() => setRaining(!isRaining())}>Toggle Rain</button>
    </div>
  );
}` },
          ],
        },
        {
          id: "loops",
          title: "Loops",
          blocks: [
            { type: "text", content: "The <ura-loop> tag iterates over an array without adding a wrapper element to the DOM. You can also use ura-loop as an attribute (the element IS added even if empty), or standard .map() which always works." },
            { type: "code", label: "ShoppingList.jsx", code: `import Ura from "ura";

function ShoppingList() {
  const [items, setItems] = Ura.State(["Milk", "Eggs", "Bread"]);

  const removeItem = (index) =>
    setItems(items().filter((_, i) => i !== index));

  return (
    <div className="list">
      <h2>Shopping List</h2>

      {/* Tag syntax — no wrapper div in DOM */}
      <ura-loop on={items()}>
        {(item, index) => (
          <div key={index} className="list-item">
            <span>{index + 1}. {item}</span>
            <button onclick={() => removeItem(index)}>Remove</button>
          </div>
        )}
      </ura-loop>

      {/* Attribute syntax — div IS added to DOM even if array is empty */}
      <div ura-loop={items()}>
        {(item, index) => <li key={index}>{item}</li>}
      </div>

      {/* Standard .map() — classic React-style */}
      {items().map((item, i) => (
        <li key={i}>{item}</li>
      ))}

      <button onclick={() => setItems([...items(), "New Item"])}>
        Add Item
      </button>
    </div>
  );
}` },
          ],
        },
        {
          id: "composition",
          title: "Component Composition",
          blocks: [
            { type: "text", content: "Components accept props and children just like React. Define a component that takes props and children, then compose it from a parent." },
            { type: "code", label: "Card.jsx", code: `import Ura from 'ura';

function Card(props, children) {
  return (
    <div className="card">
      <h2 className="card-title">{props.title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;` },
            { type: "code", label: "Dashboard.jsx — using Card", code: `import Ura from 'ura';
import Card from '../../components/Card.js';

function Dashboard() {
  return (
    <div className="dashboard">
      <Card title="User Info">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </Card>

      <Card title="Statistics">
        <ul>
          <li>Posts: 34</li>
          <li>Followers: 120</li>
          <li>Following: 89</li>
        </ul>
      </Card>
    </div>
  );
}

export default Dashboard;` },
          ],
        },
        {
          id: "tailwind",
          title: "Tailwind CSS",
          blocks: [
            { type: "text", content: "Tailwind CSS is optional. Enable it in ura.config.js, then use utility classes directly in your JSX." },
            { type: "code", label: "bash", code: `# Enable Tailwind via the config CLI
npm run config
# → set tailwind: "enable"` },
            { type: "code", label: "Button.jsx with Tailwind", code: `import Ura from "ura";

function Button() {
  const [count, setCount] = Ura.State(0);

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg
                 hover:bg-blue-700 transition-colors duration-300
                 active:scale-95"
      onclick={() => setCount(count() + 1)}
    >
      Click Me [{count()}]
    </button>
  );
}

export default Button;` },
          ],
        },
      ],
    },
    {
      label: "Tooling",
      sections: [
        {
          id: "configuration",
          title: "Configuration",
          blocks: [
            { type: "text", content: "The ura.config.js file controls all framework features. Run npm run config to change settings interactively with validation." },
            { type: "code", label: "ura.config.js (defaults)", code: `typescript: "disable"   // "enable" | "disable"
dirRouting: "enable"    // directory-based routing
defaultRoute: "home"    // route loaded at /
tailwind: "disable"     // "enable" | "disable"
scss: "disable"         // "enable" | "disable"
css: "enable"           // "enable" | "disable"
port: 17000             // dev server port` },
            { type: "code", label: "bash", code: `npm run config
# Interactive CLI — prompts you to change each setting
# Validates your input and writes ura.config.js` },
          ],
        },
        {
          id: "project-structure",
          title: "Project Structure",
          blocks: [
            { type: "code", label: "tree", code: `UraJS/
├── out/                     # Production-ready transpiled JS
│
├── scripts/                 # Framework internal scripts
│
├── src/
│   ├── assets/              # Static assets (images, fonts)
│   │
│   ├── components/          # Shared/global components
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── pages/               # Route-based components
│   │   ├── home/            # Route: /home
│   │   │   ├── home.jsx     # Main route file
│   │   │   ├── header.jsx
│   │   │   ├── main.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── home.css
│   │   │   └── components/  # Route-specific components
│   │   │
│   │   ├── main.js          # Application entry point
│   │   ├── main.scss        # Global styles / variables
│   │   └── tailwind.css     # Tailwind imports (if enabled)
│   │
│   ├── services/
│   │   └── api.jsx          # API service layer
│   │
│   └── ura/                 # Framework frontend core
│
├── tailwind.config.js
├── ura.config.js            # Framework configuration
├── tsconfig.json
└── package.json` },
          ],
        },
        {
          id: "deploy",
          title: "Deploy with Docker",
          blocks: [
            { type: "text", content: "Running npm run build does two things: generates the production bundle AND scaffolds a complete Docker + Nginx setup. Just navigate to docker/ and run make." },
            { type: "code", label: "bash", code: `# 1. Build for production
npm run build

# Generates:
# docker/
#   app/               ← all transpiled files
#   nginx/nginx.conf   ← Nginx configuration
#   Dockerfile
#   docker-compose.yml
#   Makefile` },
            { type: "code", label: "bash", code: `# 2. Start the container
cd docker
make

# 3. Open in browser
# http://localhost:17000

# 4. Stop
make down

# 5. Remove volumes and images
make clean` },
            { type: "info", content: "The port in the Docker setup is automatically configured from your ura.config.js settings at build time." },
          ],
        },
      ],
    },
  ],
};
