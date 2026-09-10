import velho from './assets/Oldman.png'

type HomeProps = {
  onNext: () => void
}

function Home({ onNext }: HomeProps) {
  return (
    <main className="home">
      <div className="home-character">
        <img
          src={velho}
          alt="Velho da vending machine"
        />
      </div>

      <div className="home-dialog">
        <span className="eyebrow">
          -Velho, dono de Máquinas Autômatas Finitas.
        </span>

        <h1>Olá, visitante...</h1>

    <p>-Gosta de Máquinas Autômat... *hrã-hrãm*, digo, Máquinas de vendas? </p>

        <p>
          -Esta máquina vende comidas e brinquedos por apenas
          <strong> 30 centavos.</strong>
        </p>

        <p>
          -Ela aceita moedas de 5¢, 10¢ e 25¢...
        </p>
        <p>          -Vai comprar algo ou ficar parado ai?
</p>

        <button
          className="next-button"
          onClick={onNext}
        >
          Ir às compras!
        </button>
      </div>
    </main>
  )
}

export default Home