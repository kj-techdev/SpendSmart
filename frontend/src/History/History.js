import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { book, food, medical, freelance, piggy, money, bitcoin, card, yt, circle, clothing, tv, takeaway, stocks } from '../utils/Icons';

function History() {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory();

    const getIcon = (category, type) => {
        if (type === 'expense') {
            switch (category.toLowerCase()) {
                case 'education':
                    return book;
                case 'groceries':
                    return food;
                case 'health':
                    return medical;
                case 'subscriptions':
                    return tv;
                case 'takeaways':
                    return takeaway;
                case 'clothing':
                    return clothing;
                case 'travelling':
                    return freelance;
                case 'other':
                    return circle;
                default:
                    return '';
            }
        } else {
            switch (category.toLowerCase()) {
                case 'salary':
                    return money;
                case 'freelancing':
                    return freelance;
                case 'investments':
                    return stocks;
                case 'stocks':
                    return stocks;
                case 'bitcoin':
                    return bitcoin;
                case 'bank':
                    return card;
                case 'youtube':
                    return yt;
                case 'other':
                    return piggy;
                default:
                    return '';
            }
        }
    };

    return (
        <HistoryStyled>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <span className="icon">{getIcon(item.category, item.type)}</span>
                                    {item.category}
                                </td>
                                <td>{item.date}</td>
                                <td>{item.description}</td>
                                <td className={`amount ${item.type === 'expense' ? 'negative' : 'positive'}`}>
                                    ${item.type === 'expense' ? '-' : '+'}{Math.abs(item.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    background-color: #ffffff;
    padding: 5px;
    border-radius: 8px;
    font-family: 'Segoe UI', sans-serif;

    h2 {
        color: #333;
        margin-bottom: 16px;
        font-size: 1.5rem;
    }

    .table-responsive {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 12px 16px;
            text-align: left;
            font-family: 'Segoe UI', sans-serif;
            border: none; /* Remove borders */
        }

        thead th {
            color: #222260;
            font-weight: bold;
            padding: 10px;
        }

        tr:last-child td {
            border-bottom: none;
        }

        .icon {
            font-size: 20px;
            margin-right: 8px;
            vertical-align: middle;
        }

        .amount {
            font-weight: bold;
            &.positive {
                color: green;
            }
            &.negative {
                color: red;
            }
        }
    }
`;

export default History;