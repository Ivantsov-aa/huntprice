import { View, ImageBackground, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { DefaultHeader } from "../../../components/default-header";

export const HistoryVin = ({ navigation, darkModeEnabled, currentBackground }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.8)' : '#002845', flexDirection: 'row', alignItems: 'center', width: '100%', padding: 16, marginBottom: 10, elevation: 10 }} onPress={() => navigation.goBack()}>
                        <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                        <DefaultHeader style={{ color: '#F5941E', fontSize: 24, lineHeght: 30 }}>История отчётов</DefaultHeader>
                    </TouchableOpacity>
                    <View>
                        <DefaultHeader style={{ fontSize: 20, lineHeght: 24, color: darkModeEnabled ? 'rgba(255, 255, 255, 0.6)' : '#00000070' }}>Отчетов запрошено не было</DefaultHeader>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}