import { useState } from "react";

/**
 * Odin's homepage code panel: a <select> that swaps between short, real
 * examples of the language. A plain select (rather than a tab strip) keeps the
 * control usable on mobile and needs no custom keyboard handling.
 */
const EXAMPLES = [
  {
    id: "hello",
    label: "Hello, Dungeon",
    code: `main():
    hero  chars = "Aldric"
    hp    int   = 100
    alive bool  = True

    output("=== ", hero, " enters the dungeon ===\\n")
    output("HP: ", hp, "  alive: ", alive, "\\n")`,
  },
  {
    id: "structs",
    label: "Structs & Methods",
    code: `struct Hero:
    name  chars
    level int
    hp    int

    pub fn new(name chars) Hero:
        h Hero
        h.name  = name
        h.level = 1
        h.hp    = 100
        return h

    fn heal(amount int) void:
        self.hp = self.hp + amount

main():
    hero Hero = Hero::new("Aldric")
    hero.heal(20)
    output(hero.name, " HP:", hero.hp, "\\n")`,
  },
  {
    id: "operators",
    label: "Operator Overloading",
    code: `struct Vec2:
    x int
    y int

    operator + (v Vec2 ref) Vec2:
        res Vec2
        res.x = self.x + v.x
        res.y = self.y + v.y
        return res

    operator == (v Vec2 ref) bool:
        return self.x == v.x and self.y == v.y

main():
    a Vec2
    a.x = 1
    a.y = 2

    b Vec2 = a + a
    output("(", b.x, ", ", b.y, ")\\n")`,
  },
  {
    id: "generics",
    label: "Generic List[T]",
    code: `use "@/memory"

main():
    loot List[int]
    loot.push(15)
    loot.push(30)
    loot.push(100)

    total int = 0
    i     int = 0
    while i < loot.len():
        total += loot[i]
        i += 1

    output("Total gold: ", total, "\\n")`,
  },
];

export default function CodeShowcase() {
  const [active, setActive] = useState(EXAMPLES[0].id);
  const example = EXAMPLES.find((e) => e.id === active) ?? EXAMPLES[0];

  return (
    <div>
      <label htmlFor="ura-example" className="sr-only">
        Choose an Ura example
      </label>
      <select
        id="ura-example"
        value={active}
        onChange={(e) => setActive(e.target.value)}
        className="mb-2 w-full rounded border border-[var(--ds-border)] bg-[var(--ds-bg)] px-3 py-2 text-sm text-[var(--ds-fg)]"
      >
        {EXAMPLES.map((e) => (
          <option key={e.id} value={e.id}>
            {e.label}
          </option>
        ))}
      </select>

      <div className="ds-code !mt-0 h-[19rem] overflow-auto">
        <pre>
          <code>{example.code}</code>
        </pre>
      </div>
    </div>
  );
}
