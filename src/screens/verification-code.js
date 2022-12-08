import { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Animated, Easing, ImageBackground, KeyboardAvoidingView } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { DefaultHeader } from '../components/default-header';
import { DefaultText } from '../components/default-text';
import { MediumText } from '../components/medium-text';

const CELL_COUNT = 4;

export const VerificationCode = ({ route, darkModeEnabled, currentBackground, navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propsCell, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const [verificationCode, setVerificationCode] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        generateCode();
    }, [])

    const animate_state = {
        start: 0,
        end: 15
    }

    const valueAnimation = useRef(new Animated.Value(animate_state.start)).current

    const startAnimate = value => {
        Animated.timing(valueAnimation, { toValue: value ? animate_state.end : animate_state.start, useNativeDriver: false, duration: 300, easing: Easing.exp }).start()
    }

    const inputRange = Object.values(animate_state)
    const heightError = valueAnimation.interpolate({ inputRange, outputRange: [0, 15] })


    const generateCode = () => {
        const min = 1000;
        const max = 9999;
        const random = min + (Math.random() * (max - min));
        const code = Math.round(random);
        setVerificationCode(code);
    }

    const handleVerificationCode = () => {
        if (+value === verificationCode) {
            navigation.navigate('Registration', route.params.phoneValue);
        } else {
            startAnimate(true);
            setError(true);
        }
    }

    return (
        <SafeAreaView style={{ ...styles.root, alignItems: 'center', backgroundColor: darkModeEnabled ? '#000' : '#fff' }}>
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
                        <Image source={darkModeEnabled ? require('../../assets/dark-mode-logo.png') : require('../../assets/logo.png')} style={{ marginBottom: 20, width: 200, marginLeft: 'auto', marginRight: 'auto', height: 200 }} />
                        <Text style={{ fontFamily: 'Logo-Font', fontSize: 40, lineHeight: 72, color: darkModeEnabled ? '#fff' : '#002845', marginBottom: 30 }}>HUNT <Text style={{ color: '#F5941E' }}>PRICE</Text></Text>
                        <DefaultHeader style={{ ...styles.title, color: darkModeEnabled ? '#fff' : '#002845' }}>Введите код</DefaultHeader>
                        <DefaultText style={{ marginLeft: 'auto', marginRight: 'auto', color:  darkModeEnabled ? '#fff' : '#002845' }}>{verificationCode}</DefaultText>
                        <CodeField
                            ref={ref}
                            {...propsCell}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    onLayout={getCellOnLayoutHandler(index)}
                                    key={index}
                                    style={[styles.cellRoot, isFocused && { ...styles.focusCell, color: darkModeEnabled ? '#F5941E' : '#002845' }]}>
                                    <MediumText style={{ ...styles.cellText, color: darkModeEnabled ? '#F5941E' : '#002845' }}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </MediumText>
                                </View>
                            )}
                        />
                        <Animated.View
                            style={{
                                width: 280,
                                height: heightError,
                                marginBottom: 40
                            }}
                        >
                            <MediumText style={{ textAlign: 'left', color: 'red', fontSize: 12, lineHeight: 15 }} >* код введён неправильно</MediumText>
                        </Animated.View>
                        {error ?
                            <TouchableOpacity activeOpacity={0.9}
                                style={{
                                    width: 250,
                                    height: 40,
                                    borderRadius: 50,
                                    backgroundColor: '#F5941E',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    paddingTop: 10
                                }}
                                onPress={() => {
                                    setError(false);
                                    setValue('');
                                    generateCode();
                                    startAnimate(false);
                                }}
                            >
                                <DefaultHeader
                                    style={{
                                        color: '#002845',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        lineHeight: 20,
                                        fontWeight: '600'
                                    }}
                                >
                                    Отправить ещё раз
                                </DefaultHeader>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.9}
                                style={{
                                    width: 250,
                                    height: 40,
                                    borderRadius: 50,
                                    backgroundColor: '#F5941E',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    paddingTop: 10
                                }}
                                onPress={handleVerificationCode}
                            >
                                <DefaultHeader
                                    style={{
                                        color: '#002845',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        lineHeight: 20,
                                        fontWeight: '600'
                                    }}
                                >
                                    Далее
                                </DefaultHeader>
                            </TouchableOpacity>
                        }
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        minHeight: 300,
        backgroundColor: '#fff',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 24
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 280
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    cellText: {
        fontSize: 36,
        textAlign: 'center'
    },
    focusCell: {
        borderBottomWidth: 2
    },
});