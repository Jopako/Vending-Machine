import { useMemo, useState } from "react";
import { Check, CircleDollarSign, RotateCcw, Sparkles } from "lucide-react";

import coin5 from "./assets/5coin.png";
import coin10 from "./assets/10coin.png";
import coin25 from "./assets/25coin.png";
import vendingFront from "./assets/VendingFront.png";
import vendingOutput from "./assets/VendingOutput.png";
import {
  calculateChange,
  coins,
  stateLabel,
  stateMeaning,
  states,
  transition,
  type Coin,
  type MachineState,
} from "./automaton";

type LogItem = {
  id: number;
  coin: Coin;
  from: MachineState;
  to: MachineState;
  output: string;
};

const coinImages: Record<Coin, string> = {
  5: coin5,
  10: coin10,
  25: coin25,
};

function App() {
  const [state, setState] = useState<MachineState>(0);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<LogItem[]>([]);
  const [delivered, setDelivered] = useState(false);
  const [change, setChange] = useState(0);

  const progress = Math.min((balance / 30) * 100, 100);
  const lastTransition = history.at(-1);

  const machineStatus = useMemo(() => {
    if (delivered) return "Produto entregue!";
    if (balance > 0) return "Crédito inserido";
    return "Aguardando moedas...";
  }, [delivered, balance]);

  function insertCoin(coin: Coin) {
    if (delivered) return;

    const from = state;
    const total = balance + coin;

    // A máquina do JFLAP volta para q0 quando chega a 30¢ ou mais.
    const to = transition(state, coin);

    const newChange = calculateChange(total);

    const output =
      total >= 30
        ? newChange > 0
          ? `PRODUTO + TROCO ${newChange}¢`
          : "PRODUTO"
        : "";

    setHistory((items) => [
      ...items,
      {
        id: Date.now(),
        coin,
        from,
        to,
        output,
      },
    ]);

    if (total >= 30) {
      setDelivered(true);
      setChange(newChange);

      // Após entregar o produto, volta para q0.
      setState(0);
      setBalance(0);

      return;
    }

    setState(to);
    setBalance(total);
  }

  function reset() {
    setState(0);
    setBalance(0);
    setHistory([]);
    setDelivered(false);
    setChange(0);
  }

  return (
    <main>
      <header className="topbar">
        <div>
          <h1>Vending Machine</h1>

          <p>Simulador de autômato finito com visualização das transições.</p>
        </div>

        <div className="price-chip">
          PRODUTO <strong>30¢</strong>
        </div>
      </header>

      <section className="layout">
        {/* =========================
            MÁQUINA
        ========================== */}
        <div className="machine panel">
          <div className="machine-screen">
            <span className="screen-dot" />

            <div>
              <small>STATUS</small>
              <strong>{machineStatus}</strong>
            </div>

            <div className="screen-state">{stateLabel(state)}</div>
          </div>

          {/* =========================
              SPRITE DA MÁQUINA
          ========================== */}
          <div className="machine-sprite">
            <div className="machine-stack">
              <img src={vendingFront} alt="Frente da máquina de vendas" />
              <img src={vendingOutput} alt="Saída do produto" />
            </div>
          </div>

          {/* =========================
              SALDO
          ========================== */}
          <div className="balance-box">
            <div className="balance-head">
              <span>Saldo inserido</span>

              <strong>{balance}¢</strong>
            </div>

            <div className="progress">
              <div style={{ width: `${progress}%` }} />
            </div>

            <span className="muted">
              {Math.max(0, 30 - balance)}¢ restantes
            </span>
          </div>

          {/* =========================
              MOEDAS
          ========================== */}
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

          {/* =========================
              RESULTADO
          ========================== */}
          {delivered && (
            <div className="success">
              <div className="success-icon">
                <Check size={18} />
              </div>

              <div>
                <strong>Produto liberado!</strong>

                <span>
                  {change > 0 ? `Troco devolvido: ${change}¢` : "Sem troco."}
                </span>
              </div>

              <Sparkles size={20} className="success-sparkle" />
            </div>
          )}

          {/* =========================
              RESET
          ========================== */}
          <button className="reset" onClick={reset}>
            <RotateCcw size={17} />
            Reiniciar máquina
          </button>
        </div>

        {/* =========================
            PAINEL LATERAL
        ========================== */}
        <div className="side">
          <section className="panel automaton">
            <div className="section-title">
              <div>
                <span className="eyebrow">AUTÔMATO EM TEMPO REAL</span>

                <h2>Estados</h2>
              </div>

              <CircleDollarSign />
            </div>

            <div className="state-track">
              {states.map((s, index) => (
                <div className="state-wrap" key={s}>
                  <div className={`state-node ${s === state ? "active" : ""}`}>
                    <span>{stateLabel(s)}</span>

                    <small>{s}¢</small>
                  </div>

                  {index < states.length - 1 && (
                    <div
                      className={`arrow ${
                        state === states[index + 1] ? "lit" : ""
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

              <strong>{stateLabel(state)}</strong>

              <p>{stateMeaning(state)}</p>
            </div>

            <div className="transition-card">
              <span>ÚLTIMA TRANSIÇÃO</span>

              {lastTransition ? (
                <>
                  <div>
                    <strong>{stateLabel(lastTransition.from)}</strong>

                    <b>— {lastTransition.coin}¢ →</b>

                    <strong>{stateLabel(lastTransition.to)}</strong>
                  </div>

                  {lastTransition.output && (
                    <p className="transition-output">{lastTransition.output}</p>
                  )}
                </>
              ) : (
                <p>Nenhuma moeda inserida ainda.</p>
              )}
            </div>
          </section>

          {/* =========================
              HISTÓRICO
          ========================== */}
          <section className="panel history">
            <div className="section-title">
              <div>
                <span className="eyebrow">EXECUÇÃO</span>

                <h2>Histórico</h2>
              </div>

              <span className="counter">{history.length}</span>
            </div>

            {history.length === 0 ? (
              <div className="empty">
                Insira uma moeda para começar a execução.
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div className="history-row" key={item.id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <strong>{stateLabel(item.from)}</strong>

                    <b>— {item.coin}¢ →</b>

                    <strong className={item.to === state ? "current" : ""}>
                      {stateLabel(item.to)}
                    </strong>

                    {item.output && (
                      <small className="history-output">{item.output}</small>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =========================
              EXPLICAÇÃO
          ========================== */}
          <section className="info">
            <strong>Como funciona?</strong>

            <p>
              Cada estado representa o valor acumulado. As moedas de 5¢, 10¢ e
              25¢ provocam transições. Ao atingir 30¢ ou mais, o produto é
              liberado e o excesso vira troco.
            </p>
          </section>
        </div>
      </section>

      <footer>
        <span>Autômato Finito · Vending Machine</span>

        <span>
          Σ = {"{"}5, 10, 25{"}"} · Preço = 30¢
        </span>
      </footer>
    </main>
  );
}

export default App;
