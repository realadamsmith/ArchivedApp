import React from 'react'
import {RiShoppingBagLine} from 'react-icons/ri';
import {FiSmartphone} from 'react-icons/fi'
import {BsPersonFill} from 'react-icons/bs'
import {FaSuitcase} from 'react-icons/fa'
import {BiSupport} from 'react-icons/bi'
import {IoIosPricetags, IoIosHome} from 'react-icons/io'

export const SidebarData = [
    {
        title: 'Best Sellers',
        path: '/SearchResults',
        icon: <IoIosPricetags />,
        cName: 'nav-text'
    },
    {
        title: 'Clothing, Shoes, Jewelry & Watches ',
        path: '/SearchResults',
        icon: <RiShoppingBagLine />,
        cName: 'nav-text'
    },
    {
        title: 'Electronics',
        path: '/SearchResults',
        icon: <FiSmartphone />,
        cName: 'nav-text'
    },
    {
        title: 'Home, Garden & Tools',
        path: '/SearchResults',
        icon: <IoIosHome />,
        cName: 'nav-text'
    },

]

export const SettingsData = [
    {
        title: 'Your Account',
        path: '/Account',
        icon: <BsPersonFill />,
        cName: 'nav-text'
    },
    {
        title: 'Be a Lagruni Seller',
        path: '/sellerSignup',
        icon: <FaSuitcase />,
        cName: 'nav-text'
    },
    {
        title: 'Customer Service',
        path: '/SupportHelpPg',
        icon: <BiSupport />,
        cName: 'nav-text'
    },
]

export const SubmenuData = [
    {
        title: 'Best Sellers',
        path: '/SearchResults',
        // icon: <IoIosPricetags />,
        cName: 'nav-text'
    },
    {
        title: 'New Releases',
        path: '/SearchResults',
        // icon: <RiShoppingBagLine />,
        cName: 'nav-text'
    },
    {
        title: 'Trending Styles',
        path: '/SearchResults',
        // icon: <FiSmartphone />,
        cName: 'nav-text'
    },
    {
        title: 'Smart Home Picks',
        path: '/SearchResults',
        // icon: <IoIosHome />,
        cName: 'nav-text'
    },

]