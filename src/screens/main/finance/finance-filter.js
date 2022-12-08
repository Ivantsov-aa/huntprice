import { ImageBackground, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultHeader } from "../../../components/default-header";

export const FinanceFilter = ({ navigation, darkModeEnabled, currentBackground }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={['left', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff'
                    }}
                >
                    <View style={{ backgroundColor: darkModeEnabled ? '#rgba(0, 0, 0, 0.5)' : '#002845', height: 71, paddingHorizontal: 6, paddingVertical: 20, marginBottom: 25, alignItems: 'flex-start' }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }} onPress={() => navigation.goBack()}>
                            <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                            <DefaultHeader style={{ color: darkModeEnabled ? '#fff' : '#F5941E', fontSize: 24, lineHeght: 30 }}>Фильтры</DefaultHeader>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}