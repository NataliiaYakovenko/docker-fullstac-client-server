import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionsSlise';

const TransactionsPage = ({ transactions, isFetching, error, get }) => {

  useEffect(()=>{
      get()
  },[])


  const transaction = [
    {
      id: 1,
      userId: 1,
      createdAt: '2025-10-01',
      operationType: 'INCOME',
      summa: 10,
    },
    {
      id: 2,
      userId: 1,
      createdAt: '2025-10-01',
      operationType: 'INCOME',
      summa: 10,
    },
  ];

  const mapTransaction = (t) => (
    <tr key={t.id}>
      <td>{t.createdAt}</td>
      <td>{t.operationType}</td>
      <td>{t.summa}</td>
    </tr>
  );

  return (
    <>
      <Header />
      <mein>
        <table>
          <caption>Your transactions</caption>
          <thead>
            <tr>
              <th key={1}> Data</th>
              <th key={2}>Operation type</th>
              <th key={3}>Summa</th>
            </tr>
          </thead>
          <tbody>{transaction.map(mapTransaction)}</tbody>
        </table>
      </mein>
    </>
  );
};

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = (dispatch) => ({
  get: () => dispatch(getTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
