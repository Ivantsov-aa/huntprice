import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, ImageBackground, Image, TouchableOpacity, TextInput, Keyboard } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { DefaultSubheader } from "../../../components/default-subheader";
import { MediumText } from "../../../components/medium-text";
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const ChosenDeal = (
    {
        navigation,
        financeStatistic,
        darkModeEnabled,
        currentBackground,
        chosenDeal,
        setChosenDeal,
        sumAllExpenses,
        sumAllIncome,
        setFinanceStatistic,
        handleBalanceChanges
    }
) => {
    const [chosenExpensesCategory, setChosenExpensesCategory] = useState(1);
    const [openSellingPrice, setSellingPrice] = useState(false);

    const [finalPrice, setFinalPrice] = useState(null);

    useEffect(() => {
        handleBalanceChanges(chosenDeal);
    }, [])

    const handleSellProject = async () => {
        const date = new Date();
        const monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const sellProject = financeStatistic.map(stat => (
            stat.model === chosenDeal.model ?
                { ...stat, sell: true, finalPrice: +finalPrice, sellingDate: `${date.getDate()} ${monthArray[date.getMonth()]}` }
                :
                { ...stat }
        ))

        Keyboard.dismiss();

        setFinanceStatistic(sellProject);
        setChosenDeal({ ...chosenDeal, sell: true, finalPrice: +finalPrice });
        await AsyncStorage.setItem('finance', JSON.stringify(sellProject));
    }

    return (
        chosenDeal &&
        <SafeAreaView
            style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['right', 'top', 'left']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.7)' : '#002845', flexDirection: 'row', alignItems: 'center', width: '100%', height: 71, paddingHorizontal: 6, marginBottom: 20 }} onPress={() => navigation.goBack()}>
                        <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                        <DefaultHeader style={{ color: '#F5941E', fontSize: 24, lineHeght: 30 }}>{chosenDeal.model}</DefaultHeader>
                    </TouchableOpacity>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, width: '100%' }}
                        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                        extraHeight={180}
                        enableOnAndroid
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20, backgroundColor: darkModeEnabled ? '#rgba(255, 255, 255, 0.8)' : '#F5F5F5' }}>
                            <TouchableOpacity activeOpacity={0.9}
                                style={{
                                    flex: 1,
                                    backgroundColor: chosenExpensesCategory === 1 ? '#F5941E' : 'transparent',
                                    height: 40,
                                    borderBottomRightRadius: 20,
                                    borderTopRightRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => setChosenExpensesCategory(1)}
                            >
                                <DefaultHeader style={{ fontSize: 16, color: chosenExpensesCategory !== 1 ? (darkModeEnabled ? '#000' : '#F5941E') : '#002845' }}>Доходы</DefaultHeader>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}
                                style={{
                                    flex: 1,
                                    backgroundColor: chosenExpensesCategory === 2 ? '#F5941E' : 'transparent',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20
                                }}
                                onPress={() => setChosenExpensesCategory(2)}
                            >
                                <DefaultHeader style={{ fontSize: 16, color: chosenExpensesCategory !== 2 ? (darkModeEnabled ? '#000' : '#F5941E') : '#002845', paddingVertical: 10 }}>Расходы</DefaultHeader>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ width: '100%' }}>
                            <View style={{ flex: 1, paddingHorizontal: 6, width: '100%' }}>
                                {chosenExpensesCategory === 2 ?
                                    chosenDeal.reportExpenses.map(category => (
                                        category.list.map((expenses, i) => (
                                            <View
                                                style={{
                                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#F5F5F5',
                                                    borderRadius: 10,
                                                    elevation: 2,
                                                    marginBottom: 20,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 8
                                                }}
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
                                                            color: darkModeEnabled ? '#000' : '#00000050'
                                                        }}
                                                    >{expenses.date}</MediumText>
                                                </View>
                                                <View>
                                                    <MediumText
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeght: 17,
                                                            color: darkModeEnabled ? '#000' : '#F5941E'
                                                        }}
                                                    >{expenses.value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</MediumText>
                                                </View>
                                            </View>
                                        ))

                                    ))
                                    :
                                    <>
                                        {chosenDeal.reportIncome.map((expenses, i) => (
                                            <View
                                                style={{
                                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#F5F5F5',
                                                    borderRadius: 10,
                                                    elevation: 2,
                                                    marginBottom: 20,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 8
                                                }}
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
                                                            color: darkModeEnabled ? '#000' : '#00000050'
                                                        }}
                                                    >{expenses.date}</MediumText>
                                                </View>
                                                <View>
                                                    <MediumText
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeght: 17,
                                                            color: darkModeEnabled ? '#16BB1C' : '#16BB1C'
                                                        }}
                                                    >+{expenses.value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</MediumText>
                                                </View>
                                            </View>
                                        ))}
                                        {chosenDeal.finalPrice &&
                                            <View
                                                style={{
                                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#F5F5F5',
                                                    borderRadius: 10,
                                                    elevation: 2,
                                                    marginBottom: 20,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 8
                                                }}
                                            >
                                                <View>
                                                    <MediumText
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeght: 17,
                                                            marginBottom: 5
                                                        }}
                                                    >
                                                        Итоговая сумма продажи
                                                    </MediumText>
                                                    <MediumText
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeght: 17,
                                                            color: darkModeEnabled ? '#000' : '#00000050'
                                                        }}
                                                    >
                                                        {chosenDeal.sellingDate}
                                                    </MediumText>
                                                </View>
                                                <View>
                                                    <MediumText
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeght: 17,
                                                            color: darkModeEnabled ? '#16BB1C' : '#16BB1C'
                                                        }}
                                                    >+{chosenDeal.finalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</MediumText>
                                                </View>
                                            </View>
                                        }
                                    </>
                                }
                            </View>
                        </ScrollView>
                        {!chosenDeal.sell ?
                            <>
                                <View style={{ alignItems: 'center', width: '100%', marginBottom: 30 }}>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={{
                                            alignItems: 'center',
                                            backgroundColor: '#F5941E',
                                            paddingVertical: 9,
                                            width: 239,
                                            borderRadius: 20,
                                            marginVertical: 20
                                        }}
                                        onPress={() => navigation.navigate('ChosenDealEditor', { chosenDeal: chosenDeal, chosenExpensesCategory: chosenExpensesCategory, sumItems: chosenExpensesCategory === 1 ? sumAllIncome : sumAllExpenses })}
                                    >
                                        <DefaultHeader style={{ fontSize: 16, lineHeght: 19, color: darkModeEnabled ? '#000' : '#002845' }}>Добавить {chosenExpensesCategory === 1 ? 'доходы' : 'расходы'}</DefaultHeader>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={{
                                            alignItems: 'center',
                                            backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#002845',
                                            paddingVertical: 9,
                                            borderRadius: 20,
                                            width: 239
                                        }}
                                        onPress={() => setSellingPrice(!openSellingPrice)}
                                    >
                                        <DefaultHeader style={{ fontSize: 16, lineHeght: 19, color: darkModeEnabled ? '#000' : '#F5941E' }}>Проект продан</DefaultHeader>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: 358,
                                        backgroundColor: '#F5941E',
                                        borderRadius: 20,
                                        paddingVertical: 14,
                                        marginBottom: 25,
                                        elevation: 3
                                    }}
                                >
                                    {openSellingPrice ?
                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                                paddingLeft: 10
                                            }}
                                        >
                                            <TextInput
                                                placeholder='Введите сумму продажи'
                                                style={{
                                                    height: 53,
                                                    fontSize: 18,
                                                    backgroundColor: 'transparent'
                                                }}
                                                value={finalPrice}
                                                onChangeText={setFinalPrice}
                                            />
                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }}
                                                        onPress={handleSellProject}
                                                    >
                                                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                                                            <Path fill={darkModeEnabled ? "#000" : "#002845"} d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                                            <Path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05" />
                                                            <Path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07" />
                                                            <Path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z" />
                                                        </Svg>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={0.9}
                                                        onPress={() => {
                                                            setSellingPrice(false);
                                                            Keyboard.dismiss();
                                                        }}
                                                    >
                                                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                                                            <Path fill={darkModeEnabled ? "#000" : "#002845"} d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                                            <Path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z" />
                                                            <Path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z" />
                                                        </Svg>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        < View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <View style={{ flex: 1, alignItems: 'center', borderRightColor: '#000', borderRightWidth: 1 }}>
                                                <MediumText style={{ marginBottom: 10 }}>Доходы</MediumText>
                                                <DefaultSubheader style={{ fontSize: 16, lineHeght: 19 }}>{sumAllIncome ? `+${sumAllIncome.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽` : 0}</DefaultSubheader>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <MediumText style={{ marginBottom: 10 }}>Расходы</MediumText>
                                                <DefaultSubheader style={{ fontSize: 16, lineHeght: 19 }}>{sumAllExpenses ? `${sumAllExpenses.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽` : 0}</DefaultSubheader>
                                            </View>
                                        </View>
                                    }
                                </View>
                            </>
                            :
                            <View
                                style={{
                                    alignItems: 'center',
                                    width: 358,
                                    backgroundColor: '#F5941E',
                                    borderRadius: 20,
                                    paddingVertical: 14,
                                    marginVertical: 25,
                                    elevation: 3
                                }}
                            >
                                <DefaultHeader style={{
                                    fontSize: 16,
                                    color: darkModeEnabled ? '#000' : '#002845'
                                }}>Прибыль с проекта</DefaultHeader>
                                <DefaultHeader style={{
                                    fontSize: 22
                                }}>
                                    {
                                        sumAllIncome + sumAllExpenses - chosenDeal.price + +chosenDeal.finalPrice > 0 ?
                                            `+${(sumAllIncome + sumAllExpenses - chosenDeal.price + +chosenDeal.finalPrice).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽`
                                            :
                                            `${sumAllIncome + sumAllExpenses - chosenDeal.price + +chosenDeal.finalPrice} ₽`
                                    }
                                </DefaultHeader>
                            </View>
                        }
                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    selectContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
    }
})