export const store = {
    categories: [
        {
            id: 1,
            list: [
                {
                    model: 'Porshe 2014',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/porshe.jpg')
                },
                {
                    model: 'Lada 2008',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/lada.jpg')
                },
                {
                    model: 'УАЗ Патриот',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/uaz.png')
                },
                {
                    model: 'Mercedes G-Class',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/mercedes.jpg')
                },
                {
                    model: 'УАЗ Патриот',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/uaz.png')
                },
                {
                    model: 'Porshe 2014',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/porshe.jpg')
                }
            ]
        },
        {
            id: 2,
            list: [
                {
                    model: 'Suzuki Hayabusa',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/hayabusa.jpg')
                },
                {
                    model: 'Kawasaki ZX-636R',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/kawasaki.jpg')
                },
                {
                    model: 'Yamaha R6',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/yamaha.jpg')
                },
                {
                    model: 'Honda CBR1200RR',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/honda.jpg')
                },
                {
                    model: 'Kawasaki ZX-636R',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/kawasaki.jpg')
                },
                {
                    model: 'Suzuki Hayabusa',
                    engine: '1,4 л',
                    year: '2014',
                    kilometers: '65000 км',
                    transmission: 'Автомат',
                    price: '14 000 000 ₽',
                    date: '22:13 24 Марта 2022',
                    region: 'г. Самара',
                    views: 6,
                    resource: 'auto.ru',
                    img: require('../../assets/models/hayabusa.jpg')
                }
            ]
        }
    ],
    statistic: [
        {
            id: 1,
            img: require('../../assets/models/kawasaki.jpg'),
            model: 'Kawasaki ZX-636R',
            price: 800000,
            sell: false,
            reportExpenses: [
                {
                    selected: true,
                    name: 'Транспортные расходы',
                    list: [
                        {
                            name: 'Покупка авто',
                            date: '1 ноября',
                            value: -500000
                        },
                        {
                            name: 'Заправка',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Ремонт',
                            date: '1 ноября',
                            value: -800
                        },
                        {
                            name: 'Билеты',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Предпродажная подготовка',
                    list: [
                        {
                            name: 'Мойка',
                            date: '1 ноября',
                            value: -1200
                        },
                        {
                            name: 'Полировка фар',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Химчистка потолка',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Ремонт',
                    list: [
                        {
                            name: 'Замена радиатора',
                            date: '1 ноября',
                            value: -13000
                        },
                        {
                            name: 'Замена топливного шлага',
                            date: '1 ноября',
                            value: -2100
                        }
                    ]
                }
            ],
            reportIncome: [
                {
                    name: 'Продажа зимней резины',
                    date: '1 ноября',
                    value: 13000
                },
                {
                    name: 'Аренда',
                    date: '1 ноября',
                    value: 22300
                }
            ]
        },
        {
            id: 2,
            img: require('../../assets/models/mercedes.jpg'),
            model: 'Mercedes G-Class',
            price: 632000,
            sell: false,
            reportExpenses: [
                {
                    selected: true,
                    name: 'Транспортные расходы',
                    list: [
                        {
                            name: 'Покупка авто',
                            date: '1 ноября',
                            value: -500000
                        },
                        {
                            name: 'Заправка',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Ремонт',
                            date: '1 ноября',
                            value: -800
                        },
                        {
                            name: 'Билеты',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Предпродажная подготовка',
                    list: [
                        {
                            name: 'Мойка',
                            date: '1 ноября',
                            value: -1200
                        },
                        {
                            name: 'Полировка фар',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Химчистка потолка',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Ремонт',
                    list: [
                        {
                            name: 'Замена радиатора',
                            date: '1 ноября',
                            value: -13000
                        },
                        {
                            name: 'Замена топливного шлага',
                            date: '1 ноября',
                            value: -2100
                        }
                    ]
                }
            ],
            reportIncome: [
                {
                    name: 'Продажа зимней резины',
                    date: '1 ноября',
                    value: 13000
                },
                {
                    name: 'Аренда',
                    date: '1 ноября',
                    value: 22300
                }
            ]
        },
        {
            id: 3,
            img: require('../../assets/models/uaz.png'),
            model: 'УАЗ Патриот',
            price: 259000,
            sell: true,
            finalPrice: 316000,
            reportExpenses: [
                {
                    selected: true,
                    name: 'Транспортные расходы',
                    list: [
                        {
                            name: 'Покупка авто',
                            date: '1 ноября',
                            value: -500000
                        },
                        {
                            name: 'Заправка',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Ремонт',
                            date: '1 ноября',
                            value: -800
                        },
                        {
                            name: 'Билеты',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Предпродажная подготовка',
                    list: [
                        {
                            name: 'Мойка',
                            date: '1 ноября',
                            value: -1200
                        },
                        {
                            name: 'Полировка фар',
                            date: '1 ноября',
                            value: -1000
                        },
                        {
                            name: 'Химчистка потолка',
                            date: '1 ноября',
                            value: -2000
                        }
                    ]
                },
                {
                    selected: false,
                    name: 'Ремонт',
                    list: [
                        {
                            name: 'Замена радиатора',
                            date: '1 ноября',
                            value: -13000
                        },
                        {
                            name: 'Замена топливного шлага',
                            date: '1 ноября',
                            value: -2100
                        }
                    ]
                }
            ],
            reportIncome: [
                {
                    name: 'Продажа зимней резины',
                    date: '1 ноября',
                    value: 13000
                },
                {
                    name: 'Аренда',
                    date: '1 ноября',
                    value: 22300
                }
            ]
        }
    ],
    rates: [
        {
            id: 1,
            name: 'Тариф "Test"',
            desc: 'Тестовый тариф для ознакомления с функционалом.',
            full_desc: {
                public: 'Без задержки',
                scaner: '15',
                checkVin: '+',
                statistic: '+',
                area: 'Вся территория РФ'
            },
            price: 'Бесплатно',
            term: '2 часа'
        },
        {
            id: 2,
            name: 'Тариф "Free"',
            desc: 'Тариф с ограниченным доступом.',
            full_desc: {
                public: 'Без задержки',
                scaner: '15',
                checkVin: '+',
                statistic: '+',
                area: 'Вся территория РФ'
            },
            price: 'Бесплатно',
            term: 'Неограниченный'
        },
        {
            id: 3,
            name: 'Тариф "Pilot"',
            desc: 'Тариф с минимальным набором функций.',
            full_desc: {
                public: 'Без задержки',
                scaner: '15',
                checkVin: '+',
                statistic: '+',
                area: 'Вся территория РФ'
            },
            price: '1800 рублей',
            term: '1 календарный месяц'
        },
        {
            id: 4,
            name: 'Тариф "Manager"',
            desc: 'Для тех кто знает, что ищет.',
            full_desc: {
                public: 'Без задержки',
                scaner: '15',
                checkVin: '+',
                statistic: '+',
                area: 'Вся территория РФ'
            },
            price: '3800 рублей',
            term: '3 календарных месяца'
        },
        {
            id: 5,
            name: 'Тариф "Dealer"',
            desc: 'Для настоящих акул бизнеса.',
            full_desc: {
                public: 'Без задержки',
                scaner: '15',
                checkVin: '+',
                statistic: '+',
                area: 'Вся территория РФ'
            },
            price: '6800 рублей',
            term: '6 календарных месяцев'
        }
    ]
}