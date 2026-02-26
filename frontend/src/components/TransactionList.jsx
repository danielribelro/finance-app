export default function TransactionList({ transactions, onEdit, onDelete }) {
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fmtDate = (d) => new Date(d).toLocaleDateString('pt-BR')

  if (transactions.length === 0) {
    return (
      <div className="list-empty">
        <p>Nenhuma transação encontrada para este período.</p>
      </div>
    )
  }

  return (
    <div className="transaction-list">
      <h3>Transações</h3>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.description}</td>
              <td><span className="tag">{t.category}</span></td>
              <td>{fmtDate(t.date)}</td>
              <td className={t.type === 'receita' ? 'valor-receita' : 'valor-despesa'}>
                {t.type === 'receita' ? '+' : '-'} {fmt(t.amount)}
              </td>
              <td className="actions">
                <button onClick={() => onEdit(t)} className="btn-edit">Editar</button>
                <button onClick={() => onDelete(t._id)} className="btn-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
