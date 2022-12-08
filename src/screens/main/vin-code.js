import { useRef, useState } from "react";
import { ImageBackground, Animated, Image, TextInput, TouchableOpacity, View, StyleSheet, SectionList, SafeAreaView, ScrollView, Dimensions } from "react-native"
import { DefaultHeader } from "../../components/default-header"
import { DefaultSubheader } from "../../components/default-subheader";
import { DefaultText } from "../../components/default-text";
import { MediumText } from "../../components/medium-text";

export const VinCode = ({ navigation, darkModeEnabled, currentBackground }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff'
                }}>
                    <View style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginBottom: 10, elevation: 10 }}>
                        <DefaultHeader style={{ fontSize: 24, lineHeght: 30, color: '#F5941E' }}>VIN проверка</DefaultHeader>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('HistoryVin')}>
                            <Image source={require('../../../assets/icons/history-vin-icon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 6 }}>
                        <DefaultSubheader style={{
                            fontSize: 12,
                            lineHeght: 15,
                            color: darkModeEnabled ? '#fff' : '#002845',
                            marginBottom: 6,
                            paddingLeft: 14
                        }}>
                            Данные авто
                        </DefaultSubheader>
                        <TextInput style={{
                            fontFamily: 'Inter-Regular',
                            backgroundColor: darkModeEnabled ? '#ffffff95' : '#fff',
                            elevation: 1,
                            height: 40,
                            width: '100%',
                            borderRadius: 8,
                            paddingLeft: 18,
                            fontSize: 13,
                            lineHeight: 16,
                            marginBottom: 20,
                            shadowOffset: { width: 1, height: 2 },
                            shadowColor: '#000',
                            shadowRadius: 1,
                            shadowOpacity: 0.2
                        }}
                            placeholderTextColor={darkModeEnabled ? '#000' : 'rgba(29, 29, 29, 0.33)'}
                            placeholder='VIN автомобиля или госномер'
                        />
                        <TouchableOpacity activeOpacity={0.9} style={{ ...styles.buttonContainerLogOut, marginBottom: 10, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#F5941E', color: darkModeEnabled ? '#000' : '#002845' }}>
                            <DefaultHeader style={styles.buttonLogOut}>Получить краткий отчёт</DefaultHeader>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ ...styles.buttonContainerLogOut, backgroundColor: '#F5941E', color: darkModeEnabled ? '#000' : '#002845' }}>
                            <DefaultHeader style={{ ...styles.buttonLogOut, fontSize: 16 }}>Получить полный отчёт</DefaultHeader>
                            <MediumText style={{ fontSize: 12 }}>Осталось 5 отчётов</MediumText>
                        </TouchableOpacity>
                        <SectionList
                            style={{ paddingHorizontal: 14, marginBottom: 7 }}
                            scrollEnabled={false}
                            sections={[
                                {
                                    title: 'Краткий отчёт содержит:',
                                    data: [
                                        '• Количество владельцев по ПТС',
                                        '• Технические характеристики авто',
                                        '• Проверка юридической чистоты авто (залог, розыск, ограничения на регистрационные действия)',
                                        '• Проверка на ДТП с датами аварий и описанием полученных повреждений'
                                    ]
                                }
                            ]}
                            renderItem={({ item }) => <DefaultText
                                style={{
                                    color: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#002845',
                                    fontSize: 12,
                                    lineHeght: 18
                                }}
                            >{item}</DefaultText>}
                            renderSectionHeader={({ section }) => <DefaultSubheader style={{
                                fontSize: 12,
                                lineHeght: 15,
                                color: darkModeEnabled ? 'rgba(255, 255, 255, 1)' : '#002845',
                                marginBottom: 7
                            }}>{section.title}</DefaultSubheader>}
                        />
                        <SectionList
                            scrollEnabled={false}
                            style={{ paddingHorizontal: 14, marginBottom: 20 }}
                            sections={[
                                {
                                    title: 'Полный отчёт также включает:',
                                    data: [
                                        '• История обслуживания автомобиля и ремонтов',
                                        '• История эксплуатации',
                                        '• Сведения об использовании в каршеринге и такси',
                                        '• Объявления на площадках',
                                        '• Пробег',
                                        '• Данные о полисе ОСАГО'
                                    ]
                                }
                            ]}
                            renderItem={({ item }) => <DefaultText
                                style={{
                                    color: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#002845',
                                    fontSize: 12,
                                    lineHeght: 18
                                }}
                            >{item}</DefaultText>}
                            renderSectionHeader={({ section }) => <DefaultSubheader style={{
                                fontSize: 12,
                                lineHeght: 15,
                                color: darkModeEnabled ? 'rgba(255, 255, 255, 1)' : '#002845',
                                marginBottom: 7
                            }}>{section.title}</DefaultSubheader>}
                        />
                        <TouchableOpacity activeOpacity={0.9}
                            style={{ ...styles.buttonContainerLogOut, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#F5941E', color: '#000' }}
                            onPress={() => navigation.navigate('VinReport')}
                        >
                            <DefaultHeader style={styles.buttonLogIn}>Просмотреть пример отчёта</DefaultHeader>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 14
    },
    input: {
        fontFamily: 'Inter-Regular',
        borderColor: 'rgba(29, 29, 29, 0.15)',
        height: 40,
        width: 332,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 18,
        fontSize: 13,
        lineHeight: 16,
        marginBottom: 8
    },
    buttonContainerLogIn: {
        width: '100%',
        height: 41,
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingTop: 12,
        elevation: 1,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2
    },
    buttonLogIn: {
        color: '#3E3021',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '600'
    },
    buttonContainerLogOut: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#F5941E',
        paddingVertical: 12,
        marginBottom: 20
    },
    buttonLogOut: {
        color: '#002845',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '600'
    }
});