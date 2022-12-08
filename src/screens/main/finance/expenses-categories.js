import { useState, useRef } from "react";
import { Animated, ScrollView, Keyboard, View, TextInput, ImageBackground, Easing, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { MediumText } from "../../../components/medium-text";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpensesCategories = ({ darkModeEnabled, currentBackground, financeStatistic, navigation, route, setChosenDeal, chosenDeal, setExpensesCategoriesList }) => {
    const [expensesCategoryName, setExpensesCategoryName] = useState(null);
    const [openAddCategoriesExpensesPopUp, setOpenAddCategoriesExpensesPopUp] = useState(false);
    const [deleteExpenseCategory, setDeleteExpenseCategory] = useState(null);

    const animationAddCategoryExpensesBlock = useRef(new Animated.Value(132)).current;

    const animate_state = {
        start: 60,
        end: 80
    }

    const valueAnimation = useRef(new Animated.Value(animate_state.start)).current;

    const startAnimate = value => {
        Animated.timing(valueAnimation, { toValue: value ? animate_state.end : animate_state.start, useNativeDriver: false, duration: 300, easing: Easing.exp }).start()
    }

    const inputRange = Object.values(animate_state)
    const popUpPadding = valueAnimation.interpolate({ inputRange, outputRange: [80, 60] })

    const openAddCategoriesExpensesBlock = value => {
        setOpenAddCategoriesExpensesPopUp(value ? true : false);
        startAnimate(value);
        Animated.timing(animationAddCategoryExpensesBlock, { toValue: value ? 0 : 132, useNativeDriver: true }).start();
    }

    const handleAddNewCategories = async () => {
        const newCategory = [...chosenDeal.reportExpenses, { selected: false, name: expensesCategoryName, list: [] }]
        const editingFinanceStatistic = financeStatistic.map(stat => (
            stat.model === chosenDeal.model ?
                { ...stat, reportExpenses: newCategory }
                :
                { ...stat }
        ))

        setChosenDeal({ ...chosenDeal, reportExpenses: newCategory });
        await AsyncStorage.setItem('finance', JSON.stringify(editingFinanceStatistic));

        const expensesList = newCategory.map(expenses => { return { label: expenses.name, value: expenses.name } });
        setExpensesCategoriesList(expensesList);

        openAddCategoriesExpensesBlock(false);
        Keyboard.dismiss();
        setExpensesCategoryName('');
    }

    const handleDeleteExpensesCategory = () => {
        const newCategory = { ...chosenDeal, reportExpenses: chosenDeal.reportExpenses.filter(expenses => expenses.name !== deleteExpenseCategory) };
        setChosenDeal(newCategory);
        setDeleteExpenseCategory(null);
        const expensesList = newCategory.reportExpenses.map(expenses => { return { label: expenses.name, value: expenses.name } });
        setExpensesCategoriesList(expensesList);
    }

    return (
        chosenDeal &&
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: darkModeEnabled ? '#000' : '#fff'
            }}
            edges={['left', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            flex: 1
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: 16,
                                backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845',
                                marginBottom: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            activeOpacity={0.9}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('../../../../assets/icons/arrow-back-icon.png')} style={{ marginRight: 10 }} />
                            <DefaultHeader
                                style={{ fontSize: 24, lineHeght: 29, color: '#F5941E' }}
                            > Категории расходов</DefaultHeader>
                        </TouchableOpacity>
                        <ScrollView
                            style={{
                                paddingHorizontal: 6
                            }}
                        >
                            {
                                chosenDeal.reportExpenses.map((expenses, i) => (
                                    i > 2 ?
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 20,
                                                paddingVertical: 10,
                                                paddingHorizontal: 6,
                                                borderRadius: 10,
                                                backgroundColor: '#fff',
                                                elevation: 2,
                                                shadowOffset: { width: 1, height: 2 },
                                                shadowColor: '#000',
                                                shadowRadius: 1,
                                                shadowOpacity: 0.2,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                position: 'relative'
                                            }}
                                            activeOpacity={0.9}
                                            key={i}
                                        >
                                            <View>
                                                <DefaultHeader
                                                    style={{
                                                        fontSize: 16,
                                                        lineHeght: 19,
                                                        color: darkModeEnabled ? '#fff' : '#000'
                                                    }}
                                                ><DefaultHeader
                                                    style={{
                                                        color: '#000'
                                                    }}
                                                >{i + 1}.</DefaultHeader> {expenses.name}</DefaultHeader>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => setDeleteExpenseCategory(deleteExpenseCategory !== expenses.name ? expenses.name : null)}
                                            >
                                                <Image source={require('../../../../assets/icons/add-settings-categories-icon.png')} />
                                            </TouchableOpacity>
                                            {deleteExpenseCategory === expenses.name &&
                                                <TouchableOpacity
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        bottom: -30,
                                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                                        elevation: 5,
                                                        padding: 10
                                                    }}
                                                    activeOpacity={0.9}
                                                    onPress={handleDeleteExpensesCategory}
                                                >
                                                    <MediumText>Удалить</MediumText>
                                                </TouchableOpacity>
                                            }
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 20,
                                                paddingVertical: 10,
                                                paddingHorizontal: 6,
                                                borderRadius: 10,
                                                backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                                elevation: 2,
                                                shadowOffset: { width: 1, height: 2 },
                                                shadowColor: '#000',
                                                shadowRadius: 1,
                                                shadowOpacity: 0.2
                                            }}
                                            activeOpacity={0.9}
                                            key={i}
                                        >
                                            <DefaultHeader
                                                style={{
                                                    fontSize: 16,
                                                    lineHeght: 19,
                                                    color: darkModeEnabled ? '#000' : '#002845'
                                                }}
                                            ><DefaultHeader
                                                style={{
                                                    color: '#000'
                                                }}
                                            >{i + 1}.</DefaultHeader> {expenses.name}</DefaultHeader>
                                        </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: darkModeEnabled ? 'transparent' : '#fff',
                            width: '100%',
                            elevation: 2,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            transform: [
                                { translateY: animationAddCategoryExpensesBlock }
                            ]
                        }}
                    >
                        <Animated.View style={{
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0)',
                            ...(Platform.OS === 'ios' ?
                                {
                                    height: popUpPadding
                                }
                                :
                                {
                                    height: 60
                                }
                            )
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: darkModeEnabled ? '#F5941E' : '#002845',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    alignItems: 'center'
                                }}
                                onPress={() => openAddCategoriesExpensesBlock(!openAddCategoriesExpensesPopUp ? true : false)}
                            >
                                <DefaultHeader
                                    style={{
                                        fontSize: 20,
                                        lineHeght: 24,
                                        color: darkModeEnabled ? '#000' : '#F5941E',
                                        marginTop: 'auto',
                                        marginBottom: 'auto'
                                    }}
                                >Добавить категорию</DefaultHeader>
                            </TouchableOpacity>
                        </Animated.View>
                        <View
                            style={{
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <TextInput
                                placeholder='Введите название категории'
                                placeholderTextColor={darkModeEnabled ? '#fff' : '#000'}
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#F5F5F5',
                                    width: '100%',
                                    borderWidth: 0,
                                    shadowOffset: { width: 1, height: 2 },
                                    shadowColor: '#000',
                                    shadowRadius: 1,
                                    shadowOpacity: 0.2,
                                    elevation: 2,
                                    fontSize: 16
                                }}
                                value={expensesCategoryName}
                                onChangeText={setExpensesCategoryName}
                            />
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{
                                    width: '100%',
                                    backgroundColor: darkModeEnabled ? '#F5941E' : '#002845',
                                    alignItems: 'center',
                                    paddingVertical: 20,
                                    ...(Platform.OS === 'ios' && { paddingBottom: 30 })
                                }}
                                onPress={handleAddNewCategories}
                            >
                                <DefaultHeader
                                    style={{
                                        fontSize: 18,
                                        lineHeght: 22,
                                        color: darkModeEnabled ? '#000' : '#F5941E'
                                    }}
                                >
                                    Подтвердить
                                </DefaultHeader>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}