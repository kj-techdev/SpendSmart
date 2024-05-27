import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { book, food, medical, freelance, piggy, money, bitcoin, card, yt, circle, clothing, tv, takeaway, stocks } from '../../utils/Icons';

function History() {
    const { incomes, expenses } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredHistory = [...incomes, ...expenses]
        .filter(item => filter === 'All' || item.type === filter.toLowerCase())
        .filter(item => 
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(item.date).toLocaleDateString().includes(searchTerm.toLowerCase()) ||
            item.amount.toString().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

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
        <PageContainer>
            <HistoryStyled>
                <h2>Transaction History</h2>
                <div className="search-filter-container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Type to search.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-icon">&#x1F50D;</button>
                    </div>
                    <div className="filter-container">
                        <button className="filter-button" onClick={() => setShowDropdown(!showDropdown)}>
                            Filter <span className="arrow">&#9660;</span>
                        </button>
                        {showDropdown && (
                            <div className="dropdown">
                                <button onClick={() => { setFilter('All'); setShowDropdown(false); }}>All</button>
                                <button onClick={() => { setFilter('Income'); setShowDropdown(false); }}>Income</button>
                                <button onClick={() => { setFilter('Expense'); setShowDropdown(false); }}>Expense</button>
                            </div>
                        )}
                    </div>
                </div>
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
                            {filteredHistory.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <span className="icon">{getIcon(item.category, item.type)}</span>
                                        {item.category}
                                    </td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
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
        </PageContainer>
    );
}

const PageContainer = styled.div`
    background-color: #ffffff; 
    min-height: 100vh;
    width: 100%;
`;

const HistoryStyled = styled.div`
    background-color: #ffffff; 
    padding: 5px;
    border-radius: 8px;
    font-family: 'Segoe UI', sans-serif;
    position: relative;

    h2 {
        margin-top: 2rem;
        margin-left: 1rem;
        color: #222260;
        margin-bottom: 16px;
        font-size: 1.5rem;
    }

    .search-filter-container {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        padding: 0 1rem;
        justify-content: flex-end;

        .search-container {
            display: flex;
            align-items: center;
            background: #fff;
            padding: 10px;
            border-radius: 10px;
            margin-right: 0.5rem;

            input[type="text"] {
                border: none;
                border-bottom: 2px solid #222260;
                font-family: 'Segoe UI';
                padding: 5px;
                margin-right: 10px;
                width: 300px;
                font-size: 15px; 
            }

            .search-icon {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.5rem;
                color: #222260;
            }
        }

        .filter-container {
            position: relative;
            margin-right: 3rem;

            .filter-button {
                background: none;
                border: none;
                cursor: pointer;
                font-family: 'Segoe UI', sans-serif;
                color: #666;
                display: flex;
                align-items: center;
                font-size: 15px; 

                .arrow {
                    margin-left: 5px;
                }
            }

            .dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                background: #fff;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                z-index: 10;

                button {
                    background: none;
                    border: none;
                    padding: 8px 12px;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    font-family: 'Segoe UI', sans-serif;
                }

                button:hover {
                    background: #f0f0f0;
                }
            }
        }
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
            border: none;
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
