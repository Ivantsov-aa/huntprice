import { ImageBackground, KeyboardAvoidingView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Keyboard } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { DefaultHeader } from '../components/default-header';
import { DefaultText } from '../components/default-text';
import Svg, { Path, G } from 'react-native-svg';

export const Authorization = ({ navigation, handleLogIn, darkModeEnabled, currentBackground }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    });

    const redirectToTelegram = () => {
        const url = 'http://t.me/+375297178709';
        Linking.openURL(url)
    }

    const onSubmit = data => {
        handleLogIn(data);
        Keyboard.dismiss();
    }

    return (
        <SafeAreaView
            style={{ ...styles.container, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
        >
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
                            flex: 1,
                            width: '100%'
                        }}
                        behavior='position'
                    >
                        <View style={{ alignItems: 'center', marginBottom: 50 }}>
                            <Image source={darkModeEnabled ? require('../../assets/dark-mode-logo.png') : require('../../assets/logo.png')} style={{ marginBottom: 20, height: 200, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'Logo-Font', fontSize: 40, lineHeight: 72, color: darkModeEnabled ? '#fff' : '#002845', marginBottom: 30 }}>HUNT <Text style={{ color: '#F5941E' }}>PRICE</Text></Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='?????????????? ??????????'
                                    />
                                )}
                                name="login"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='?????????????? ????????????'
                                    />
                                )}
                                name="password"
                            />

                            <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit(onSubmit)}>
                                <View style={styles.buttonContainerLogIn}>
                                    <DefaultHeader style={styles.buttonLogIn}>??????????</DefaultHeader>
                                </View>
                            </TouchableOpacity>
                            <DefaultText style={{ marginBottom: 10, fontSize: 12, lineHeight: 15, color: darkModeEnabled ? '#fff' : '#002845' }}>?????? ?????? ?????????????????</DefaultText>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Verification')}>
                                <View style={styles.buttonContainerLogOut} onPress={handleSubmit(onSubmit)}>
                                    <DefaultHeader style={styles.buttonLogOut}>????????????????????????????????????</DefaultHeader>
                                </View>
                            </TouchableOpacity >
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <DefaultHeader style={{ fontSize: 16, lineHeght: 20, marginBottom: 15, color: darkModeEnabled ? '#fff' : '#002845' }}>??????????????????</DefaultHeader>
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
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        fontFamily: 'Inter-Regular',
        height: 40,
        width: 332,
        borderRadius: 8,
        paddingLeft: 18,
        fontSize: 13,
        lineHeight: 16,
        marginBottom: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 2
    },
    buttonContainerLogIn: {
        width: 150,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#002845',
        paddingTop: 10,
        marginVertical: 30
    },
    buttonLogIn: {
        color: '#F5941E',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600'
    },
    buttonContainerLogOut: {
        width: 250,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#F5941E',
        paddingTop: 10
    },
    buttonLogOut: {
        color: '#002845',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600'
    }
});