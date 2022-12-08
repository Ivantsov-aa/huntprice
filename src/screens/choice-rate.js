import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Platform } from "react-native"
import { DefaultHeader } from "../components/default-header";
import { DefaultText } from "../components/default-text";
import { DefaultSubheader } from "../components/default-subheader";
import { SafeAreaView } from "react-native-safe-area-context";

const rates = [
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
            public: 'Двухчасовая задержка',
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
];

export const ChoiceRate = ({ navigation, registrationSubmit, darkModeEnabled, currentBackground }) => {
    const [currentBlock, setCurrentBlock] = useState(null);
    const [chosenRate, setChosenRate] = useState(null);
    const [dimensions, setDimensions] = useState({ window });


    useEffect(() => {
        const windowHeight = Dimensions.get('window').height;
        setDimensions(windowHeight);
    });

    const handleChoiceRate = () => {
        registrationSubmit(chosenRate.id, 'rate');
    }

    return (
        <SafeAreaView
            style={{ ...styles.container, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['left', 'top', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View
                    style={{
                        flex: 1,
                        paddingTop: darkModeEnabled ? (Platform.OS === 'ios' ? 0 : 40) : 0,
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                        width: '100%'
                    }}
                >
                    <View
                        style={{
                            padding: 16,
                            backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845',
                            marginBottom: 20,
                            alignItems: 'center'
                        }}
                    >
                        <DefaultHeader style={{ ...styles.title, color: '#F5941E' }}>Оформите подписку</DefaultHeader>
                    </View>
                    <ScrollView style={{ paddingHorizontal: 6 }}>
                        {rates.map(rate => {
                            return <TouchableOpacity
                                onPress={() => setChosenRate(chosenRate && chosenRate.id === rate.id ? null : rate)}
                                activeOpacity={0.9}
                                key={rate.id}>
                                <View style={{
                                    elevation: 2,
                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                    backgroundColor: `${chosenRate && chosenRate.id === rate.id ? (darkModeEnabled ? '#F5941E' : '#f8b462') : '#fff'}`,
                                    marginBottom: 20,
                                    borderRadius: 12,
                                    padding: 16,
                                    shadowOffset: { width: 1, height: 2 },
                                    shadowColor: '#000',
                                    shadowRadius: 1,
                                    shadowOpacity: 0.2
                                }}>
                                    <DefaultHeader style={{ fontSize: 26, lineHeight: 31, marginBottom: 12 }}>{rate.name}</DefaultHeader>
                                    <DefaultText style={{ fontSize: 13, lineHeight: 16, marginBottom: 12, color: '#002845' }}>{rate.desc}</DefaultText>
                                    <DefaultSubheader>Цена: <DefaultText>{rate.price}</DefaultText></DefaultSubheader>
                                    <DefaultSubheader>Срок: <DefaultText>{rate.term}</DefaultText></DefaultSubheader>
                                    {currentBlock === rate.id &&
                                        <View>
                                            <DefaultSubheader>Избранный поиск (ед.): <DefaultText>{rate.full_desc.scaner}</DefaultText></DefaultSubheader>
                                            <DefaultSubheader>Размещение информации о публикации объявлений: <DefaultText>{rate.full_desc.public}</DefaultText></DefaultSubheader>
                                            <DefaultSubheader>Проверка по VIN: <DefaultText>{rate.full_desc.checkVin}</DefaultText></DefaultSubheader>
                                            <DefaultSubheader>Статистика финансов: <DefaultText>{rate.full_desc.statistic}</DefaultText></DefaultSubheader>
                                            <DefaultSubheader>Область поиска: <DefaultText>{rate.full_desc.area}</DefaultText></DefaultSubheader>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            backgroundColor: `${chosenRate && chosenRate.id === rate.id ? '#fff' : '#f8b462'}`,
                                            width: 20,
                                            height: 20,
                                            borderRadius: 50
                                        }}
                                        activeOpacity={0.9}
                                        onPress={() => setCurrentBlock(rate.id === currentBlock ? null : rate.id)}
                                    ><DefaultHeader style={{ textAlign: 'center', fontSize: 14, color: '#002845' }}>?</DefaultHeader></TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                    <View style={{ marginTop: 15, marginBottom: Platform.OS === 'ios' ? 25 : 15 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => handleChoiceRate()}>
                            <View style={styles.buttonContainerLogOut}>
                                <DefaultHeader style={styles.buttonLogOut}>Выбрать тариф</DefaultHeader>
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        paddingHorizontal: 24
    },
    buttonContainerLogOut: {
        alignSelf: 'center',
        width: 332,
        height: 41,
        borderRadius: 8,
        backgroundColor: '#F5941E',
        paddingTop: 12
    },
    buttonLogOut: {
        color: '#002845',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '600'
    }
});