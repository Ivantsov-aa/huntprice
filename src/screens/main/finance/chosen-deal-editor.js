import { useEffect, useState } from "react";
import { ScrollView, View, ImageBackground, Image, TouchableOpacity, Platform } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { DefaultSubheader } from "../../../components/default-subheader";
import { MediumText } from "../../../components/medium-text";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ChosenDealEditor = (
    {
        navigation,
        financeStatistic,
        darkModeEnabled,
        setFinanceStatistic,
        currentBackground,
        route,
        setChosenDeal,
        chosenDeal,
        setExpensesCategoriesList,
        sumAllIncome,
        sumAllExpenses,
        handleBalanceChanges
    }
) => {
    const chosenExpensesCategory = route.params.chosenExpensesCategory;
    const [deleteExpense, setDeleteExpense] = useState(null);

    useEffect(() => {
        if (chosenExpensesCategory === 2) {
            const expensesList = chosenDeal.reportExpenses.map(expenses => { return { label: expenses.name, value: expenses.name } });
            setExpensesCategoriesList(expensesList);
        }
    }, [])

    const handleNavFinanceClick = value => {
        const setNavChoice = { ...chosenDeal, reportExpenses: chosenDeal.reportExpenses.map(category => category.name === value ? { ...category, selected: true } : { ...category, selected: false }) }
        setChosenDeal(setNavChoice);
    }

    const handleDeleteExpenses = () => {
        const deleteExpenses = chosenExpensesCategory === 1 ?
            chosenDeal.reportIncome.filter(income => income.name !== deleteExpense)
            :
            chosenDeal.reportExpenses.map(category => {
                return { ...category, list: category.list.filter(expense => expense.name !== deleteExpense) }
            })

        if (chosenExpensesCategory === 1) {
            setChosenDeal({ ...chosenDeal, reportIncome: deleteExpenses })
            handleBalanceChanges({ ...chosenDeal, reportIncome: deleteExpenses })
        } else {
            setChosenDeal({ ...chosenDeal, reportExpenses: deleteExpenses })
            handleBalanceChanges({ ...chosenDeal, reportExpenses: deleteExpenses })
        }
    }

    const handleApplyEdit = async () => {
        const editingFinanceStatistic = financeStatistic.map(stat => (
            stat.model === chosenDeal.model ?
                { ...chosenDeal }
                :
                { ...stat }
        ))

        await AsyncStorage.setItem('finance', JSON.stringify(editingFinanceStatistic));
        setFinanceStatistic(editingFinanceStatistic);
        navigation.goBack();
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['left', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{
                flex: 1,
                resizeMode: 'cover'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity activeOpacity={0.9}
                        style={{
                            backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            height: 71,
                            paddingHorizontal: 6,
                            marginBottom: chosenExpensesCategory === 1 ? 20 : 0
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                        <DefaultHeader style={{ color: '#F5941E', fontSize: 24, lineHeght: 30 }}>{chosenDeal.model}</DefaultHeader>
                    </TouchableOpacity>
                    {chosenExpensesCategory === 2 && <View
                        style={{
                            height: 50,
                            backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                            paddingHorizontal: 6,
                            paddingVertical: 10,
                            marginBottom: 20,
                            borderBottomColor: darkModeEnabled ? '#000' : '#002845',
                            borderBottomWidth: 1,
                            elevation: 5
                        }}
                    >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {chosenDeal.reportExpenses.map((category, i) => (
                                <TouchableOpacity activeOpacity={0.9}
                                    style={{
                                        backgroundColor: category.selected ? '#F5941E' : 'transparent',
                                        paddingHorizontal: 6,
                                        paddingVertical: Platform.OS === 'ios' ? 7 : 5,
                                        borderRadius: 10
                                    }}
                                    onPress={() => handleNavFinanceClick(category.name)}
                                    key={i}
                                >
                                    <DefaultHeader
                                        style={{
                                            fontSize: 12,
                                            color: darkModeEnabled ? (category.selected ? '#000' : '#fff') : '#002845'

                                        }}
                                    >{category.name}</DefaultHeader>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => navigation.navigate('ExpensesCategories')}
                            >
                                <Image source={require('../../../../assets/icons/add-icon.png')} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    }
                    <ScrollView style={{ width: '100%' }}>
                        <View style={{ flex: 1, paddingHorizontal: 6, width: '100%' }}>
                            {chosenExpensesCategory === 1 ?
                                chosenDeal.reportIncome.map((income, i) => (
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={{
                                            backgroundColor: '#F5F5F5',
                                            borderRadius: 10,
                                            elevation: 2,
                                            marginBottom: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingHorizontal: 12,
                                            paddingVertical: 8
                                        }}
                                        onPress={() => setDeleteExpense(deleteExpense !== income.name ? income.name : null)}
                                        key={i}
                                    >
                                        <View>
                                            <MediumText
                                                style={{
                                                    fontSize: 14,
                                                    lineHeght: 17,
                                                    marginBottom: 5
                                                }}
                                            >{income.name}</MediumText>
                                            <MediumText
                                                style={{
                                                    fontSize: 14,
                                                    lineHeght: 17,
                                                    color: '#00000050'
                                                }}
                                            >{income.date}</MediumText>
                                        </View>
                                        <View>
                                            <MediumText
                                                style={{
                                                    fontSize: 14,
                                                    lineHeght: 17,
                                                    color: '#16BB1C'
                                                }}
                                            >+{income.value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</MediumText>
                                        </View>
                                        {deleteExpense === income.name &&
                                            <TouchableOpacity activeOpacity={0.9}
                                                onPress={handleDeleteExpenses}
                                            >
                                                <DefaultHeader>Удалить</DefaultHeader>
                                            </TouchableOpacity>
                                        }
                                    </TouchableOpacity>
                                ))
                                :
                                chosenDeal.reportExpenses.map(category => (
                                    category.selected && category.list.map((expenses, i) => (
                                        <TouchableOpacity activeOpacity={0.9}
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                                borderRadius: 10,
                                                elevation: 2,
                                                marginBottom: 20,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingHorizontal: 12,
                                                paddingVertical: 8
                                            }}
                                            onPress={() => setDeleteExpense(deleteExpense !== expenses.name ? expenses.name : null)}
                                            key={i}
                                        >
                                            <View>
                                                <MediumText
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeght: 17,
                                                        marginBottom: 5
                                                    }}
                                                >{expenses.name}</MediumText>
                                                <MediumText
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeght: 17,
                                                        color: '#00000050'
                                                    }}
                                                >{expenses.date}</MediumText>
                                            </View>
                                            <View>
                                                <MediumText
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeght: 17,
                                                        color: '#F5941E'
                                                    }}
                                                >{expenses.value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</MediumText>
                                            </View>
                                            {deleteExpense === expenses.name &&
                                                <TouchableOpacity activeOpacity={0.9}
                                                    onPress={handleDeleteExpenses}
                                                >
                                                    <DefaultHeader>Удалить</DefaultHeader>
                                                </TouchableOpacity>
                                            }
                                        </TouchableOpacity>
                                    ))
                                ))
                            }
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 358,
                            justifyContent: 'space-between',
                            backgroundColor: '#F5941E',
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            paddingVertical: 17,
                            marginBottom: 25,
                            elevation: 3
                        }}
                    >
                        <View>
                            <MediumText>{chosenExpensesCategory === 1 ? 'Доходы' : 'Расходы'}</MediumText>
                            <DefaultSubheader>{chosenExpensesCategory ? (`${chosenExpensesCategory === 1 ? (sumAllIncome !== 0 ? '+' : '') : ''}${(chosenExpensesCategory === 1 ? sumAllIncome : sumAllExpenses).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽`) : '0 ₽'}</DefaultSubheader>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }}
                                onPress={() => navigation.navigate('AddBalanceItem', { chosenExpensesCategory: chosenExpensesCategory })}
                            >
                                <Image source={require('../../../../assets/icons/add-expense.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={handleApplyEdit}
                            >
                                <Image source={require('../../../../assets/icons/apply-expenses.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}