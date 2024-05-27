import {dashboard, expenses, transactions, trend, stocks, money} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Reports",
        icon: stocks,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Income",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Exchange",
        icon: money,
        link: "/dashboard",
    },
]