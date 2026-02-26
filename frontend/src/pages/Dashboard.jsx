import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import Summary from '../components/Summary'
import TransactionList from '../components/TransactionList'
import TransactionForm from '../components/TransactionForm'
import Chart from '../components/Chart'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({ receitas: 0, despesas: 0, saldo: 0 })
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [filter, setFilter] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const fetchData = async () => {
    try {
      const [transRes, sumRes] = await Promise.all([
        api.get('/transactions', { params: filter }),
        api.get('/transactions/summary', { params: filter }),
      ])
      setTransactions(transRes.data)
      setSummary(sumRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter])

  const handleSaved = () => {
    setShowForm(false)
    setEditingTransaction(null)
    fetchData()
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja remover esta transação?')) return
    await api.delete(`/transactions/${id}`)
    fetchData()
  }

  const months = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ]

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1 className="dash-logo">Finance<span>App</span></h1>
        <div className="dash-user">
          <span>Olá, {user?.name}</span>
          <button onClick={logout} className="btn-logout">Sair</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-filters">
          <select
            value={filter.month}
            onChange={(e) => setFilter({ ...filter, month: Number(e.target.value) })}
          >
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select
            value={filter.year}
            onChange={(e) => setFilter({ ...filter, year: Number(e.target.value) })}
          >
            {[2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button className="btn-add" onClick={() => { setEditingTransaction(null); setShowForm(true) }}>
            + Nova Transação
          </button>
        </div>

        <Summary summary={summary} />
        <Chart transactions={transactions} />

        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSaved={handleSaved}
          onClose={() => { setShowForm(false); setEditingTransaction(null) }}
        />
      )}
    </div>
  )
}
