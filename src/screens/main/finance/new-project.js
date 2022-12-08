import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, ImageBackground, TextInput, Image, TouchableOpacity, Platform } from "react-native";
import { DefaultHeader } from "../../../components/default-header";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from "react-native-dropdown-picker"
import Svg, { Path } from 'react-native-svg';

export const NewProject = ({ navigation, financeStatistic, handleSaveStatistic, darkModeEnabled, currentBackground }) => {
    const [image, setImage] = useState(null);

    const [expensesName, setExpensesName] = useState(null);
    const [expensesCost, setExpensesCost] = useState(null);

    const [openCategories, setOpenCategories] = useState(false);
    const [valueCategories, setValueCategories] = useState(null);
    const [categoriesFilter, setCategoriesFilter] = useState([
        { label: 'Автомобили (Мотоциклы)', value: 'auto' },
        { label: 'Электроника', value: 'electronic' },
        { label: 'Бытовая техника', value: 'technic' },
        { label: 'Товары для дома', value: 'home' },
        { label: 'Запчасти и аксессуары', value: 'accessories' }
    ]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: darkModeEnabled ? '#000' : '#fff' }}
            edges={['left', 'right']}
        >
            <ImageBackground source={darkModeEnabled ? currentBackground.path : ''} style={{ flex: 1, resizeMode: 'cover' }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                        width: '100%'
                    }}
                >
                    <KeyboardAvoidingView
                        style={{
                            height: Platform.OS === 'ios' ? '85%' : '75%',
                            width: '100%',
                        }}
                        behavior='position'
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        <View style={{ marginBottom: 6, width: '100%' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{ backgroundColor: darkModeEnabled ? 'rgba(0, 0, 0, 0.7)' : '#002845', flexDirection: 'row', alignItems: 'center', width: '100%', height: 71, paddingHorizontal: 6, marginBottom: 10 }}
                                onPress={() => navigation.goBack()}
                            >
                                <Image style={{ marginRight: 10 }} source={require('../../../../assets/icons/arrow-back-icon.png')} />
                                <DefaultHeader style={{ color: '#F5941E', fontSize: 24, lineHeght: 30 }}>Новый проект</DefaultHeader>
                            </TouchableOpacity>
                            <View style={{ width: '100%', paddingHorizontal: 6 }}>
                                <TouchableOpacity activeOpacity={0.9}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                        height: 179,
                                        borderRadius: 10,
                                        shadowOffset: { width: 1, height: 2 },
                                        shadowColor: '#00000080',
                                        shadowRadius: 3,
                                        shadowOpacity: 0.5,
                                        elevation: 2,
                                        marginBottom: 20
                                    }}
                                    onPress={pickImage}
                                >
                                    {image ?
                                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                        :
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <Svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M25.5643 10.625L25.5254 40.375" stroke={darkModeEnabled ? "#000" : "#002845"} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <Path d="M11 26H40.75" stroke={darkModeEnabled ? "#000" : "#002845"} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </Svg>
                                            <DefaultHeader style={{ fontSize: 20, lineHeght: 24 }}>Добавить фото</DefaultHeader>
                                        </View>
                                    }
                                </TouchableOpacity>
                                <TextInput
                                    placeholder='Название проекта'
                                    placeholderTextColor='#000'
                                    style={{
                                        paddingHorizontal: 10,
                                        height: 50,
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                        width: '100%',
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        shadowOffset: { width: 1, height: 2 },
                                        shadowColor: '#00000080',
                                        shadowRadius: 3,
                                        shadowOpacity: 0.5,
                                        elevation: 2,
                                        marginBottom: 20
                                    }}
                                    value={expensesName}
                                    onChangeText={setExpensesName}
                                />
                                <View style={{
                                    zIndex: 10,
                                    ...styles.selectContainer,
                                    marginBottom: 20
                                }}>
                                    <DropDownPicker
                                        listMode='SCROLLVIEW'
                                        placeholder='Выберите категорию'
                                        dropDownContainerStyle={{
                                            zIndex: 10000,
                                            borderWidth: 0,
                                        }}
                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                        style={{
                                            backgroundColor: openCategories ? '#fff' : (darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff'),
                                            borderWidth: 0
                                        }}
                                        open={openCategories}
                                        value={valueCategories}
                                        items={categoriesFilter}
                                        setOpen={setOpenCategories}
                                        setValue={setValueCategories}
                                        setItems={setCategoriesFilter}
                                    />
                                </View>
                                <TextInput
                                    placeholder='Стоимость покупки'
                                    placeholderTextColor='#000'
                                    style={{
                                        paddingHorizontal: 10,
                                        height: 50,
                                        backgroundColor: darkModeEnabled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                                        width: '100%',
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        shadowOffset: { width: 1, height: 2 },
                                        shadowColor: '#00000080',
                                        shadowRadius: 3,
                                        shadowOpacity: 0.5,
                                        elevation: 2,
                                        marginBottom: 20
                                    }}
                                    value={expensesCost}
                                    onChangeText={setExpensesCost}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={{
                                        backgroundColor: '#F5941E',
                                        borderRadius: 50,
                                        width: 273,
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                        marginBottom: 20,
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                    onPress={() => {
                                        handleSaveStatistic({
                                            id: financeStatistic.length + 1,
                                            sell: false,
                                            img: { uri: image },
                                            model: expensesName,
                                            price: expensesCost,
                                            reportExpenses: [
                                                {
                                                    selected: true,
                                                    name: 'Транспортные расходы',
                                                    list: []
                                                },
                                                {
                                                    selected: false,
                                                    name: 'Предпродажная подготовка',
                                                    list: []
                                                },
                                                {
                                                    selected: false,
                                                    name: 'Ремонт',
                                                    list: []
                                                }
                                            ],
                                            reportIncome: [

                                            ]
                                        })
                                        navigation.goBack();
                                    }}
                                >
                                    <DefaultHeader style={{
                                        fontSize: 20,
                                        lineHeght: 24,
                                        color: darkModeEnabled ? '#000' : '#002845'
                                    }}>Сохранить</DefaultHeader>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    selectContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#00000080',
        shadowRadius: 3,
        shadowOpacity: 0.5,
    }
})