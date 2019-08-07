type Spell = {
  main: string,
  similar: string[],
  code: number,
  command?: string // 아직은 undefined
}
type SpellOnRemote = {
  main: string,
  active: boolean,
  command: string
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
  rcUsageState: boolean|null
}
type DirBtn = {
  direction: string,
  comment: string
}

export {
  Spell,
  SpellOnRemote,
  Part,
  Parts,
  InitialAppState,
  DirBtn
}