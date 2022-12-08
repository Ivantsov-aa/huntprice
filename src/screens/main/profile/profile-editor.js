import { useForm, Controller } from "react-hook-form";
import { StyleSheet, KeyboardAvoidingView, TextInput, View, Image, TouchableOpacity, Platform, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultHeader } from "../../../components/default-header";

export const ProfileEditor = ({ navigation, authUser, darkModeEnabled, currentBackground }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phoneNumber: '',
            name: '',
            login: '',
            password: '',
            repeatPassword: ''
        }
    });

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['left', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{
                flex: 1,
                resizeMode: 'cover'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                    width: '100%'
                }}>
                    <KeyboardAvoidingView
                        style={{
                            height: Platform.OS === 'ios' ? '75%' : '67%',
                            width: '100%',
                        }}
                        behavior='position'
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                padding: 16,
                                backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.5)' : '#002845',
                                marginBottom: 20,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            activeOpacity={0.9}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('../../../../assets/icons/arrow-back-icon.png')} style={{ marginRight: 10 }} />
                            <DefaultHeader style={{ fontSize: 24, lineHeght: 29, color: '#F5941E' }}>Редактировать профиль</DefaultHeader>
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 6, width: '100%' }}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <TextInput
                                        style={{ ...styles.input, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff' }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        defaultValue={authUser.number}
                                        placeholder='Введите номер'
                                    />
                                )}
                                name="phoneNumber"
                            />
                            {/* {errors.firstName && <Text>This is required.</Text>} */}

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <TextInput
                                        style={{ ...styles.input, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff' }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        defaultValue={authUser.name}
                                        placeholder='Введите имя'
                                    />
                                )}
                                name="name"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <TextInput
                                        style={{ ...styles.input, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff' }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        defaultValue={authUser.login}
                                        placeholder='Придумайте логин'
                                    />
                                )}
                                name="login"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <TextInput
                                        style={{ ...styles.input, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff' }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        defaultValue={authUser.password}
                                        placeholder='Введите пароль'
                                    />
                                )}
                                name="password"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <TextInput
                                        style={{ ...styles.input, marginBottom: 50, backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff' }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        defaultValue={authUser.password}
                                        placeholder='Повторите пароль'
                                    />
                                )}
                                name="repeatPassword"
                            />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: '#F5941E', width: 273, borderRadius: 50, paddingVertical: 14, alignItems: 'center' }} activeOpacity={0.9}>
                            <DefaultHeader style={{ fontSize: 16, lineHeght: 19, color: darkModeEnabled ? '#000' : '#002845' }}>Принять</DefaultHeader>
                        </TouchableOpacity >
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </SafeAreaView>
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
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#00000080',
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 2,
    }
})