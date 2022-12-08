import { useState } from "react";
import { View, TextInput, ImageBackground, Image, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { DefaultSubheader } from "../../../components/default-subheader";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddBalanceItem = (
    {
        navigation,
        currentBackground,
        darkModeEnabled,
        route,
        setChosenDeal,
        chosenDeal,
        expensesCategoriesList,
        setExpensesCategoriesList,
        handleBalanceChanges
    }
) => {
    const [expensesName, setExpensesName] = useState(null);
    const [expensesCost, setExpensesCost] = useState(null);

    const [openExpensesCategories, setOpenExpensesCategories] = useState(false);
    const [valueExpensesCategories, setValueExpensesCategories] = useState(null);


    const handleAddExpenses = (value) => {
        const date = new Date();
        const monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        if (value === 'expenses') {
            const addExpenses = chosenDeal.reportExpenses.map(category => (
                category.name === valueExpensesCategories ?
                    { ...category, selected: true, list: [...category.list, { name: expensesName, value: -parseInt(expensesCost), date: `${date.getDate()} ${monthArray[date.getMonth()]}` }] }
                    :
                    { ...category, selected: false }
            ))

            setChosenDeal({ ...chosenDeal, reportExpenses: addExpenses });
            handleBalanceChanges({ ...chosenDeal, reportExpenses: addExpenses });
        } else {
            const addIncome = [...chosenDeal.reportIncome, { name: expensesName, value: +expensesCost, date: `${date.getDate()} ${monthArray[date.getMonth()]}` }]
            setChosenDeal({ ...chosenDeal, reportIncome: addIncome });
            handleBalanceChanges({ ...chosenDeal, reportIncome: addIncome });
        }

        setExpensesCost('');
        setExpensesName('');
        Keyboard.dismiss();
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
                    <View
                        style={{
                            backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845',
                            alignItems: 'center',
                            width: '100%',
                            paddingHorizontal: 6,
                            marginBottom: 20,
                            paddingVertical: 20
                        }}
                    >
                        <DefaultSubheader style={{
                            fontSize: 24,
                            lineHeght: 30,
                            color: '#F5941E'
                        }}>Добавить новый {route.params.chosenExpensesCategory === 1 ? 'доход' : 'расход'}</DefaultSubheader>
                    </View>
                    {route.params.chosenExpensesCategory === 2 &&
                        <View
                            style={{
                                ...styles.selectContainer,
                                zIndex: 10,
                                marginBottom: 10,
                                width: '90%'
                            }}>
                            <DropDownPicker
                                listMode='SCROLLVIEW'
                                placeholder='Категория'
                                dropDownContainerStyle={{
                                    zIndex: 10,
                                    borderWidth: 0,
                                    elevation: 6
                                }}
                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                style={{
                                    backgroundColor: openExpensesCategories ? '#fff' : (darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff'),
                                    borderWidth: 0,
                                }}
                                open={openExpensesCategories}
                                value={valueExpensesCategories}
                                items={expensesCategoriesList}
                                setOpen={setOpenExpensesCategories}
                                setValue={setValueExpensesCategories}
                                setItems={setExpensesCategoriesList}
                            />
                        </View>
                    }
                    <TextInput placeholder='Наименование'
                        placeholderTextColor='#000'
                        style={{
                            paddingHorizontal: 10,
                            height: 50,
                            backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                            width: '90%',
                            borderRadius: 10,
                            borderWidth: 0,
                            shadowOffset: { width: 1, height: 2 },
                            shadowColor: '#000',
                            shadowRadius: 1,
                            shadowOpacity: 0.2,
                            elevation: 2,
                            marginBottom: 10
                        }}
                        value={expensesName}
                        onChangeText={setExpensesName}
                    />
                    <TextInput placeholder='Стоимость, ₽'
                        placeholderTextColor='#000'
                        style={{
                            paddingHorizontal: 10,
                            height: 50,
                            backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                            width: '90%',
                            borderRadius: 10,
                            borderWidth: 0,
                            shadowOffset: { width: 1, height: 2 },
                            shadowColor: '#000',
                            shadowRadius: 1,
                            shadowOpacity: 0.2,
                            elevation: 2,
                            marginBottom: 30
                        }}
                        value={expensesCost}
                        onChangeText={setExpensesCost}
                    />
                    <TouchableOpacity activeOpacity={0.9}
                        style={{
                            backgroundColor: '#F5941E',
                            width: 255,
                            paddingVertical: 8,
                            alignItems: 'center',
                            borderRadius: 20,
                            marginBottom: 20
                        }}
                        onPress={() => handleAddExpenses(route.params.chosenExpensesCategory === 1 ? 'income' : 'expenses')}
                    >
                        <DefaultHeader style={{
                            color: darkModeEnabled ? '#000' : '#002845',
                            fontSize: 20,
                            lineHeght: 24
                        }}>
                            Добавить
                        </DefaultHeader>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                        style={{
                            backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#F5941E50',
                            width: 255,
                            paddingVertical: 8,
                            alignItems: 'center',
                            borderRadius: 20
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <DefaultHeader style={{
                            color: darkModeEnabled ? '#000' : '#002845',
                            fontSize: 20,
                            lineHeght: 24
                        }}>
                            Отменить
                        </DefaultHeader>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    selectContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#00000080',
        shadowRadius: 3,
        shadowOpacity: 0.5,
    }
})