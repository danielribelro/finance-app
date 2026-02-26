import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#4ade80', '#f87171', '#60a5fa', '#facc15', '#c084fc', '#fb923c']

export default function Chart({ transactions }) {
  const categories = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const data = Object.entries(categories).map(([name, value]) => ({ name, value }))

  if (data.length === 0) {
    return (
      <div className="chart-empty">
        <p>Nenhuma despesa registrada neste período.</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3>Despesas por Categoria</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
