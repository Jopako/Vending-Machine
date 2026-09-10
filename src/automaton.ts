export type Coin = 5 | 10 | 25

export type MachineState =
  0 | 5 | 10 | 15 | 20 | 25

export interface Transition {
  from: MachineState
  coin: Coin
  to: MachineState
}

export const states: MachineState[] = [
  0,
  5,
  10,
  15,
  20,
  25
]

export const coins: Coin[] = [
  5,
  10,
  25
]

export const transitions: Transition[] =
  states.flatMap((from) =>
    coins.map((coin) => ({
      from,
      coin,
      to: (
        from + coin >= 30
          ? 0
          : from + coin
      ) as MachineState
    }))
  )

export function transition(
  state: MachineState,
  coin: Coin
): MachineState {
  return (
    state + coin >= 30
      ? 0
      : state + coin
  ) as MachineState
}

export function stateLabel(
  state: MachineState
) {
  return `q${state}`
}

export function stateMeaning(
  state: MachineState
) {
  if (state === 0) {
    return 'Sem saldo inserido'
  }

  return `Saldo acumulado: ${state} centavos`
}

export function calculateChange(
  balance: number
) {
  return Math.max(0, balance - 30)
}