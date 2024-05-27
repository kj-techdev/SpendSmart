import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);
    
    return (
        <IncomeStyled>
            <InnerLayout>
                <h2>Incomes</h2>
                <h2 className="total-income">
                    Total Income: <span>${totalIncome()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        <div className="recently-added-container">
                            <h3>Recently Added</h3>
                        </div>
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    background-color: #FFFFFF;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;
        span {
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--color-green);
        }
    }
    
    .income-content {
        display: flex;
        gap: 2rem;
        .form-container {
            background: #FFFFFF;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.08);
            border-radius: 20px;
            padding: 1rem;
        }
        .incomes {
            flex: 1;
        }

    }
    .recently-added-container {
        display: flex;
        justify-content: center; 
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        padding: 1rem;
        margin-bottom: 1rem;
        h3 {
            margin: 0;
            font-size: 1.5rem;
            color: #222260;
        }
    }
`;

export default Income;