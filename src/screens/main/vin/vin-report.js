import { useState } from "react";
import { View, ScrollView, ImageBackground, Image, TouchableOpacity, Platform } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { MediumText } from "../../../components/medium-text";
import { DefaultText } from "../../../components/default-text";
import { SafeAreaView } from "react-native-safe-area-context";

export const VinReport = ({ navigation, darkModeEnabled, currentBackground }) => {
    const [fullReport, setFullReport] = useState(false);

    return (
        <SafeAreaView
            style={{
                height: '100%',
                backgroundColor: darkModeEnabled ? '#000' : '#fff'
            }}
            edges={['right', 'top', 'left']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity activeOpacity={0.9}
                            style={{
                                padding: 16,
                                flexDirection: 'row'
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                            <DefaultHeader
                                style={{
                                    fontSize: 24,
                                    lineHeght: 29,
                                    color: darkModeEnabled ? '#fff' : '#002845'
                                }}
                            >{fullReport ? 'Полный' : 'Краткий'} отчёт</DefaultHeader>
                        </TouchableOpacity>
                        <DefaultHeader
                            style={{
                                fontSize: 24,
                                lineHeght: 29,
                                padding: 16,
                                color: '#F5941E',
                                backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845',
                                textAlign: 'center'
                            }}
                        >
                            Nissan Almera 2015
                        </DefaultHeader>
                    </View>
                    <ScrollView style={{ width: '100%' }}>
                        <View
                            style={{
                                paddingHorizontal: 6,
                                paddingVertical: 10
                            }}
                        >
                            <Image style={{ resizeMode: 'cover', width: '100%', height: 212, borderRadius: 10, marginBottom: 15 }} source={require('../../../../assets/models/almera.jpg')} />
                            <View style={{ marginBottom: 20 }}>
                                <DefaultHeader
                                    style={{
                                        fontSize: 20,
                                        lineHeght: 24,
                                        marginBottom: 10,
                                        paddingLeft: 20,
                                        color: darkModeEnabled ? '#fff' : '#000'
                                    }}
                                >Характеристики</DefaultHeader>
                                <View
                                    style={{
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                        elevation: 3,
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 10,
                                        shadowOffset: { width: 1, height: 3 },
                                        shadowColor: '#000',
                                        shadowRadius: 5,
                                        shadowOpacity: 0.2
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <DefaultHeader >Модель</DefaultHeader>
                                        <DefaultText>Nissan Almera</DefaultText>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <DefaultHeader >VIN</DefaultHeader>
                                        <DefaultText>Z0NZWE00054341234</DefaultText>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <DefaultHeader >Год выпуска</DefaultHeader>
                                        <DefaultText>2015</DefaultText>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <DefaultHeader >Объём двигателя</DefaultHeader>
                                        <DefaultText>1.6 л</DefaultText>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <DefaultHeader >Номер ПТС</DefaultHeader>
                                        <DefaultText>77УН866053</DefaultText>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <DefaultHeader >Госномер</DefaultHeader>
                                        <DefaultText>Н 716 ТО 750</DefaultText>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: fullReport ? 20 : 0 }}>
                                <DefaultHeader style={{
                                    fontSize: 20,
                                    color: darkModeEnabled ? '#fff' : '#000',
                                    lineHeght: 24,
                                    marginBottom: 10,
                                    paddingLeft: 20
                                }}
                                >2 владельца</DefaultHeader>
                                <View
                                    style={{
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                        elevation: 3,
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 10,
                                        shadowOffset: { width: 1, height: 3 },
                                        shadowColor: '#000',
                                        shadowRadius: 5,
                                        shadowOpacity: 0.2
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', borderBottomColor: '#00000030', borderBottomWidth: 1, paddingBottom: 10 }}>
                                        <DefaultHeader
                                            style={{
                                                backgroundColor: '#F5941E',
                                                height: 20,
                                                width: 20,
                                                textAlign: 'center',
                                                borderRadius: 50,
                                                marginRight: 10
                                            }}
                                        >1</DefaultHeader>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Период владения</DefaultHeader>
                                                <DefaultText>14 мар 2012 — 2 мар 2013</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Срок владения</DefaultHeader>
                                                <DefaultText>11 мес.</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Тип владельца</DefaultHeader>
                                                <DefaultText>Физическое лицо</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Регион регистрации</DefaultHeader>
                                                <DefaultText>Москва</DefaultText>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <DefaultHeader
                                            style={{
                                                backgroundColor: '#F5941E',
                                                height: 20,
                                                width: 20,
                                                textAlign: 'center',
                                                borderRadius: 50,
                                                marginRight: 10
                                            }}
                                        >2</DefaultHeader>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Период владения</DefaultHeader>
                                                <DefaultText>14 мар 2012 — 2 мар 2013</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Срок владения</DefaultHeader>
                                                <DefaultText>11 мес.</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Тип владельца</DefaultHeader>
                                                <DefaultText>Физическое лицо</DefaultText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <DefaultHeader >Регион регистрации</DefaultHeader>
                                                <DefaultText>Москва</DefaultText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {fullReport &&
                                <>
                                    <View style={{ marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 11 }}>
                                            <Image source={require('../../../../assets/icons/warning-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                            <DefaultHeader style={{
                                                fontSize: 20,
                                                lineHeght: 24,
                                                color: darkModeEnabled ? '#fff' : '#000'
                                            }}
                                            >Юридическая чистота</DefaultHeader>
                                        </View>
                                        <View
                                            style={{
                                                backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                                elevation: 3,
                                                paddingVertical: 6,
                                                paddingHorizontal: 12,
                                                borderRadius: 10,
                                                shadowOffset: { width: 1, height: 3 },
                                                shadowColor: '#000',
                                                shadowRadius: 5,
                                                shadowOpacity: 0.2
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center', marginBottom: 10 }}>
                                                <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                                <DefaultHeader >Залог не найден</DefaultHeader>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center', marginBottom: 10 }}>
                                                <Image source={require('../../../../assets/icons/warning-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                                <DefaultHeader >Авто в розыске</DefaultHeader>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center', marginBottom: 10 }}>
                                                <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                                <DefaultHeader >Ограничения на регистрацию отсутствуют</DefaultHeader>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                            elevation: 3,
                                            padding: 12,
                                            borderRadius: 10,
                                            marginBottom: 20,
                                            shadowOffset: { width: 1, height: 3 },
                                            shadowColor: '#000',
                                            shadowRadius: 5,
                                            shadowOpacity: 0.2
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center' }}>
                                            <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                            <DefaultHeader>Случаи ДТП не найдены</DefaultHeader>
                                        </View>
                                    </View>
                                    <View>
                                        <DefaultHeader style={{
                                            fontSize: 20,
                                            lineHeght: 24,
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                            color: darkModeEnabled ? '#fff' : '#000'
                                        }}>История эксплуатации</DefaultHeader>
                                        <View
                                            style={{
                                                backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                                elevation: 3,
                                                paddingVertical: 6,
                                                paddingHorizontal: 12,
                                                borderRadius: 10,
                                                marginBottom: 20,
                                                shadowOffset: { width: 1, height: 3 },
                                                shadowColor: '#000',
                                                shadowRadius: 5,
                                                shadowOpacity: 0.2
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                <View style={{ maxWidth: 250 }}>
                                                    <DefaultHeader>Первичная регистрация</DefaultHeader>
                                                    <DefaultText>Москва</DefaultText>
                                                </View>
                                                <View>
                                                    <DefaultText>14 мар 2012</DefaultText>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                <View style={{ maxWidth: 250 }}>
                                                    <DefaultHeader>Расчет стоимости ремонта</DefaultHeader>
                                                    <DefaultText>Audatex</DefaultText>
                                                </View>
                                                <View>
                                                    <DefaultText>27 янв 2013</DefaultText>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                <View style={{ maxWidth: 250 }}>
                                                    <DefaultHeader>Смена владельца</DefaultHeader>
                                                    <DefaultText>Москва</DefaultText>
                                                </View>
                                                <View>
                                                    <DefaultText>2 мар 2013</DefaultText>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ maxWidth: 250 }}>
                                                    <DefaultHeader>Размещение первого объявления на Авито</DefaultHeader>
                                                    <DefaultText>Авито, Московская обл., Коломна</DefaultText>
                                                </View>
                                                <View>
                                                    <DefaultText>2 мар 2013</DefaultText>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 11 }}>
                                            <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                            <DefaultHeader style={{
                                                fontSize: 20,
                                                lineHeght: 24,
                                                color: darkModeEnabled ? '#fff' : '#000'
                                            }}>Использование в каршеринге</DefaultHeader>
                                        </View>
                                        <View
                                            style={{
                                                backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                                elevation: 3,
                                                paddingVertical: 6,
                                                paddingHorizontal: 12,
                                                borderRadius: 10,
                                                shadowOffset: { width: 1, height: 3 },
                                                shadowColor: '#000',
                                                shadowRadius: 5,
                                                shadowOpacity: 0.2
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center', marginBottom: 10 }}>
                                                <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                                <DefaultHeader >Не найдены сведения об использовании в каршеринге</DefaultHeader>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10, alignItems: 'center', marginBottom: 10 }}>
                                                <Image source={require('../../../../assets/icons/check-icon.png')} style={{ width: 15, height: 15, resizeMode: 'cover', marginRight: 10 }} />
                                                <DefaultHeader >Не найдено разрешение на работу в такси</DefaultHeader>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <DefaultHeader style={{
                                            fontSize: 20,
                                            lineHeght: 24,
                                            marginBottom: 10,
                                            paddingLeft: 25,
                                            color: darkModeEnabled ? '#fff' : '#000'
                                        }}>Пробег</DefaultHeader>
                                        <View
                                            style={{
                                                backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                                elevation: 3,
                                                padding: 12,
                                                borderRadius: 10,
                                                alignItems: 'center',
                                                shadowOffset: { width: 1, height: 3 },
                                                shadowColor: '#000',
                                                shadowRadius: 5,
                                                shadowOpacity: 0.2
                                            }}
                                        >
                                            <Image source={require('../../../../assets/mileage.png')} />
                                        </View>
                                    </View>
                                </>
                            }
                        </View>
                    </ScrollView>
                </View>
                {!fullReport &&
                    <TouchableOpacity activeOpacity={0.9}
                        style={{
                            alignItems: 'center',
                            backgroundColor: '#F5941E',
                            padding: 10,
                            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            width: '100%'
                        }}
                        onPress={() => setFullReport(true)}
                    >
                        <DefaultHeader style={{ fontSize: 20, lineHeght: 24, marginBottom: 5, color: '#002845' }}>Посмотреть полный отчёт</DefaultHeader>
                        <MediumText style={{ color: '#00284570' }}>Осталось 4 отчёта</MediumText>
                    </TouchableOpacity>
                }
            </ImageBackground>
        </SafeAreaView>
    )
}