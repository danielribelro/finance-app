const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const { month, year, category, type } = req.query;
    const filter = { user: req.userId };

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      filter.date = { $gte: start, $lt: end };
    }

    if (category) filter.category = category;
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};

const createTransaction = async (req, res) => {
  const { description, amount, type, category, date } = req.body;

  try {
    const transaction = await Transaction.create({
      user: req.userId,
      description,
      amount,
      type,
      category,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch {
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    res.json(transaction);
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar transação' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    res.json({ message: 'Transação removida' });
  } catch {
    res.status(500).json({ message: 'Erro ao deletar transação' });
  }
};

const getSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = { user: req.userId };

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      filter.date = { $gte: start, $lt: end };
    }

    const transactions = await Transaction.find(filter);

    const receitas = transactions
      .filter((t) => t.type === 'receita')
      .reduce((acc, t) => acc + t.amount, 0);

    const despesas = transactions
      .filter((t) => t.type === 'despesa')
      .reduce((acc, t) => acc + t.amount, 0);

    res.json({ receitas, despesas, saldo: receitas - despesas });
  } catch {
    res.status(500).json({ message: 'Erro ao buscar resumo' });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary };
