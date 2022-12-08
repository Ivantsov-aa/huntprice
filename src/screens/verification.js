import { SafeAreaView, TouchableOpacity, Image, Text, ImageBackground, View, KeyboardAvoidingView } from "react-native"
import { DefaultHeader } from "../components/default-header"
import PhoneInput from 'react-native-phone-input'
import { useState } from "react"

export const Verification = ({ navigation, darkModeEnabled, currentBackground }) => {
    const [phoneValue, setPhoneValue] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover', width: '100%' }}>
                <View style={{
                    flex: 1,
                    paddingTop: darkModeEnabled ? (Platform.OS === 'ios' ? 0 : 40) : 0,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <KeyboardAvoidingView
                        style={{
                            alignItems: 'center',
                            paddingHorizontal: 6,
                            width: '100%',
                            flex: 1
                        }}
                        behavior='position'
                    >
                        <Image source={darkModeEnabled ? require('../../assets/dark-mode-logo.png') : require('../../assets/logo.png')} style={{ marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', width: 200, height: 200 }} />
                        <Text style={{ fontFamily: 'Logo-Font', fontSize: 40, lineHeight: 72, color: darkModeEnabled ? '#fff' : '#002845', marginLeft: 'auto', marginRight: 'auto', marginBottom: 30 }}>HUNT <Text style={{ color: '#F5941E' }}>PRICE</Text></Text>

                        <DefaultHeader style={{
                            fontSize: 16,
                            lineHeight: 19,
                            paddingLeft: 5,
                            marginBottom: 20,
                            textAlign: 'center',
                            color: darkModeEnabled ? '#fff' : '#002845'
                        }}>Введите Ваш номер телефона для подтверджения</DefaultHeader>
                        <PhoneInput
                            style={{
                                backgroundColor: '#fff',
                                width: '100%',
                                height: 50,
                                elevation: 2,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                borderWidth: 0,
                                shadowOffset: { width: 1, height: 2 },
                                shadowColor: '#000',
                                shadowRadius: 1,
                                shadowOpacity: 0.2,
                                marginBottom: 20
                            }}
                            initialCountry='ru'
                            autoFormat
                            onChangePhoneNumber={setPhoneValue}
                        />
                        <TouchableOpacity activeOpacity={0.9} style={{
                            width: 250,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: '#F5941E',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            paddingTop: 10
                        }}
                            onPress={() => navigation.navigate('VerificationCode', { phoneValue })}
                        >
                            <DefaultHeader style={{
                                color: '#002845',
                                textAlign: 'center',
                                fontSize: 16,
                                lineHeight: 20,
                                fontWeight: '600'
                            }}>
                                Получить код
                            </DefaultHeader>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}