type Spell = {
  main: string,
  similar: string[],
  code: number,
  command?: string // 아직은 undefined
}
type Part = {
  id: number,
  korean: string,
  spells: Spell[],
  stop: {
    code: number,
    command?: string
  }
}
type Parts = {
  HAND: Part,
  ARM: Part,
  WAIST: Part,
  BOTTOM: Part
}
type InitialAppState = {
  willUseVoice: boolean|null
}

export {
  Spell,
  Part,
  Parts,
  InitialAppState
}