import React, { useEffect } from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { parseISO, format } from 'date-fns';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    useEffect(() => {
        console.log('Updated incomes:', incomes);
        console.log('Updated expenses:', expenses);
    }, [incomes, expenses]);

    const aggregateData = (items) => items.map(item => ({
        ...item,
        formattedDate: format(parseISO(item.date), 'dd/MM/yyyy')
    }));

    const getAggregatedData = () => {
        const allIncomes = aggregateData(incomes);
        const allExpenses = aggregateData(expenses);

        const incomeDates = allIncomes.map(item => item.formattedDate);
        const expenseDates = allExpenses.map(item => item.formattedDate);
        let uniqueDates = [...new Set([...incomeDates, ...expenseDates])];

        uniqueDates = uniqueDates.sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')));

        const incomeData = uniqueDates.map(date => ({
            date,
            amount: allIncomes.filter(inc => inc.formattedDate === date).reduce((acc, curr) => acc + curr.amount, 0)
        }));

        const expenseData = uniqueDates.map(date => ({
            date,
            amount: allExpenses.filter(exp => exp.formattedDate === date).reduce((acc, curr) => acc + curr.amount, 0)
        }));

        const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);

        const pieData = {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [totalIncome, totalExpenses],
                backgroundColor: ['#009B72', '#F6545B']
            }]
        };

        const barData = {
            labels: uniqueDates,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData.map(item => item.amount),
                    backgroundColor: '#009B72',
                },
                {
                    label: 'Expenses',
                    data: expenseData.map(item => item.amount),
                    backgroundColor: '#F6545B',
                }
            ]
        };

        return {
            lineData: {
                labels: uniqueDates,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData.filter(item => item.amount !== 0).map(item => item.amount),
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        tension: 0.2,
                        fill: true,
                        spanGaps: true
                    },
                    {
                        label: 'Expenses',
                        data: expenseData.filter(item => item.amount !== 0).map(item => item.amount),
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        tension: 0.2,
                        fill: true,
                        spanGaps: true
                    }
                ]
            },
            pieData,
            barData
        };
    };

    const { lineData, pieData, barData } = getAggregatedData();

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Segoe UI',
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                bodyFont: {
                    family: 'Segoe UI',
                },
                titleFont: {
                    family: 'Segoe UI',
                },
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: 'Segoe UI',
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: false,
                },
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'Segoe UI',
                    }
                }
            }
        }
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Segoe UI',
                        color: function(context) {
                            const label = context.dataset.label;
                            return label === 'Income' ? '#009B72' : '#F6545B';
                        }
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                bodyFont: {
                    family: 'Segoe UI',
                },
                titleFont: {
                    family: 'Segoe UI',
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    font: {
                        family: 'Segoe UI',
                    }
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'Segoe UI',
                    }
                }
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Segoe UI',
                        color: function(context) {
                            const label = context.text;
                            return label === 'Income' ? '#009B72' : '#F6545B';
                        }
                    }
                }
            },
            tooltip: {
                bodyFont: {
                    family: 'Segoe UI',
                },
                titleFont: {
                    family: 'Segoe UI',
                },
            }
        }
    };

    return (
        <ChartStyled>
            <div style={{ marginBottom: '2rem' }}>
                <Line options={lineOptions} data={lineData} />
                <h2>Stacked-bar graph</h2>
            </div>
            <Bar options={barOptions} data={barData} />
            <h2>Pie Chart</h2>
            <div style={{ width: '50%', margin: '0 auto', marginTop: '3rem', marginBottom: '2rem' }}>
                <Pie options={pieOptions} data={pieData} />
            </div>
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export default Chart;
