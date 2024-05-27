import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Dashboard() {
    const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses} = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    // State for storing current date
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString('en-US', options));
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h2>Dashboard</h2>
                <p>{currentDate}</p> 
                <div className="stats-con">
                    <div>
                        <h2>Total Balance</h2>
                        <p style={{ color: '#454545' }}>{dollar}{totalIncome() - totalExpenses()}</p>
                    </div>
                    <div>
                        <h2>Total Income</h2>
                        <p style={{ color: 'green' }}>{dollar}{totalIncome()}</p>
                    </div>
                    <div>
                        <h2>Total Expense</h2>
                        <p style={{ color: 'red' }}>{dollar}{totalExpenses()}</p>
                    </div>
                </div>
                <div className="chart-con">
                <h2>Analytics</h2>
                <small>Track your expenses and income. </small>
                    <Chart />
                </div>
                <div className="history-con">
                <h2>Transaction History</h2>
                    <History />
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    font-family: 'Segoe UI', sans-serif; 
    background-color: #ffffff; 
    padding: 20px;

    .stats-con {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
        grid-gap: 1rem; 
        margin-bottom: 1rem; 

        > div {
            background: #ffffff; 
            border-radius: 8px; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.08); 
            padding: 20px; 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 1rem 0;
 
            h2 {
                font-size: 1.2rem;
                color: #222260;
                margin-bottom: 0.5rem;
            }
            p {
                font-size: 2.4rem;
                font-weight: bold;
                margin: 0;
            }
            small {
                font-size: 1rem;
                color: #666;
            }
        }
    }

    .chart-con {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        padding: 20px;
        margin-bottom: 2rem;
    }

    .history-con {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        padding: 20px;
        display: flex;
        flex-direction: column;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .salary-item {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;

            p {
                font-weight: bold;
                font-size: 1.4rem;
            }
        }
    }
`;


export default Dashboard;
 