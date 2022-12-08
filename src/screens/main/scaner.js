import { ImageBackground, SafeAreaView, View, Image } from "react-native";
import { DefaultHeader } from "../../components/default-header";

export const Scaner = ({ darkModeEnabled, currentBackground }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    width: '100%'
                }}>
                    <View style={{ backgroundColor:  darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845', padding: 16 }}>
                        <DefaultHeader style={{ fontSize: 24, lineHeght: 30, color: '#F5941E' }}>Сканер</DefaultHeader>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 }} source={darkModeEnabled ? require('../../../assets/icons/light-scan-bg.png') : require('../../../assets/icons/dark-scan-bg.png')} />
                        <DefaultHeader style={{ color:  darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#00000070' }}>Сканер не запущен</DefaultHeader>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}