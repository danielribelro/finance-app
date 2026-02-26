export default function Summary({ summary }) {
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="summary">
      <div className="summary-card receita">
        <p className="summary-label">Receitas</p>
        <p className="summary-value">{fmt(summary.receitas)}</p>
      </div>
      <div className="summary-card despesa">
        <p className="summary-label">Despesas</p>
        <p className="summary-value">{fmt(summary.despesas)}</p>
      </div>
      <div className={`summary-card saldo ${summary.saldo >= 0 ? 'positivo' : 'negativo'}`}>
        <p className="summary-label">Saldo</p>
        <p className="summary-value">{fmt(summary.saldo)}</p>
      </div>
    </div>
  )
}
