import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import usFlag from '../../img/us.png';
import phpFlag from '../../img/ph.png';
import thbFlag from '../../img/th.png';
import jpyFlag from '../../img/jp.png';

const flagMap = {
    USD: usFlag,
    PHP: phpFlag,
    THB: thbFlag,
    JPY: jpyFlag,
};

const Multicurrency = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('PHP');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setExchangeRates(response.data.rates);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const convertCurrency = () => {
        if (amount && fromCurrency && toCurrency && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
            const converted = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
            setConvertedAmount(converted.toFixed(2));
        }
    };

    useEffect(() => {
        convertCurrency();
    }, [amount, fromCurrency, toCurrency, exchangeRates]);

    return (
        <PageContainer>
            <Header>
                <h2>Exchange</h2>
                <small>Convert your currency</small>
            </Header>
            <MulticurrencyContainer>
                <MulticurrencyStyled>
                    <CurrencyInput>
                        <label>Amount:</label>
                        <div className="currency-group">
                            <img src={flagMap[fromCurrency]} alt={`${fromCurrency} flag`} />
                            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                                <option value="USD">USD</option>
                                <option value="PHP">PHP</option>
                                <option value="THB">THB</option>
                                <option value="JPY">JPY</option>
                            </select>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                            />
                        </div>
                    </CurrencyInput>
                    <Divider>
                        <SwitchIcon>⇅</SwitchIcon>
                    </Divider>
                    <CurrencyInput>
                        <label>Converted Amount:</label>
                        <div className="currency-group">
                            <img src={flagMap[toCurrency]} alt={`${toCurrency} flag`} />
                            <select value={toCurrency} onChange={handleToCurrencyChange}>
                                <option value="USD">USD</option>
                                <option value="PHP">PHP</option>
                                <option value="THB">THB</option>
                                <option value="JPY">JPY</option>
                            </select>
                            <input
                                type="text"
                                value={convertedAmount}
                                readOnly
                            />
                        </div>
                    </CurrencyInput>
                </MulticurrencyStyled>
            </MulticurrencyContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    background-color: #FFFFFF;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Segoe UI', sans-serif;

    h2 {
        font-size: 2rem;
        color: #222260;
    }

    small {
        font-size: 1rem;
        color: #7D7D7D;
    }
`;

const MulticurrencyContainer = styled.div`
    background: #FFFFFF;
    padding: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MulticurrencyStyled = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
    padding: 4rem; /* Adjusted padding for larger size */
    border-radius: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    max-width: 800px;  
    margin: 2rem 0;  

    .converter {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const CurrencyInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0;
    width: 100%;

    label {
        margin-bottom: 0.5rem;
        font-size: 1.2rem; 
        color: #7D7D7D;
    }

    .currency-group {
        display: flex;
        align-items: center;
        width: 100%;

        img {
            width: 40px; 
            height: 30px;
            margin-right: 10px;
        }

        select {
            padding: 1rem; 
            border: none;
            background: none;
            font-size: 1.2rem; 
            margin-right: 10px;
            flex-grow: 1;
        }

        input {
            padding: 1rem; 
            border: none;
            background-color: #f3f3f3;
            border-radius: 5px;
            width: 100%;
            max-width: 250px; 
            text-align: right;
            font-size: 1.2rem; 
            margin-left: 10px;
        }

        input[readonly] {
            background-color: #f3f3f3;
        }
    }
`;

const Divider = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #ccc;
    }
`;

const SwitchIcon = styled.div`
    font-size: 2rem; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px; 
    height: 50px; 
    border-radius: 50%;
    background-color: #222260;
    position: relative;
    z-index: 1;
`;

export default Multicurrency;
