import { useMemo, useState } from 'react'

import {
  Check,
  CircleDollarSign,
  RotateCcw,
  Sparkles
} from 'lucide-react'

import coin5 from './assets/5coin.png'
import coin10 from './assets/10coin.png'
import coin25 from './assets/25coin.png'

import vendingFront from './assets/VendingFront.png'
import vendingOutput from './assets/VendingOutput.png'

import {
  calculateChange,
  coins,
  stateLabel,
  stateMeaning,
  states,
  transition,
  type Coin,
  type MachineState
} from './automaton'

import Home from './Home'

type LogItem = {
  id: number
  coin: Coin
  from: MachineState
  to: MachineState
  output: string
}

const coinImages: Record<Coin, string> = {
  5: coin5,
  10: coin10,
  25: coin25
}

function App() {
  const [screen, setScreen] = useState<'home' | 'machine'>('home')

  const [state, setState] = useState<MachineState>(0)
  const [balance, setBalance] = useState(0)
  const [history, setHistory] = useState<LogItem[]>([])
  const [delivered, setDelivered] = useState(false)
  const [change, setChange] = useState(0)

  const progress = Math.min((balance / 30) * 100, 100)
  const lastTransition = history.at(-1)

  const machineStatus = useMemo(() => {
    if (delivered) return 'Produto entregue!'
    if (balance > 0) return 'Crédito inserido'
    return 'Aguardando moedas...'
  }, [delivered, balance])

  function insertCoin(coin: Coin) {
    if (delivered) return

    const from = state
    const total = balance + coin
    const to = transition(state, coin)
    const newChange = calculateChange(total)

    const output =
      total >= 30
        ? newChange > 0
          ? `PRODUTO + TROCO ${newChange}¢`
          : 'PRODUTO'
        : ''

    setHistory((items) => [
      ...items,
      {
        id: Date.now(),
        coin,
        from,
        to,
        output
      }
    ])

    if (total >= 30) {
      setDelivered(true)
      setChange(newChange)
      setState(0)
      setBalance(0)
      return
    }

    setState(to)
    setBalance(total)
  }

  function reset() {
    setState(0)
    setBalance(0)
    setHistory([])
    setDelivered(false)
    setChange(0)
  }

  if (screen === 'home') {
    return (
      <Home
        onNext={() => setScreen('machine')}
      />
    )
  }

  return (
    <main className="machine-page">
      <header className="topbar">
       

      </header>

      <section className="machine-layout">
        <div className="machine-side">
          <section className="machine panel">
            <div className="machine-visual">
              <div className="machine-stack">
                <img
                  src={vendingFront}
                  alt="Frente da máquina de vendas"
                />

                <img
                  src={vendingOutput}
                  alt="Saída do produto"
                />
              </div>

              <div className="coin-area">
                <h3>Inserir moeda</h3>

                <div className="coin-grid">
                  {coins.map((coin) => (
                    <button
                      className="coin"
                      key={coin}
                      onClick={() => insertCoin(coin)}
                      disabled={delivered}
                      aria-label={`Inserir moeda de ${coin} centavos`}
                    >
                      <img
                        className="coin-image"
                        src={coinImages[coin]}
                        alt={`Moeda de ${coin} centavos`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <button
            className="reset"
            onClick={reset}
          >
            <RotateCcw size={18} />
            Reiniciar máquina
          </button>
        </div>

        <section className="machine-controls">
          <h1 className="controls-title">
            Acompanhe o funcionamento da máquina
          </h1>

          <div className="machine-screen">
            <span className="screen-dot" />

            <div className="screen-text">
              <small>STATUS</small>
              <strong>{machineStatus}</strong>
            </div>

            <div className="screen-state">
              {stateLabel(state)}
            </div>
          </div>

          <div className="balance-box">
            <div className="balance-head">
              <span>Saldo inserido</span>

              <strong>{balance}¢</strong>
            </div>

            <div className="progress">
              <div
                style={{
                  width: `${progress}%`
                }}
              />
            </div>

            <span className="muted">
              {Math.max(0, 30 - balance)}¢ restantes
            </span>
          </div>

          {delivered && (
            <div className="success">
              <div className="success-icon">
                <Check size={18} />
              </div>

              <div>
                <strong>Produto liberado!</strong>

                <span>
                  {change > 0
                    ? `Troco devolvido: ${change}¢`
                    : 'Sem troco.'
                  }
                </span>
              </div>

              <Sparkles
                size={20}
                className="success-sparkle"
              />
            </div>
          )}

          <section className="panel automaton">
            <div className="section-title">
              <div>
                <span className="eyebrow">
                  AUTÔMATO EM TEMPO REAL
                </span>

                <h2>Estados</h2>
              </div>

              <CircleDollarSign />
            </div>

            <div className="state-track">
              {states.map((s, index) => (
                <div
                  className="state-wrap"
                  key={s}
                >
                  <div
                    className={`state-node ${
                      s === state ? 'active' : ''
                    }`}
                  >
                    <span>
                      {stateLabel(s)}
                    </span>

                    <small>
                      {s}¢
                    </small>
                  </div>

                  {index < states.length - 1 && (
                    <div
                      className={`arrow ${
                        state === states[index + 1]
                          ? 'lit'
                          : ''
                      }`}
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="current-state">
              <span>ESTADO ATUAL</span>

              <strong>
                {stateLabel(state)}
              </strong>

              <p>
                {stateMeaning(state)}
              </p>
            </div>

            <div className="transition-card">
              <span>ÚLTIMA TRANSIÇÃO</span>

              {lastTransition ? (
                <>
                  <div>
                    <strong>
                      {stateLabel(lastTransition.from)}
                    </strong>

                    <b>
                      — {lastTransition.coin}¢ →
                    </b>

                    <strong>
                      {stateLabel(lastTransition.to)}
                    </strong>
                  </div>

                  {lastTransition.output && (
                    <p className="transition-output">
                      {lastTransition.output}
                    </p>
                  )}
                </>
              ) : (
                <p>
                  Nenhuma moeda inserida ainda.
                </p>
              )}
            </div>
          </section>

          <section className="panel history">
            <div className="section-title">
              <div>
                <span className="eyebrow">
                  EXECUÇÃO
                </span>

                <h2>Histórico</h2>
              </div>

              <span className="counter">
                {history.length}
              </span>
            </div>

            {history.length === 0 ? (
              <div className="empty">
                Insira uma moeda para começar a execução.
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div
                    className="history-row"
                    key={item.id}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <strong>
                      {stateLabel(item.from)}
                    </strong>

                    <b>
                      — {item.coin}¢ →
                    </b>

                    <strong
                      className={
                        item.to === state
                          ? 'current'
                          : ''
                      }
                    >
                      {stateLabel(item.to)}
                    </strong>

                    {item.output && (
                      <small className="history-output">
                        {item.output}
                      </small>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

        </section>
      </section>
    </main>
  )
}

export default App
