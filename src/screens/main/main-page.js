import { useState, useEffect, useRef } from "react"
import { ImageBackground, View, ScrollView, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native"
import { DefaultHeader } from "../../components/default-header"
import { DefaultSubheader } from "../../components/default-subheader";
import { DefaultText } from "../../components/default-text"
import { MediumText } from "../../components/medium-text";
import { store } from '../../store/store';
import Svg, { Path } from 'react-native-svg';

export const MainPage = ({ navigation, darkModeEnabled, currentBackground }) => {
    const [currentCategory, setCurrentCategory] = useState(1);
    const [dimensions, setDimensions] = useState({ window });
    const [listMode, setListMode] = useState('list');
    const [mainBar, selectCategory] = useState([
        {
            id: 1,
            selected: true,
            value: 'Авто'
        },
        {
            id: 2,
            selected: false,
            value: 'Мото'
        },
        {
            id: 3,
            selected: false,
            value: 'Грузовое авто'
        },
        {
            id: 4,
            selected: false,
            value: 'Запчасти'
        },
        {
            id: 5,
            selected: false,
            value: 'Электроника'
        },
        {
            id: 6,
            selected: false,
            value: 'Для дома'
        },
        {
            id: 7,
            selected: false,
            value: 'Бытовая техника'
        }
    ])

    useEffect(() => {
        const windowHeight = Dimensions.get('window').height;
        setDimensions(windowHeight);
    }, []);

    const handleCategoryClick = (id) => {
        const clickCategory = mainBar.map(bar => (
            bar.id === id ? { ...bar, selected: true } : { ...bar, selected: false }
        ))

        selectCategory(clickCategory);
        setCurrentCategory(id);
    }

    return (
        <>
            <SafeAreaView style={{ ...styles.container, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
                <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: 'Logo-Font', fontSize: 22, lineHeight: 48, color: darkModeEnabled ? '#F5941E' : '#002845' }}>HUNT</Text>
                            <Image source={darkModeEnabled ? require('../../../assets/dark-mode-logo.png') : require('../../../assets/logo.png')} style={{ height: 48, width: 48, marginVertical: 10 }} />
                            <Text style={{ fontFamily: 'Logo-Font', fontSize: 22, lineHeight: 48, color: darkModeEnabled ? '#F5941E' : '#002845' }}>PRICE</Text>
                        </View>
                        <View style={{
                            height: 54,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            padding: 10,
                            backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845',
                            elevation: 5,
                            shadowOffset: { width: 1, height: 2 },
                            shadowColor: '#000',
                            shadowRadius: 1,
                            shadowOpacity: 0.2
                        }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {mainBar.map(bar => (
                                    <TouchableOpacity activeOpacity={0.9} style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 10,
                                        borderRadius: 50,
                                        backgroundColor: bar.selected ? '#F5941E' : 'transparent'
                                    }} onPress={() => handleCategoryClick(bar.id)} key={bar.id}>
                                        {bar.selected ?
                                            <DefaultHeader style={{ fontSize: 14, lineHeight: 16, color: darkModeEnabled ? '#000' : '#002845' }}>{bar.value}</DefaultHeader>
                                            :
                                            <DefaultSubheader style={{ ...styles.barTrack, color: darkModeEnabled ? '#fff' : '#F5941E' }}>{bar.value}</DefaultSubheader>
                                        }
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{
                            width: '100%',
                            backgroundColor: darkModeEnabled ? 'transparent' : '#fff'
                        }}>
                            <View style={styles.filters}>
                                <TouchableOpacity activeOpacity={0.9} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#F5941E',
                                    paddingHorizontal: 10,
                                    paddingVertical: 7,
                                    borderRadius: 10
                                }} onPress={() => navigation.navigate('MainFilter')}>
                                    <Svg style={{ marginRight: 8 }} width="15" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 0.555556C8.33333 0.25 8.08333 0 7.77778 0H0.555556C0.25 0 0 0.25 0 0.555556C0 0.711111 0.0611111 0.85 0.161111 0.95L2.77778 3.56111V8.33333C2.77778 8.63889 3.02778 8.88889 3.33333 8.88889C3.48889 8.88889 3.62778 8.82778 3.72778 8.72778L5.39444 7.06111C5.49444 6.96111 5.55556 6.82222 5.55556 6.66667V3.56111L8.17222 0.944445C8.27222 0.85 8.33333 0.711111 8.33333 0.555556ZM6.11111 5C6.11111 5.30556 6.36111 5.55556 6.66667 5.55556H10.5556C10.8611 5.55556 11.1111 5.30556 11.1111 5C11.1111 4.69444 10.8611 4.44444 10.5556 4.44444H6.66667C6.36111 4.44444 6.11111 4.69444 6.11111 5ZM10.5556 8.88889H6.66667C6.36111 8.88889 6.11111 9.13889 6.11111 9.44444C6.11111 9.75 6.36111 10 6.66667 10H10.5556C10.8611 10 11.1111 9.75 11.1111 9.44444C11.1111 9.13889 10.8611 8.88889 10.5556 8.88889ZM10.5556 6.66667H6.66667C6.36111 6.66667 6.11111 6.91667 6.11111 7.22222C6.11111 7.52778 6.36111 7.77778 6.66667 7.77778H10.5556C10.8611 7.77778 11.1111 7.52778 11.1111 7.22222C11.1111 6.91667 10.8611 6.66667 10.5556 6.66667Z" fill={darkModeEnabled ? "#000" : "#002845"} />
                                    </Svg>
                                    <DefaultHeader style={{ fontSize: 14, lineHeight: 18, color: darkModeEnabled ? '#000' : '#002845' }}>Фильтры</DefaultHeader>
                                </TouchableOpacity>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }} onPress={() => setListMode('list')}>
                                        <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M3.5 3.5V24.5H24.5" stroke={listMode === 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M10.5 19.8333H8.16666" stroke={listMode === 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.1667 15.1667H8.16666" stroke={listMode === 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M24.5 10.5H8.16666" stroke={listMode === 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M19.8333 5.83334H8.16666" stroke={listMode === 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => setListMode('icon')}>
                                        <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M10.5 3.5H4.66667C4.02233 3.5 3.5 4.02233 3.5 4.66667V10.5C3.5 11.1443 4.02233 11.6667 4.66667 11.6667H10.5C11.1443 11.6667 11.6667 11.1443 11.6667 10.5V4.66667C11.6667 4.02233 11.1443 3.5 10.5 3.5Z" stroke={listMode !== 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linejoin="round" />
                                            <Path d="M10.5 16.3333H4.66667C4.02233 16.3333 3.5 16.8557 3.5 17.5V23.3333C3.5 23.9777 4.02233 24.5 4.66667 24.5H10.5C11.1443 24.5 11.6667 23.9777 11.6667 23.3333V17.5C11.6667 16.8557 11.1443 16.3333 10.5 16.3333Z" stroke={listMode !== 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linejoin="round" />
                                            <Path d="M23.3333 3.5H17.5C16.8557 3.5 16.3333 4.02233 16.3333 4.66667V10.5C16.3333 11.1443 16.8557 11.6667 17.5 11.6667H23.3333C23.9777 11.6667 24.5 11.1443 24.5 10.5V4.66667C24.5 4.02233 23.9777 3.5 23.3333 3.5Z" stroke={listMode !== 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linejoin="round" />
                                            <Path d="M23.3333 16.3333H17.5C16.8557 16.3333 16.3333 16.8557 16.3333 17.5V23.3333C16.3333 23.9777 16.8557 24.5 17.5 24.5H23.3333C23.9777 24.5 24.5 23.9777 24.5 23.3333V17.5C24.5 16.8557 23.9777 16.3333 23.3333 16.3333Z" stroke={listMode !== 'list' ? "#F5941E" : (darkModeEnabled ? '#fff' : '#002845')} strokeWidth="2.33333" stroke-linejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 6, paddingBottom: 30 }}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={
                                        listMode === 'icon' ? {
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-around',
                                            shadowOffset: { width: 1, height: 2 },
                                            shadowColor: '#000',
                                            shadowRadius: 1,
                                            shadowOpacity: 0.2,
                                            paddingBottom: 190
                                        }
                                            :
                                            {
                                                paddingBottom: 190
                                            }
                                    }>
                                        {store.categories.map(cat => (
                                            cat.id === currentCategory && cat.list.map((item, i) => (
                                                <View style={
                                                    listMode === 'list' ? { ...styles.listMode, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff' } : { ...styles.iconMode, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#fff' }
                                                }
                                                    key={i}
                                                >
                                                    <View style={listMode === 'icon' && { padding: 6, width: '100%', alignItems: 'flex-start' }}>
                                                        <DefaultHeader style={{ fontSize: 16, lineHeight: 19, marginBottom: 6, color: darkModeEnabled ? '#000' : '#002845', textTransform: 'uppercase' }} key={i}>{item.model}</DefaultHeader>
                                                        <DefaultHeader style={{ color: darkModeEnabled ? '#000' : '#F5941E', fontSize: 12, lineHeight: 15, marginBottom: 6 }}>{item.price}</DefaultHeader>
                                                        {listMode === 'list' ?
                                                            <View style={{ width: listMode === 'list' ? 220 : '100%', flexDirection: 'row', marginBottom: 6, alignItems: listMode === 'list' ? 'center' : 'flex-start', justifyContent: 'flex-start' }}>
                                                                <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}>{item.engine} - </MediumText>
                                                                <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}> {item.year} - </MediumText>
                                                                <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}> {item.kilometers} - </MediumText>
                                                                <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}> {item.transmission}</MediumText>
                                                            </View>
                                                            :
                                                            <>
                                                                <View style={{ width: listMode === 'list' ? 220 : '100%', flexDirection: 'row', alignItems: listMode === 'list' ? 'center' : 'flex-start', justifyContent: 'flex-start' }}>
                                                                    <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}>{item.engine} - </MediumText>
                                                                    <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}> {item.year} - </MediumText>
                                                                    <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845' }}> {item.kilometers}</MediumText>
                                                                </View>
                                                                <MediumText style={{ fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#000' : '#002845', marginBottom: 6 }}>{item.transmission}</MediumText>
                                                            </>
                                                        }
                                                        <DefaultText style={{ fontSize: 10, lineHeight: 12, color: darkModeEnabled ? '#000' : '#002845' }}>{item.region}</DefaultText>
                                                        <DefaultText style={{ fontSize: 10, lineHeight: 12, color: darkModeEnabled ? '#000' : '#002845', marginBottom: 6 }}>{item.date}</DefaultText>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: listMode === 'list' ? 220 : '100%' }}>
                                                            <DefaultHeader style={{ fontSize: 12, lineHeight: 14, color: darkModeEnabled ? '#000' : '#002845' }}>Просмотров: <DefaultText>{item.views}</DefaultText></DefaultHeader>
                                                            <DefaultHeader style={{ fontSize: 14, lineHeight: 16, color: '#2146C7' }}>{item.resource}</DefaultHeader>
                                                        </View>
                                                    </View>
                                                    <Image source={item.img} resizeMode={listMode === 'list' ? 'stretch' : 'cover'} style={{ width: listMode === 'list' ? 120 : '100%', height: listMode === 'list' ? 110 : 100, borderRadius: listMode === 'list' ? 12 : 0, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#fff' }} />
                                                </View>
                                            ))
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    barTrack: {
        fontSize: 14,
        lineHeight: 16
    },
    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 8
    },
    listMode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 1,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2
    },
    iconMode: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 12,
        marginBottom: 8,
        elevation: 1,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        maxWidth: 180
    },
    labelSelect: {
        fontSize: 16,
        lineHeight: 19,
        paddingLeft: 5,
        marginBottom: 12
    },
    selectContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
    },
    inputRange: {
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#F5F5F5',
        width: '48%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 2
    },
    radioBtn: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        marginHorizontal: 0,
        marginVertical: 0,
        height: 50,
        backgroundColor: '#F5F5F5',
        width: '28%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 2
    }
})