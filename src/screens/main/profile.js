import { useEffect, useState, useRef } from "react"
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, Switch, Linking, Platform, ImageBackground, Animated, ScrollView } from "react-native"
import { DefaultHeader } from "../../components/default-header"
import { MediumText } from "../../components/medium-text"
import Svg, { Path, G } from 'react-native-svg';
import { store } from '../../store/store';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from "react-native-safe-area-context";

export const Profile = ({ navigation, darkModeEnabled, setDarkModeEnabled, authUser, backgroundPictures, currentBackground, setCurrentBackground, handleLogOut }) => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [currentRate, setCurrentRate] = useState(null);
    const [chosenBackground, setChosenBackground] = useState(null);

    const animationValue = useRef(new Animated.Value(1500)).current;

    const width = Dimensions.get('window').width;

    useEffect(() => {
        store.rates.map(rate => (
            authUser.rate === rate.id && setCurrentRate(rate)
        ))
    }, [])

    const redirectToTelegram = () => {
        const url = 'http://t.me/+375297178709';
        Linking.openURL(url)
    }

    const startAnimate = value => {
        Animated.timing(animationValue, { toValue: value ? 0 : 1500, useNativeDriver: true }).start();
    }

    const handleBackgroundChoice = () => {
        startAnimate(false);
        setCurrentBackground(chosenBackground !== null ? backgroundPictures[chosenBackground] : currentBackground);
    }

    return (
        currentRate &&
        <SafeAreaView
            style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['left', 'top', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{ flex: 1, backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff' }}>
                    <View style={{ padding: 16 }}>
                        <DefaultHeader style={{ fontSize: 24, lineHeght: 30, color: darkModeEnabled ? '#fff' : '#002845' }}>Профиль</DefaultHeader>
                    </View>
                    <View style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845', paddingHorizontal: 29, paddingVertical: 7, marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/default-photo.png')} style={{ marginRight: 18, height: 70, width: 70, resizeMode: 'contain' }} />
                            <DefaultHeader style={{ color: '#F5941E', fontSize: 26, lineHeght: 31, width: '90%' }}>{authUser.name}</DefaultHeader>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={{
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#F5941E',
                                        borderRadius: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 11,
                                        paddingVertical: 9
                                    }}
                                    onPress={() => navigation.navigate('ProfileEditor')}
                                >
                                    <DefaultHeader style={{ fontSize: 14, lineHeght: 8 }}>Редактировать профиль</DefaultHeader>
                                    <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M3.73543 14.8079L6.387 14.8079L16.1097 5.08523L13.4581 2.43359L3.73535 12.1563L3.73543 14.8079Z" stroke="#002845" strokeWidth="2" stroke-linejoin="round" />
                                        <Path d="M9.73511 1.871L12.3868 4.52266" stroke="#002845" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingHorizontal: 6 }}>
                                <DefaultHeader style={{ paddingHorizontal: 15, fontSize: 14, lineHeght: 17, marginBottom: 6, color: darkModeEnabled ? '#fff' : '#002845' }}>Подписки</DefaultHeader>
                                <TouchableOpacity activeOpacity={0.9} style={{
                                    ...styles.block,
                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                }}
                                    onPress={() => navigation.navigate('RatesList')}
                                >
                                    <DefaultHeader style={{ fontSize: 16, lineHeght: 20 }}>{currentRate.name}</DefaultHeader>
                                    <MediumText>Подписка оплачена до 2 мая 2022</MediumText>
                                    <DefaultHeader style={{ color: darkModeEnabled ? '#000' : '#F5941E', alignSelf: 'flex-end' }}>Подробнее</DefaultHeader>
                                </TouchableOpacity>
                                <DefaultHeader style={{ paddingHorizontal: 15, fontSize: 14, lineHeght: 17, marginBottom: 6, color: darkModeEnabled ? '#fff' : '#002845' }}>Настройки</DefaultHeader>
                                <View style={{
                                    ...styles.block,
                                    marginBottom: 45,
                                    backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff',
                                    paddingBottom: darkModeEnabled ? 25 : 0
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Platform.OS === 'ios' ? 10 : 0 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={require('../../../assets/icons/push-notifications-icon.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                                            <DefaultHeader>Push-уведомления</DefaultHeader>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: darkModeEnabled ? '#000' : "#002845" }}
                                            thumbColor={pushEnabled ? "#F5941E" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => setPushEnabled(!pushEnabled)}
                                            value={pushEnabled}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={require('../../../assets/icons/theme-mode-icon.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                                            <DefaultHeader>Тёмная тема</DefaultHeader>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: darkModeEnabled ? '#000' : "#002845" }}
                                            thumbColor={darkModeEnabled ? "#F5941E" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
                                            value={darkModeEnabled}
                                        />
                                    </View>
                                    {darkModeEnabled &&
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                                            onPress={() => startAnimate(true)}
                                        >
                                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M15.2858 6.32125C15.8068 7.06846 16.1734 7.93134 16.3394 8.86363H18.3333V11.1364H16.3394C16.1734 12.0687 15.8068 12.9315 15.2858 13.6788L16.696 15.089L15.089 16.6961L13.6787 15.2858C12.9315 15.8068 12.0686 16.1735 11.1363 16.3395V18.3333H8.86358V16.3395C7.93129 16.1735 7.06842 15.8068 6.32121 15.2858L4.91092 16.6961L3.30387 15.089L4.71413 13.6788C4.19313 12.9315 3.82651 12.0687 3.66051 11.1364H1.66663V8.86363H3.66051C3.82651 7.93134 4.19313 7.06846 4.71413 6.32125L3.30387 4.91096L4.91092 3.30392L6.32121 4.71417C7.06842 4.19317 7.93129 3.82655 8.86358 3.66056V1.66667H11.1363V3.66056C12.0686 3.82655 12.9315 4.19317 13.6787 4.71417L15.089 3.30392L16.696 4.91096L15.2858 6.32125Z" stroke="black" strokeWidth="2" stroke-linejoin="round" />
                                                <Path d="M9.99996 12.0833C11.1505 12.0833 12.0833 11.1506 12.0833 10C12.0833 8.84942 11.1505 7.91667 9.99996 7.91667C8.84938 7.91667 7.91663 8.84942 7.91663 10C7.91663 11.1506 8.84938 12.0833 9.99996 12.0833Z" stroke="black" strokeWidth="2" stroke-linejoin="round" />
                                            </Svg>
                                            <DefaultHeader style={{ marginLeft: 10 }}>Настройки внешнего вида</DefaultHeader>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={{
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#F5941E',
                                        borderRadius: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 85,
                                        paddingVertical: 10
                                    }}
                                    onPress={handleLogOut}
                                >
                                    <DefaultHeader style={{ fontSize: 14, lineHeght: 17, color: darkModeEnabled ? '#000' : '#002845' }}>Выйти из аккаунта</DefaultHeader>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <DefaultHeader style={{ fontSize: 16, lineHeght: 20, marginBottom: 15, color: darkModeEnabled ? '#fff' : '#002845' }}>Поддержка</DefaultHeader>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity activeOpacity={0.9} style={{ height: 40, width: 40, alignItems: 'center', paddingTop: 4, marginRight: 25 }} onPress={redirectToTelegram}>
                                    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M27.6129 4.87266C27.6129 4.87266 30.2031 3.86266 29.9872 6.31552C29.9153 7.32553 29.2677 10.8605 28.7641 14.6841L27.0373 26.0106C27.0373 26.0106 26.8934 27.6699 25.5983 27.9585C24.3031 28.247 22.3605 26.9485 22.0007 26.6599C21.7129 26.4435 16.6045 23.197 14.8057 21.6099C14.3021 21.177 13.7265 20.3113 14.8777 19.3013L22.4325 12.087C23.2959 11.2213 24.1593 9.20127 20.5617 11.6541L10.4887 18.5077C10.4887 18.5077 9.33753 19.2291 7.17907 18.5799L2.50228 17.137C2.50228 17.137 0.775474 16.0549 3.72543 14.9727C10.9205 11.5819 19.7703 8.11907 27.6129 4.87266Z" fill="#14AAFE" />
                                    </Svg>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9}>
                                    <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
                                        <G fill="none" fill-rule="evenodd">
                                            <Path fill="#ffda3e" d="M56 402.667h400V109.333H56z" />
                                            <Path fill="#fc0" d="M256 182.667l-200 220h400z" />
                                            <Path d="M456 109.333L276.848 284.116c-11.675 11.4-30.02 11.4-41.696 0L56 109.333h400z" fill="#f33" />
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    <Animated.View style={{
                        height: 450,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0, 0.95)',
                        position: 'absolute',
                        alignItems: 'center',
                        bottom: 0,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        zIndex: 5,
                        paddingVertical: 10,
                        transform: [
                            { translateY: animationValue }
                        ]
                    }}>
                        <Carousel
                            loop
                            mode='parallax'
                            width={width}
                            height='300'
                            defaultIndex={+currentBackground.id - 1}
                            data={backgroundPictures}
                            scrollAnimationDuration={500}
                            onSnapToItem={(index) => setChosenBackground(index)}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        borderRadius: 20,
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        width: '100%'
                                    }}
                                >
                                    <Image style={{ borderRadius: 20, width: '100%', height: '100%', resizeMode: 'cover' }} source={item.path} key={index} />
                                </View>
                            )}
                        />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ marginTop: 20, width: 176, height: 38, backgroundColor: '#F5941E', alignItems: 'center', borderRadius: 20, marginBottom: 15, paddingTop: 9 }}
                            onPress={handleBackgroundChoice}
                        >
                            <DefaultHeader style={{ fontSize: 16, lineHeght: 20 }}>Принять</DefaultHeader>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ width: 127, height: 38, backgroundColor: 'rgba(255, 255, 255, 0.6)', alignItems: 'center', borderRadius: 20, paddingTop: 9 }}
                            onPress={() => startAnimate(false)}
                        >
                            <DefaultHeader style={{ fontSize: 16, lineHeght: 20 }}>Отмена</DefaultHeader>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    block: {
        elevation: 2,
        marginBottom: 20,
        borderRadius: 12,
        padding: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2
    },
    input: {
        fontFamily: 'Inter-Regular',
        height: 50,
        width: '100%',
        borderRadius: 8,
        paddingLeft: 18,
        fontSize: 13,
        lineHeight: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 2
    }
})