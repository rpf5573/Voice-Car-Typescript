type Spell = {
  main: string,
  similar: string[],
  code: number
}
type Part = {
  id: number,
  korean: string,
  spells: Spell[]
}
type Parts = {
  HAND: Part,
  ARM: Part,
  WAIST: Part,
  BOTTOM: Part
}

export {
  Spell,
  Part,
  Parts
}