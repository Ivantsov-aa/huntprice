import { useState, useEffect } from "react"
import { ImageBackground, View, ScrollView, Image, StyleSheet, TouchableOpacity, Platform, TextInput } from "react-native"
import { DefaultHeader } from "../../../components/default-header";
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const MainFilter = ({ navigation, listAuto = [], darkModeEnabled, currentBackground }) => {

    const [openCategories, setOpenCategories] = useState(false);
    const [valueCategories, setValueCategories] = useState(null);
    const [categoriesFilter, setCategoriesFilter] = useState([
        { label: 'Автомобили (Мотоциклы)', value: 'auto' },
        { label: 'Электроника', value: 'electronic' },
        { label: 'Бытовая техника', value: 'technic' },
        { label: 'Товары для дома', value: 'home' },
        { label: 'Запчасти и аксессуары', value: 'accessories' }
    ]);

    // <-- Авто(Мото) -->
    const [openBrandAuto, setOpenBrandAuto] = useState(false);
    const [valueBrandAuto, setValueBrandAuto] = useState(null);
    const [brandAutoList, setBrandAutoList] = useState([[]]);

    const [openModelsAuto, setOpenModelsAuto] = useState(false);
    const [valueModelsAuto, setValueModelsAuto] = useState(null);
    const [modelsAuto, setModelsAuto] = useState(null);

    const [openTransmission, setOpenTransmission] = useState(false);
    const [valueTransmission, setValueTransmission] = useState(null);
    const [transmission, setTransmission] = useState([
        { label: 'Автомат', value: 'automat' },
        { label: 'Механика', value: 'mechanic' }
    ]);

    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1',
            label: 'Все',
            value: 'all',
            containerStyle: { ...styles.radioBtn, backgroundColor: darkModeEnabled ? '#ffffff95' : '#fff' },
            borderColor: '#002845',
            color: '#F5941E',
            size: 20,
            selected: true
        },
        {
            id: '2',
            label: 'Не битые',
            value: 'unbeaten',
            containerStyle: { ...styles.radioBtn, backgroundColor: darkModeEnabled ? '#ffffff95' : '#fff' },
            borderColor: '#002845',
            color: '#F5941E',
            size: 20
        },
        {
            id: '3',
            label: 'Битые',
            value: 'beaten',
            containerStyle: { ...styles.radioBtn, backgroundColor: darkModeEnabled ? '#ffffff95' : '#fff' },
            borderColor: '#002845',
            color: '#F5941E',
            size: 20
        }
    ])
    // <-- Авто(Мото) -->

    // <-- Запчасти -->

    const [openSparesCategory, setOpenSparesCategory] = useState(false);
    const [valueSparesCategory, setValueSparesCategory] = useState(null);
    const [sparesCategory, setSparesCategory] = useState([
        { label: 'Шины, диски и колеса', value: 'wheels' },
        { label: 'Запчасти', value: 'spares' },
        { label: 'Авто-аксессуары', value: 'accessories' }
    ]);

    const [openSpares, setOpenSpares] = useState(false);
    const [valueSpares, setValueSpares] = useState(null);
    const [spares, setSpares] = useState([
        { label: 'Для автомобилей', value: 'for_auto' },
        { label: 'Для мототехники', value: 'for_moto' },
        { label: 'Для грузовиков и спецтехники', value: 'for_special_technic' },
        { label: 'Для водного транспорта', value: 'for_water' }
    ]);

    const [openSparesForAuto, setOpenSparesForAuto] = useState(false);
    const [valueSparesForAuto, setValueSparesForAuto] = useState(null);
    const [sparesForAuto, setSparesForAuto] = useState([
        { label: 'Автосвет', value: 'auto_light' },
        { label: 'Автомобиль на запчасти', value: 'auto_to_spares' },
        { label: 'Аккумуляторы', value: 'accumulator' },
        { label: 'Двигатель', value: 'engine' },
        { label: 'Запчасти для ТО', value: 'spares_for_to' },
        { label: 'Кузов', value: 'body' },
        { label: 'Подвеска', value: 'suspension' },
        { label: 'Рулевое управление', value: 'steering' },
        { label: 'Салон', value: 'salon' },
        { label: 'Система охлаждения', value: 'cooling_system' },
        { label: 'Стекла', value: 'glass' },
        { label: 'Топливная и выхлопная системы', value: 'exhaust_systems' },
        { label: 'Тормозная система', value: 'brake_system' },
        { label: 'Трансмиссия и привод', value: 'transmission_and_drive' },
        { label: 'Электрооборудование', value: 'electrical_equipment' }
    ]);

    const [openSparesForTruck, setOpenSparesForTruck] = useState(false);
    const [valueSparesForTruck, setValueSparesForTruck] = useState(null);
    const [sparesForTruck, setSparesForTruck] = useState([
        { label: 'Автобусы', value: 'bus' },
        { label: 'Автодома', value: 'motorhome' },
        { label: 'Автокраны', value: 'truck_crane' },
        { label: 'Бульдозеры', value: 'bulldozer' },
        { label: 'Грузовики', value: 'trucks' },
        { label: 'Коммунальная техника', value: 'municipal_equipment' },
        { label: 'Легкий коммерческий транспорт', value: 'commercial_transport' },
        { label: 'Навесное оборудование', value: 'attachments' },
        { label: 'Погрузчики', value: 'loaders' },
        { label: 'Прицепы', value: 'trailers' },
        { label: 'Сельхозтехника', value: 'agricultural_machinery' },
        { label: 'Строительная техника', value: 'construction_engineering' },
        { label: 'Техника для лесозаготовки', value: 'forestry_equipment' },
        { label: 'Тягачи', value: 'tractors' },
        { label: 'Эскаваторы', value: 'excavators' },
        { label: 'Другое', value: 'other' }
    ]);

    const [openSparesWheels, setOpenSparesWheels] = useState(false);
    const [valueSparesWheels, setValueSparesWheels] = useState(null);
    const [sparesWheels, setSparesWheels] = useState([
        { label: 'Легковые шины', value: 'car_tires' },
        { label: 'Шины для грузовиков и спецтехники', value: 'truck_tires' },
        { label: 'Мотошины', value: 'moto_tires' },
        { label: 'Диски', value: 'rims' },
        { label: 'Колпаки', value: 'caps' },
        { label: 'Колеса', value: 'wheels' }
    ]);

    const [openSparesWheelsSeasonality, setOpenSparesWheelsSeasonality] = useState(false);
    const [valueSparesWheelsSeasonality, setValueSparesWheelsSeasonality] = useState(null);
    const [sparesWheelsSeasonality, setSparesWheelsSeasonality] = useState([
        { label: 'Зимние', value: 'winter' },
        { label: 'Летние', value: 'summer' },
        { label: 'Всесезонные', value: 'all_seasons' }
    ]);

    const [openSparesRimsDiameter, setOpenSparesRimsDiameter] = useState(false);
    const [valueSparesRimsDiameter, setValueSparesRimsDiameter] = useState(null);
    const [sparesRimsDiameter, setSparesRimsDiameter] = useState([
        { label: '4', value: '4' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' }
    ]);

    const [openSparesRimsType, setOpenSparesRimsType] = useState(false);
    const [valueSparesRimsType, setValueSparesRimsType] = useState(null);
    const [sparesRimsType, setSparesRimsType] = useState([
        { label: 'Кованные', value: 'forged' },
        { label: 'Литые', value: 'cast' },
        { label: 'Штампованные', value: 'stamped' },
        { label: 'Спицованные', value: 'spoked' },
        { label: 'Сборные', value: 'farbricated' },
    ]);

    const [openSparesRimsWidth, setOpenSparesRimsWidth] = useState(false);
    const [valueSparesRimsWidth, setValueSparesRimsWidth] = useState(null);
    const [sparesRimsWidth, setSparesRimsWidth] = useState([
        { label: '3.5', value: '3.5' },
        { label: '4', value: '4' },
        { label: '4.5', value: '4.5' },
        { label: '5', value: '5' },
        { label: '5.5', value: '5.5' },
        { label: '6', value: '6' },
        { label: '6.5', value: '6.5' },
        { label: '6.75', value: '6.75' },
        { label: '7', value: '7' },
        { label: '7.5', value: '7.5' }
    ]);

    const [openSparesRimsHoles, setOpenSparesRimsHoles] = useState(false);
    const [valueSparesRimsHoles, setValueSparesRimsHoles] = useState(null);
    const [sparesRimsHoles, setSparesRimsHoles] = useState([
        { label: '0', value: '0' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '12', value: '12' }
    ]);

    const [openSparesRimsHolesDiameter, setOpenSparesRimsHolesDiameter] = useState(false);
    const [valueSparesRimsHolesDiameter, setValueSparesRimsHolesDiameter] = useState(null);
    const [sparesRimsHolesDiameter, setSparesRimsHolesDiameter] = useState([
        { label: '98', value: '98' },
        { label: '100', value: '100' },
        { label: '105', value: '105' },
        { label: '108', value: '108' },
        { label: '110', value: '110' },
        { label: '112', value: '112' },
        { label: '114.3', value: '114.3' },
        { label: '115', value: '115' },
        { label: '118', value: '118' }
    ]);

    // <-- Запчасти -->

    // <-- Товары для дома -->

    const [openSubcategoriesForHome, setOpenSubcategoriesForHome] = useState(false);
    const [valueSubcategoriesForHome, setValueSubcategoriesForHome] = useState(null);
    const [subcategoriesForHome, setSubcategoriesForHome] = useState([
        { label: 'Ремонт и строительство', value: 'construction' },
        { label: 'Мебель и интерьер', value: 'furniture' },
        { label: 'Бытовая техника', value: 'appliances' },
        { label: 'Продукты питания', value: 'food' },
        { label: 'Растения', value: 'plants' },
        { label: 'Посуда и товары для кухни', value: 'kitchen' }
    ]);

    // <-- Товары для дома -->

    const [openRegion, setOpenRegion] = useState(false);
    const [valueRegion, setValueRegion] = useState(null);
    const [regionFilter, setRegionFilter] = useState([
        { label: 'Москва', value: 'moscow' },
        { label: 'Москва и МО', value: 'moscow-and-region' },
        { label: 'Московская область', value: 'moscow-region' },
        { label: 'Санкт-Петербург', value: 'petersburg' },
        { label: 'Санкт-Петербуг и ЛО', value: 'petersburg-and-region' },
        { label: 'Ленинградская область', value: 'leningrad-region' },
        { label: 'Свердловская область', value: 'sverdlov-region' },
        { label: 'Ростовская область', value: 'rostov-region' },
        { label: 'Челябинская область', value: 'chelyabinsk-region' },
        { label: 'Краснодарский край', value: 'krasnodar-region' },
        { label: 'Самарская область', value: 'samara-region' }
    ]);

    const [openQuality, setOpenQuality] = useState(false);
    const [valueQuality, setValueQuality] = useState(null);
    const [qualityFilter, setQualityFilter] = useState([
        { label: 'Б/У', value: 'second-hand' },
        { label: 'Новое', value: 'new' }
    ]);

    useEffect(() => {
        const brandAuto = listAuto = [].map(auto => (
            { label: auto.name, value: auto.id }
        ))
        setBrandAutoList(brandAuto);
    }, [])

    const handleChoiceBrand = () => {
        const models = [];
        listAuto = [].filter(auto => (
            valueBrandAuto && valueBrandAuto === auto.id && auto.models.map(model => models.push(model))
        ))
        const modelsToSelect = models.map(model => ({ label: model.name, value: model.id }))
        setModelsAuto(modelsToSelect);
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
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
                    <KeyboardAwareScrollView
                        extraHeight={180}
                        enableOnAndroid
                    >
                        <ScrollView>
                            <View style={{ paddingHorizontal: 9 }}>
                                <View
                                    style={{
                                        marginBottom: valueCategories !== 'home' ? 20 : 0,
                                        zIndex: 12
                                    }}
                                >
                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Категория</DefaultHeader>
                                    <View style={{
                                        ...styles.selectContainer,
                                        marginBottom: valueCategories ? 20 : 0,
                                        zIndex: 10000
                                    }}>
                                        <DropDownPicker
                                            listMode='SCROLLVIEW'
                                            placeholder='Выберите категорию'
                                            dropDownContainerStyle={{
                                                borderWidth: 0,
                                                elevation: 5,
                                                shadowOffset: { width: 1, height: 2 },
                                                shadowColor: '#000',
                                                shadowRadius: 3,
                                                shadowOpacity: 0.5,
                                            }}
                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                            style={{
                                                borderWidth: 0,
                                                backgroundColor: openCategories ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                            }}
                                            open={openCategories}
                                            value={valueCategories}
                                            items={categoriesFilter}
                                            setOpen={setOpenCategories}
                                            setValue={setValueCategories}
                                            setItems={setCategoriesFilter}
                                        />
                                    </View>
                                    {valueCategories &&
                                        (
                                            valueCategories === 'auto' &&
                                            <>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Марка</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Марка'
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchable={true}
                                                        searchPlaceholder='Введите название марки'
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,
                                                            backgroundColor: openBrandAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff')
                                                        }}
                                                        open={openBrandAuto}
                                                        value={valueBrandAuto}
                                                        items={brandAutoList}
                                                        setOpen={setOpenBrandAuto}
                                                        setValue={setValueBrandAuto}
                                                        setItems={setBrandAutoList}
                                                        onChangeValue={handleChoiceBrand}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Модель</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Модель'
                                                        disabled={valueBrandAuto ? false : true}
                                                        disabledStyle={{ opacity: 0.4 }}
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchPlaceholder='Введите название модели'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0,
                                                            elevation: 6
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,

                                                            backgroundColor: openModelsAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            elevation: openModelsAuto ? 6 : 2
                                                        }}
                                                        open={openModelsAuto}
                                                        value={valueModelsAuto}
                                                        items={modelsAuto ? modelsAuto : []}
                                                        setOpen={setOpenModelsAuto}
                                                        setValue={setValueModelsAuto}
                                                        setItems={setModelsAuto}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Год выпуска</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Год выпуска, от' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Год выпуска, до' />
                                                    </View>
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Объём двигателя</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Объём, от' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Объём, до' />
                                                    </View>
                                                </View>
                                                <View style={{ zIndex: 15, marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Коробка передач</DefaultHeader>
                                                    <View style={{
                                                        ...styles.selectContainer
                                                    }}>
                                                        <DropDownPicker
                                                            listMode='SCROLLVIEW'
                                                            placeholder='Коробка передач'
                                                            searchPlaceholder='Введите название модели'
                                                            dropDownContainerStyle={{
                                                                elevation: 5,
                                                                shadowOffset: { width: 1, height: 2 },
                                                                shadowColor: '#000',
                                                                shadowRadius: 3,
                                                                shadowOpacity: 0.5,
                                                                borderWidth: 0
                                                            }}
                                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                            style={{
                                                                borderWidth: 0,
                                                                backgroundColor: openTransmission ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff')
                                                            }}
                                                            open={openTransmission}
                                                            value={valueTransmission}
                                                            items={transmission}
                                                            setOpen={setOpenTransmission}
                                                            setValue={setValueTransmission}
                                                            setItems={setTransmission}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Пробег</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Пробег, от' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Пробег, до' />
                                                    </View>
                                                </View>
                                                <View>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Состояние</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <RadioGroup
                                                            radioButtons={radioButtons}
                                                            onPress={setRadioButtons}
                                                            layout='row'
                                                            containerStyle={{ width: '100%', justifyContent: 'space-between' }}
                                                        />
                                                    </View>
                                                </View>
                                            </>
                                        )
                                        ||
                                        (
                                            valueCategories === 'electronic' &&
                                            <>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Бренд</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Бренд'
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchPlaceholder='Введите название бренда'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0,
                                                            elevation: 6,
                                                            backgroundColor: '#fff'
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,

                                                            backgroundColor: openBrandAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            elevation: openBrandAuto ? 6 : 2
                                                        }}
                                                        open={openBrandAuto}
                                                        value={valueBrandAuto}
                                                        items={brandAutoList}
                                                        setOpen={setOpenBrandAuto}
                                                        setValue={setValueBrandAuto}
                                                        setItems={setBrandAutoList}
                                                        onChangeValue={handleChoiceBrand}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Модель</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Модель'
                                                        disabled={valueBrandAuto ? false : true}
                                                        disabledStyle={{ opacity: 0.4 }}
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchPlaceholder='Введите название модели'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0,
                                                            elevation: 6
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,

                                                            backgroundColor: openModelsAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            elevation: openModelsAuto ? 6 : 2
                                                        }}
                                                        open={openModelsAuto}
                                                        value={valueModelsAuto}
                                                        items={modelsAuto ? modelsAuto : []}
                                                        setOpen={setOpenModelsAuto}
                                                        setValue={setValueModelsAuto}
                                                        setItems={setModelsAuto}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>ОЗУ</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='ОЗУ, от' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='ОЗУ, до' />
                                                    </View>
                                                </View>
                                                <View>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Объём памяти</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Объём, от' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Объём, до' />
                                                    </View>
                                                </View>
                                            </>
                                        )
                                        ||
                                        (
                                            valueCategories === 'technic' &&
                                            <>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Бренд</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Бренд'
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchPlaceholder='Введите название бренда'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0,
                                                            elevation: 6,
                                                            backgroundColor: '#fff'
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,

                                                            backgroundColor: openBrandAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            elevation: openBrandAuto ? 6 : 2
                                                        }}
                                                        open={openBrandAuto}
                                                        value={valueBrandAuto}
                                                        items={brandAutoList}
                                                        setOpen={setOpenBrandAuto}
                                                        setValue={setValueBrandAuto}
                                                        setItems={setBrandAutoList}
                                                        onChangeValue={handleChoiceBrand}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Модель</DefaultHeader>
                                                    <DropDownPicker
                                                        listMode='MODAL'
                                                        listItemLabelStyle={{
                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                        }}
                                                        textStyle={{
                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                        }}
                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                        placeholder='Модель'
                                                        disabled={valueBrandAuto ? false : true}
                                                        disabledStyle={{ opacity: 0.4 }}
                                                        modalProps={{
                                                            animationType: 'slide'
                                                        }}
                                                        currentBackground={currentBackground}
                                                        searchPlaceholder='Введите название модели'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0,
                                                            elevation: 6
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            ...styles.selectContainer,

                                                            backgroundColor: openModelsAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            elevation: openModelsAuto ? 6 : 2
                                                        }}
                                                        open={openModelsAuto}
                                                        value={valueModelsAuto}
                                                        items={modelsAuto ? modelsAuto : []}
                                                        setOpen={setOpenModelsAuto}
                                                        setValue={setValueModelsAuto}
                                                        setItems={setModelsAuto}
                                                    />
                                                </View>
                                                <View>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Высота х Ширина х Глубина</DefaultHeader>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '30%' }} placeholderTextColor='#000' placeholder='Высота, см' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '30%' }} placeholderTextColor='#000' placeholder='Ширина, см' />
                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '30%' }} placeholderTextColor='#000' placeholder='Глубина, см' />
                                                    </View>
                                                </View>
                                            </>
                                        )
                                        ||
                                        (
                                            valueCategories === 'accessories' &&
                                            <>
                                                <View style={{ zIndex: 15 }}>
                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Подкатегория</DefaultHeader>
                                                    <View style={{
                                                        ...styles.selectContainer
                                                    }}>
                                                        <DropDownPicker
                                                            listMode='SCROLLVIEW'
                                                            placeholder='Выберите подкатегорию'
                                                            dropDownContainerStyle={{
                                                                elevation: 5,
                                                                shadowOffset: { width: 1, height: 2 },
                                                                shadowColor: '#000',
                                                                shadowRadius: 3,
                                                                shadowOpacity: 0.5,
                                                                zIndex: 10000,
                                                                borderWidth: 0
                                                            }}
                                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                            style={{
                                                                backgroundColor: openSparesCategory ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                borderWidth: 0
                                                            }}
                                                            open={openSparesCategory}
                                                            value={valueSparesCategory}
                                                            items={sparesCategory}
                                                            setOpen={setOpenSparesCategory}
                                                            setValue={setValueSparesCategory}
                                                            setItems={setSparesCategory}
                                                        />
                                                    </View>
                                                </View>
                                                {valueSparesCategory === 'spares' &&
                                                    <>
                                                        <View style={{ zIndex: 15, marginTop: 20 }}>
                                                            <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Вид транспорта</DefaultHeader>
                                                            <View style={{
                                                                ...styles.selectContainer
                                                            }}>
                                                                <DropDownPicker
                                                                    listMode='SCROLLVIEW'
                                                                    placeholder='Выберите вид транспорта'
                                                                    dropDownContainerStyle={{
                                                                        elevation: 5,
                                                                        shadowOffset: { width: 1, height: 2 },
                                                                        shadowColor: '#000',
                                                                        shadowRadius: 3,
                                                                        shadowOpacity: 0.5,
                                                                        borderWidth: 0
                                                                    }}
                                                                    ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                    ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                    style={{
                                                                        borderWidth: 0,
                                                                        backgroundColor: openSpares ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                    }}
                                                                    open={openSpares}
                                                                    value={valueSpares}
                                                                    items={spares}
                                                                    setOpen={setOpenSpares}
                                                                    setValue={setValueSpares}
                                                                    setItems={setSpares}
                                                                />
                                                            </View>
                                                        </View>
                                                        {valueSpares === 'for_auto' &&
                                                            <>
                                                                <View style={{ marginVertical: 20 }}>
                                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Марка</DefaultHeader>
                                                                    <DropDownPicker
                                                                        listMode='MODAL'
                                                                        listItemLabelStyle={{
                                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                                        }}
                                                                        textStyle={{
                                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                                        }}
                                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                                        placeholder='Марка'
                                                                        modalProps={{
                                                                            animationType: 'slide'
                                                                        }}
                                                                        searchable={true}
                                                                        searchPlaceholder='Введите название марки'
                                                                        dropDownContainerStyle={{
                                                                            zIndex: 10000,
                                                                            borderWidth: 0,
                                                                            elevation: 6,
                                                                            backgroundColor: '#fff'
                                                                        }}
                                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        style={{
                                                                            ...styles.selectContainer,

                                                                            backgroundColor: openBrandAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                            elevation: openBrandAuto ? 6 : 2
                                                                        }}
                                                                        open={openBrandAuto}
                                                                        value={valueBrandAuto}
                                                                        items={brandAutoList}
                                                                        setOpen={setOpenBrandAuto}
                                                                        setValue={setValueBrandAuto}
                                                                        setItems={setBrandAutoList}
                                                                        onChangeValue={handleChoiceBrand}
                                                                    />
                                                                </View>
                                                                <View style={{ marginBottom: 20 }}>
                                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Модель</DefaultHeader>
                                                                    <DropDownPicker
                                                                        listMode='MODAL'
                                                                        listItemLabelStyle={{
                                                                            color: darkModeEnabled ? '#fff' : '#002845'
                                                                        }}
                                                                        textStyle={{
                                                                            color: darkModeEnabled ? '#000' : '#002845'
                                                                        }}
                                                                        theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                                                        placeholder='Модель'
                                                                        disabled={valueBrandAuto ? false : true}
                                                                        disabledStyle={{ opacity: 0.4 }}
                                                                        modalProps={{
                                                                            animationType: 'slide'
                                                                        }}
                                                                        searchable={true}
                                                                        searchPlaceholder='Введите название модели'
                                                                        dropDownContainerStyle={{
                                                                            zIndex: 10000,
                                                                            borderWidth: 0,
                                                                            elevation: 6
                                                                        }}
                                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        style={{
                                                                            ...styles.selectContainer,

                                                                            backgroundColor: openModelsAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                            elevation: openModelsAuto ? 6 : 2
                                                                        }}
                                                                        open={openModelsAuto}
                                                                        value={valueModelsAuto}
                                                                        items={modelsAuto ? modelsAuto : []}
                                                                        setOpen={setOpenModelsAuto}
                                                                        setValue={setValueModelsAuto}
                                                                        setItems={setModelsAuto}
                                                                    />
                                                                </View>
                                                                <View style={{ zIndex: 15 }}>
                                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Вид запчасти</DefaultHeader>
                                                                    <View style={{
                                                                        ...styles.selectContainer
                                                                    }}>
                                                                        <DropDownPicker
                                                                            listMode='SCROLLVIEW'
                                                                            placeholder='Вид запчасти'
                                                                            dropDownContainerStyle={{
                                                                                elevation: 5,
                                                                                shadowOffset: { width: 1, height: 2 },
                                                                                shadowColor: '#000',
                                                                                shadowRadius: 3,
                                                                                shadowOpacity: 0.5,
                                                                                zIndex: 10000,
                                                                                borderWidth: 0,
                                                                            }}
                                                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                            style={{
                                                                                borderWidth: 0,
                                                                                backgroundColor: openSparesForAuto ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                            }}
                                                                            open={openSparesForAuto}
                                                                            value={valueSparesForAuto}
                                                                            items={sparesForAuto}
                                                                            setOpen={setOpenSparesForAuto}
                                                                            setValue={setValueSparesForAuto}
                                                                            setItems={setSparesForAuto}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </>
                                                        }
                                                        {valueSpares === 'for_special_technic' &&
                                                            <View style={{ zIndex: 15, marginTop: 20 }}>
                                                                <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Тип техники</DefaultHeader>
                                                                <View style={{
                                                                    ...styles.selectContainer
                                                                }}>
                                                                    <DropDownPicker
                                                                        listMode='SCROLLVIEW'
                                                                        placeholder='Тип техники'
                                                                        dropDownContainerStyle={{
                                                                            elevation: 5,
                                                                            shadowOffset: { width: 1, height: 2 },
                                                                            shadowColor: '#000',
                                                                            shadowRadius: 3,
                                                                            shadowOpacity: 0.5,
                                                                            zIndex: 10000,
                                                                            borderWidth: 0,
                                                                        }}
                                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                        style={{
                                                                            borderWidth: 0,
                                                                            backgroundColor: openSparesForTruck ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                        }}
                                                                        open={openSparesForTruck}
                                                                        value={valueSparesForTruck}
                                                                        items={sparesForTruck}
                                                                        setOpen={setOpenSparesForTruck}
                                                                        setValue={setValueSparesForTruck}
                                                                        setItems={setSparesForTruck}
                                                                    />
                                                                </View>
                                                            </View>
                                                        }
                                                    </>
                                                }
                                                {valueSparesCategory === 'wheels' &&
                                                    <>
                                                        <View style={{ zIndex: 10, marginTop: 20 }}>
                                                            <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Раздел</DefaultHeader>
                                                            <View style={{
                                                                ...styles.selectContainer
                                                            }}>
                                                                <DropDownPicker
                                                                    listMode='SCROLLVIEW'
                                                                    placeholder='Выберите раздел'
                                                                    dropDownContainerStyle={{
                                                                        elevation: 5,
                                                                        shadowOffset: { width: 1, height: 2 },
                                                                        shadowColor: '#000',
                                                                        shadowRadius: 3,
                                                                        shadowOpacity: 0.5,
                                                                        zIndex: 10000,
                                                                        borderWidth: 0,
                                                                    }}
                                                                    ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                    ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                    style={{
                                                                        borderWidth: 0,
                                                                        backgroundColor: openSparesWheels ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                    }}
                                                                    open={openSparesWheels}
                                                                    value={valueSparesWheels}
                                                                    items={sparesWheels}
                                                                    setOpen={setOpenSparesWheels}
                                                                    setValue={setValueSparesWheels}
                                                                    setItems={setSparesWheels}
                                                                />
                                                            </View>
                                                        </View>
                                                        {
                                                            (
                                                                (valueSparesWheels === 'car_tires' || valueSparesWheels === 'truck_tires' || valueSparesWheels === 'moto_tires') &&
                                                                <>
                                                                    <View style={{ marginVertical: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Ширина профиля</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Ширина' />
                                                                    </View>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Высота профиля</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Высота' />
                                                                    </View>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Ширина' />
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Сезонность</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Сезонность'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0,
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesWheelsSeasonality ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesWheelsSeasonality}
                                                                                value={valueSparesWheelsSeasonality}
                                                                                items={sparesWheelsSeasonality}
                                                                                setOpen={setOpenSparesWheelsSeasonality}
                                                                                setValue={setValueSparesWheelsSeasonality}
                                                                                setItems={setSparesWheelsSeasonality}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Производитель</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Производитель' />
                                                                    </View>
                                                                </>
                                                            )
                                                            ||
                                                            (
                                                                valueSparesWheels === 'rims' &&
                                                                <>
                                                                    <View style={{ zIndex: 10, marginVertical: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Диаметр'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0,
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsDiameter ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsDiameter}
                                                                                value={valueSparesRimsDiameter}
                                                                                items={sparesRimsDiameter}
                                                                                setOpen={setOpenSparesRimsDiameter}
                                                                                setValue={setValueSparesRimsDiameter}
                                                                                setItems={setSparesRimsDiameter}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Тип диска</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Тип диска'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    ...styles.selectContainer,

                                                                                    backgroundColor: openSparesRimsType ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                    elevation: openSparesRimsType ? 6 : 2
                                                                                }}
                                                                                open={openSparesRimsType}
                                                                                value={valueSparesRimsType}
                                                                                items={sparesRimsType}
                                                                                setOpen={setOpenSparesRimsType}
                                                                                setValue={setValueSparesRimsType}
                                                                                setItems={setSparesRimsType}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Ширина обода</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Ширина обода'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0,
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsWidth ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsWidth}
                                                                                value={valueSparesRimsWidth}
                                                                                items={sparesRimsWidth}
                                                                                setOpen={setOpenSparesRimsWidth}
                                                                                setValue={setValueSparesRimsWidth}
                                                                                setItems={setSparesRimsWidth}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Количество отверстий</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Количество отверстий'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0,
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsHoles ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsHoles}
                                                                                value={valueSparesRimsHoles}
                                                                                items={sparesRimsHoles}
                                                                                setOpen={setOpenSparesRimsHoles}
                                                                                setValue={setValueSparesRimsHoles}
                                                                                setItems={setSparesRimsHoles}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр расположения отверстий</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Диаметр расположения отверстий'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0,
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsHolesDiameter ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsHolesDiameter}
                                                                                value={valueSparesRimsHolesDiameter}
                                                                                items={sparesRimsHolesDiameter}
                                                                                setOpen={setOpenSparesRimsHolesDiameter}
                                                                                setValue={setValueSparesRimsHolesDiameter}
                                                                                setItems={setSparesRimsHolesDiameter}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Вылет (ЕТ)</DefaultHeader>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='-2' />
                                                                            <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='185+' />
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )
                                                            ||
                                                            (
                                                                valueSparesWheels === 'caps' &&
                                                                <View style={{ zIndex: 10, marginTop: 20 }}>
                                                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр</DefaultHeader>
                                                                    <View style={{
                                                                        ...styles.selectContainer
                                                                    }}>
                                                                        <DropDownPicker
                                                                            listMode='SCROLLVIEW'
                                                                            placeholder='Диаметр'
                                                                            dropDownContainerStyle={{
                                                                                elevation: 5,
                                                                                shadowOffset: { width: 1, height: 2 },
                                                                                shadowColor: '#000',
                                                                                shadowRadius: 3,
                                                                                shadowOpacity: 0.5,
                                                                                zIndex: 10000,
                                                                                borderWidth: 0,
                                                                            }}
                                                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                            style={{
                                                                                borderWidth: 0,
                                                                                backgroundColor: openSparesRimsDiameter ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                            }}
                                                                            open={openSparesRimsDiameter}
                                                                            value={valueSparesRimsDiameter}
                                                                            items={sparesRimsDiameter}
                                                                            setOpen={setOpenSparesRimsDiameter}
                                                                            setValue={setValueSparesRimsDiameter}
                                                                            setItems={setSparesRimsDiameter}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            )
                                                            ||
                                                            (
                                                                valueSparesWheels === 'wheels' &&
                                                                <>
                                                                    <View style={{ marginVertical: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Ширина профиля</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Ширина' />
                                                                    </View>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Высота профиля</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Высота' />
                                                                    </View>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Ширина' />
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Сезонность</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Сезонность'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesWheelsSeasonality ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesWheelsSeasonality}
                                                                                value={valueSparesWheelsSeasonality}
                                                                                items={sparesWheelsSeasonality}
                                                                                setOpen={setOpenSparesWheelsSeasonality}
                                                                                setValue={setValueSparesWheelsSeasonality}
                                                                                setItems={setSparesWheelsSeasonality}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Производитель</DefaultHeader>
                                                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF', width: '100%' }} placeholderTextColor='#000' placeholder='Производитель' />
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Тип диска</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Тип диска'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsType ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsType}
                                                                                value={valueSparesRimsType}
                                                                                items={sparesRimsType}
                                                                                setOpen={setOpenSparesRimsType}
                                                                                setValue={setValueSparesRimsType}
                                                                                setItems={setSparesRimsType}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Ширина обода</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Ширина обода'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsWidth ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsWidth}
                                                                                value={valueSparesRimsWidth}
                                                                                items={sparesRimsWidth}
                                                                                setOpen={setOpenSparesRimsWidth}
                                                                                setValue={setValueSparesRimsWidth}
                                                                                setItems={setSparesRimsWidth}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Количество отверстий</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Количество отверстий'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsHoles ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsHoles}
                                                                                value={valueSparesRimsHoles}
                                                                                items={sparesRimsHoles}
                                                                                setOpen={setOpenSparesRimsHoles}
                                                                                setValue={setValueSparesRimsHoles}
                                                                                setItems={setSparesRimsHoles}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ zIndex: 10, marginBottom: 20 }}>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Диаметр расположения отверстий</DefaultHeader>
                                                                        <View style={{
                                                                            ...styles.selectContainer
                                                                        }}>
                                                                            <DropDownPicker
                                                                                listMode='SCROLLVIEW'
                                                                                placeholder='Диаметр расположения отверстий'
                                                                                dropDownContainerStyle={{
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 1, height: 2 },
                                                                                    shadowColor: '#000',
                                                                                    shadowRadius: 3,
                                                                                    shadowOpacity: 0.5,
                                                                                    zIndex: 10000,
                                                                                    borderWidth: 0
                                                                                }}
                                                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                                                style={{
                                                                                    borderWidth: 0,
                                                                                    backgroundColor: openSparesRimsHolesDiameter ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                                                }}
                                                                                open={openSparesRimsHolesDiameter}
                                                                                value={valueSparesRimsHolesDiameter}
                                                                                items={sparesRimsHolesDiameter}
                                                                                setOpen={setOpenSparesRimsHolesDiameter}
                                                                                setValue={setValueSparesRimsHolesDiameter}
                                                                                setItems={setSparesRimsHolesDiameter}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Вылет (ЕТ)</DefaultHeader>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='-2' />
                                                                            <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='185+' />
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                }
                                            </>
                                        )
                                        ||
                                        (
                                            valueCategories === 'home' &&
                                            <View style={{ zIndex: 15, marginBottom: 20 }}>
                                                <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Подкатегория</DefaultHeader>
                                                <View style={{
                                                    ...styles.selectContainer
                                                }}>
                                                    <DropDownPicker
                                                        listMode='SCROLLVIEW'
                                                        placeholder='Выберите подкатегорию'
                                                        dropDownContainerStyle={{
                                                            zIndex: 10000,
                                                            borderWidth: 0
                                                        }}
                                                        ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                        style={{
                                                            backgroundColor: openSubcategoriesForHome ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                            borderWidth: 0
                                                        }}
                                                        open={openSubcategoriesForHome}
                                                        value={valueSubcategoriesForHome}
                                                        items={subcategoriesForHome}
                                                        setOpen={setOpenSubcategoriesForHome}
                                                        setValue={setValueSubcategoriesForHome}
                                                        setItems={setSubcategoriesForHome}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Регион</DefaultHeader>
                                    <View style={{
                                        ...styles.selectContainer
                                    }}>
                                        <DropDownPicker
                                            listMode='MODAL'
                                            listItemLabelStyle={{
                                                color: darkModeEnabled ? '#fff' : '#002845'
                                            }}
                                            textStyle={{
                                                color: darkModeEnabled ? '#000' : '#002845'
                                            }}
                                            theme={darkModeEnabled ? 'DARK' : 'LIGHT'}
                                            searchable
                                            modalProps={{
                                                animationType: 'slide'
                                            }}
                                            currentBackground={currentBackground}
                                            searchPlaceholder='Введите название региона'
                                            placeholder='Выберите регион'
                                            ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                            ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                            style={{
                                                backgroundColor: openRegion ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                borderWidth: 0
                                            }}
                                            open={openRegion}
                                            value={valueRegion}
                                            items={regionFilter}
                                            setOpen={setOpenRegion}
                                            setValue={setValueRegion}
                                            setItems={setRegionFilter}
                                        />
                                    </View>
                                </View>
                                {valueCategories !== 'auto' &&
                                    <View style={{ marginBottom: 20, zIndex: 10 }}>
                                        <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Состояние</DefaultHeader>
                                        <View style={{
                                            ...styles.selectContainer
                                        }}>
                                            <DropDownPicker
                                                dropDownDirection='BOTTOM'
                                                listMode='SCROLLVIEW'
                                                placeholder='Выберите качество'
                                                dropDownContainerStyle={{
                                                    borderWidth: 0
                                                }}
                                                ArrowDownIconComponent={() => <Image source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                ArrowUpIconComponent={() => <Image style={{ transform: [{ rotate: '180deg' }] }} source={require('../../../../assets/icons/select-arrow-icon.png')} />}
                                                style={{
                                                    backgroundColor: openQuality ? '#fff' : (darkModeEnabled ? '#ffffff90' : '#fff'),
                                                    borderWidth: 0
                                                }}
                                                open={openQuality}
                                                value={valueQuality}
                                                items={qualityFilter}
                                                setOpen={setOpenQuality}
                                                setValue={setValueQuality}
                                                setItems={setQualityFilter}
                                            />
                                        </View>
                                    </View>
                                }
                                <View style={{ marginBottom: 10 }} >
                                    <DefaultHeader style={{ ...styles.labelSelect, color: darkModeEnabled ? '#FFF' : '#002845' }}>Стоимость</DefaultHeader>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Стоимость, от' />
                                        <TextInput style={{ ...styles.inputRange, backgroundColor: darkModeEnabled ? '#FFFFFF95' : '#FFF' }} placeholderTextColor='#000' placeholder='Стоимость, до' />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, marginBottom: Platform.OS === 'ios' ? 15 : 0 }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: darkModeEnabled ? '#F5941E' : '#002845', width: 170, height: 40, alignItems: 'center', paddingTop: 10, borderRadius: 20 }}>
                            <DefaultHeader style={{ fontSize: 14, lineHeght: 16, color: darkModeEnabled ? '#000' : '#F5941E' }}>Добавить в сканер</DefaultHeader>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: darkModeEnabled ? '#F5941E' : '#F5941E', width: 170, height: 40, alignItems: 'center', paddingTop: 10, borderRadius: 20 }}>
                            <DefaultHeader style={{ fontSize: 14, lineHeght: 16, color: darkModeEnabled ? '#000' : '#002845' }}>Применить</DefaultHeader>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    barTrack: {
        fontSize: 12,
        lineHeight: 16
    },
    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    listMode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 1
    },
    iconMode: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 12,
        marginBottom: 8,
        elevation: 1,
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
        elevation: 5,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.5,
        zIndex: 1
    },
    inputRange: {
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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