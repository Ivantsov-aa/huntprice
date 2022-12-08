import { useState } from "react"
import { View, TouchableOpacity, Image, ScrollView, SafeAreaView, ImageBackground } from "react-native"
import { DefaultHeader } from "../../components/default-header"
import Svg, { Path } from 'react-native-svg';
import DropDownPicker from "react-native-dropdown-picker";

import AsyncStorage from "@react-native-async-storage/async-storage"

export const FinanceStatistic = ({ navigation, darkModeEnabled, currentBackground, financeStatistic, setFinanceStatistic, setChosenDeal }) => {
    const [deleteCart, setDeleteCart] = useState(null);

    const [openFinanceFilter, setOpenFinanceFilter] = useState(false);
    const [valueFinanceFilter, setValueFinanceFilter] = useState(null);
    const [financeFilterList, setFinanceFilterList] = useState([
        { label: 'Дата по возрастанию', value: 'date_up' },
        { label: 'Дата по убыванию', value: 'date_down' },
        { label: 'По дате создания', value: 'date_create' },
        { label: 'По дате продажи', value: 'date_selling' },
        { label: 'Только прибыльные', value: 'profitable' },
        { label: 'Только убыточные', value: 'unprofitable' },
        { label: 'Только проданные', value: 'sold' },
        { label: 'Только непроданные', value: 'unsold' }
    ]);

    const handleDeleteCart = async () => {
        const deleteCartStat = financeStatistic.filter(stat => stat.id !== deleteCart);
        setFinanceStatistic(deleteCartStat);
        await AsyncStorage.setItem('finance', JSON.stringify(deleteCartStat));
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
                <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                        width: '100%'
                    }}>
                        <View style={{ padding: 16 }}>
                            <DefaultHeader style={{ color: darkModeEnabled ? '#fff' : '#000', fontSize: 24, lineHeght: 30 }}>Финансы</DefaultHeader>
                        </View>
                        <View style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845', paddingHorizontal: 6, paddingVertical: 20, marginBottom: 6, alignItems: 'center' }}>
                            <DefaultHeader style={{ color: '#F5941E', fontSize: 24, lineHeght: 30 }}>Мои проекты</DefaultHeader>
                        </View>
                        <View style={{ paddingHorizontal: 6, marginBottom: 6 }}>
                            <DropDownPicker
                                listMode='MODAL'
                                placeholder='Сортировать'
                                theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                placeholderStyle={{
                                    fontSize: 14,
                                    fontFamily: 'Inter-Bold'
                                }}
                                listItemLabelStyle={{
                                    color: darkModeEnabled ? '#fff' : '#002845'
                                }}
                                textStyle={{
                                    color: darkModeEnabled ? '#000' : '#002845'
                                }}
                                currentBackground={currentBackground}
                                modalProps={{
                                    animationType: 'slide'
                                }}
                                ArrowDownIconComponent={() => <Svg style={{ marginRight: 8 }} width="15" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 0.555556C8.33333 0.25 8.08333 0 7.77778 0H0.555556C0.25 0 0 0.25 0 0.555556C0 0.711111 0.0611111 0.85 0.161111 0.95L2.77778 3.56111V8.33333C2.77778 8.63889 3.02778 8.88889 3.33333 8.88889C3.48889 8.88889 3.62778 8.82778 3.72778 8.72778L5.39444 7.06111C5.49444 6.96111 5.55556 6.82222 5.55556 6.66667V3.56111L8.17222 0.944445C8.27222 0.85 8.33333 0.711111 8.33333 0.555556ZM6.11111 5C6.11111 5.30556 6.36111 5.55556 6.66667 5.55556H10.5556C10.8611 5.55556 11.1111 5.30556 11.1111 5C11.1111 4.69444 10.8611 4.44444 10.5556 4.44444H6.66667C6.36111 4.44444 6.11111 4.69444 6.11111 5ZM10.5556 8.88889H6.66667C6.36111 8.88889 6.11111 9.13889 6.11111 9.44444C6.11111 9.75 6.36111 10 6.66667 10H10.5556C10.8611 10 11.1111 9.75 11.1111 9.44444C11.1111 9.13889 10.8611 8.88889 10.5556 8.88889ZM10.5556 6.66667H6.66667C6.36111 6.66667 6.11111 6.91667 6.11111 7.22222C6.11111 7.52778 6.36111 7.77778 6.66667 7.77778H10.5556C10.8611 7.77778 11.1111 7.52778 11.1111 7.22222C11.1111 6.91667 10.8611 6.66667 10.5556 6.66667Z" fill={darkModeEnabled ? "#000" : "#002845"} />
                                </Svg>}
                                ArrowUpIconComponent={() => <Svg style={{ marginRight: 8 }} width="15" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 0.555556C8.33333 0.25 8.08333 0 7.77778 0H0.555556C0.25 0 0 0.25 0 0.555556C0 0.711111 0.0611111 0.85 0.161111 0.95L2.77778 3.56111V8.33333C2.77778 8.63889 3.02778 8.88889 3.33333 8.88889C3.48889 8.88889 3.62778 8.82778 3.72778 8.72778L5.39444 7.06111C5.49444 6.96111 5.55556 6.82222 5.55556 6.66667V3.56111L8.17222 0.944445C8.27222 0.85 8.33333 0.711111 8.33333 0.555556ZM6.11111 5C6.11111 5.30556 6.36111 5.55556 6.66667 5.55556H10.5556C10.8611 5.55556 11.1111 5.30556 11.1111 5C11.1111 4.69444 10.8611 4.44444 10.5556 4.44444H6.66667C6.36111 4.44444 6.11111 4.69444 6.11111 5ZM10.5556 8.88889H6.66667C6.36111 8.88889 6.11111 9.13889 6.11111 9.44444C6.11111 9.75 6.36111 10 6.66667 10H10.5556C10.8611 10 11.1111 9.75 11.1111 9.44444C11.1111 9.13889 10.8611 8.88889 10.5556 8.88889ZM10.5556 6.66667H6.66667C6.36111 6.66667 6.11111 6.91667 6.11111 7.22222C6.11111 7.52778 6.36111 7.77778 6.66667 7.77778H10.5556C10.8611 7.77778 11.1111 7.52778 11.1111 7.22222C11.1111 6.91667 10.8611 6.66667 10.5556 6.66667Z" fill={darkModeEnabled ? "#000" : "#002845"} />
                                </Svg>}
                                style={{
                                    backgroundColor: '#F5941E',
                                    flexDirection: 'row-reverse',
                                    minHeight: 36,
                                    width: 'auto',
                                    borderWidth: 0,
                                    borderRadius: 10
                                }}
                                labelStyle={{
                                    fontSize: 14,
                                    fontFamily: 'Inter-Bold'
                                }}
                                open={openFinanceFilter}
                                value={valueFinanceFilter}
                                items={financeFilterList}
                                setOpen={setOpenFinanceFilter}
                                setValue={setValueFinanceFilter}
                                setItems={setFinanceFilterList}
                            />
                        </View>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 6 }}>
                                {financeStatistic && financeStatistic.sort((a, b) => a.sell - b.sell).map(stat => {
                                    const expenses = stat.reportExpenses.map(categories => (
                                        categories.list.map(expenses => expenses.value)
                                    ))

                                    const sumExpenses = expenses && expenses.flat().reduce((a, b) => a + b, 0);
                                    const income = stat.reportIncome.map(income => income.value);
                                    const sumIncome = income && income.reduce((a, b) => a + b, 0);

                                    return <TouchableOpacity activeOpacity={0.9} style={{
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.7)' : '#fff',
                                        maxWidth: 180,
                                        marginBottom: 20,
                                        borderRadius: 12,
                                        elevation: 2,
                                        shadowOffset: { width: 1, height: 2 },
                                        shadowColor: '#000',
                                        shadowRadius: 1,
                                        shadowOpacity: 0.2,
                                        position: 'relative'
                                    }}
                                        onPress={() => {
                                            if (deleteCart !== stat.id) {
                                                navigation.navigate('ChosenDeal');
                                                setChosenDeal(stat);
                                            }
                                        }}
                                        onLongPress={() => setDeleteCart(deleteCart !== stat.id ? stat.id : null)}
                                        key={stat.id}
                                    >
                                        {deleteCart === stat.id &&
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    backgroundColor: '#00284590',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 10,
                                                    zIndex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <TouchableOpacity activeOpacity={0.9}
                                                    style={{
                                                        backgroundColor: '#F5941E',
                                                        width: 130,
                                                        borderRadius: 20,
                                                        paddingVertical: 10,
                                                        alignItems: 'center'
                                                    }}
                                                    onPress={handleDeleteCart}
                                                >
                                                    <DefaultHeader>Удалить</DefaultHeader>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                                            <Image style={{ width: 180, height: 110, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} source={stat.img} />
                                        </View>
                                        <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
                                            <View style={{ flex: 1 }}>
                                                <DefaultHeader style={{ color: darkModeEnabled ? '#000' : '#002845', fontSize: 16, lineHeght: 19, marginBottom: 4 }}>{stat.model}</DefaultHeader>
                                                <DefaultHeader
                                                    style={{
                                                        color: stat.finalPrice ? ((sumIncome + sumExpenses - stat.price + +stat.finalPrice) > 0 ? '#379237' : '#DC3535') : (darkModeEnabled ? '#000' : '#F5941E'),
                                                        marginBottom: 16,
                                                        fontSize: 12,
                                                        lineHeght: 15
                                                    }}
                                                >
                                                    {
                                                        stat.finalPrice ?
                                                            (
                                                                sumIncome + sumExpenses - stat.price + +stat.finalPrice > 0 ?
                                                                    `+${(sumIncome + sumExpenses - stat.price + +stat.finalPrice).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`
                                                                    :
                                                                    sumIncome + sumExpenses - stat.price + +stat.finalPrice
                                                            )
                                                            :
                                                            stat.price && stat.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
                                                    } ₽
                                                </DefaultHeader>
                                            </View>
                                            <DefaultHeader style={{
                                                backgroundColor: stat.sell ? ((sumIncome + sumExpenses - stat.price + +stat.finalPrice) > 0 ? '#379237' : '#DC3535') : (darkModeEnabled ? '#000' : '#002845'),
                                                borderRadius: 15,
                                                color: stat.sell ? (darkModeEnabled ? '#000' : '#002845') : '#F5941E',
                                                textAlign: 'center',
                                                paddingVertical: 5,
                                                overflow: 'hidden'
                                            }}>{stat.sell ? 'Продан' : 'Не продан'}</DefaultHeader>
                                        </View>
                                    </TouchableOpacity>
                                })}
                            </View>
                        </ScrollView>
                        <TouchableOpacity activeOpacity={0.9} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F5941E',
                            borderRadius: 50,
                            paddingVertical: 10,
                            paddingHorizontal: 40,
                            position: 'absolute',
                            bottom: 20,
                            left: '50%',
                            transform: [
                                { translateX: -102 }
                            ]
                        }}
                            onPress={() => navigation.navigate('NewProject')}
                        >
                            <Svg style={{ marginRight: 8 }} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11 21C16.5229 21 21 16.5229 21 11C21 5.47715 16.5229 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5229 5.47715 21 11 21Z" stroke={darkModeEnabled ? "#000" : "#002845"} strokeWidth="2" stroke-linejoin="round" />
                                <Path d="M11 7V15" stroke={darkModeEnabled ? "#000" : "#002845"} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M7 11H15" stroke={darkModeEnabled ? "#000" : "#002845"} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                            <DefaultHeader style={{ color: darkModeEnabled ? '#000' : '#002845', fontSize: 13, lineHeght: 16 }}>Новый проект</DefaultHeader>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView >
        </>
    )
}