import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar, Appearance, Platform, View } from 'react-native';

import { ApplyAgreement } from '../screens/apply-agreement';
import { Authorization } from '../screens/authorization';
import { Registration } from '../screens/registration';
import { ChoiceRate } from '../screens/choice-rate';

import { MainPage } from '../screens/main/main-page';
import { MainFilter } from '../screens/main/main-page/main-filter';
import { VinCode } from '../screens/main/vin-code';
import { FinanceStatistic } from '../screens/main/finance-statistic';
import { Profile } from '../screens/main/profile';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';
import { Scaner } from '../screens/main/scaner';
import { Verification } from '../screens/verification';
import { VerificationCode } from '../screens/verification-code';
import Svg, { Path } from 'react-native-svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HistoryVin } from '../screens/main/vin/history-vin';
import { VinReport } from '../screens/main/vin/vin-report';
import { NewProject } from '../screens/main/finance/new-project';
import { ChosenDeal } from '../screens/main/finance/chosen-deal';
import { ChosenDealEditor } from '../screens/main/finance/chosen-deal-editor';
import { ExpensesCategories } from '../screens/main/finance/expenses-categories';
import { ProfileEditor } from '../screens/main/profile/profile-editor';
import { RatesList } from '../screens/main/profile/rates-list';
import { AddBalanceItem } from '../screens/main/finance/add-balance-item';
import { FinanceFilter } from '../screens/main/finance/finance-filter';

const TabTop = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const backgroundPictures = [
    {
        id: 1,
        path: require('../../assets/background/background-1.png')
    },
    {
        id: 2,
        path: require('../../assets/background/background-2.jpg')
    },
    {
        id: 3,
        path: require('../../assets/background/background-3.jpg')
    },
    {
        id: 4,
        path: require('../../assets/background/background-4.jpg')
    },
    {
        id: 5,
        path: require('../../assets/background/background-5.png')
    },
    {
        id: 6,
        path: require('../../assets/background/background-6.png')
    }
];

export const Navigation = () => {
    const [chosenDeal, setChosenDeal] = useState(null);
    const [expensesCategoriesList, setExpensesCategoriesList] = useState(null);
    const [sumAllExpenses, setSumAllExpenses] = useState(null);
    const [sumAllIncome, setSumAllIncome] = useState(null);

    const [darkModeEnabled, setDarkModeEnabled] = useState(true);
    const [usersArray, setUsersArray] = useState(null);
    const [usersLoad, setUsersLoad] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [financeStatistic, setFinanceStatistic] = useState(null);

    const [listAuto, setListAuto] = useState(null);

    const [currentBackground, setCurrentBackground] = useState(
        {
            id: 6,
            path: require('../../assets/background/background-6.png')
        }
    );

    const loadUsers = async () => {
        setUsersLoad(true);
        const userIdAS = await AsyncStorage.getItem('user_id');
        setUserId(userIdAS ? (userIdAS + 1) : 1);
        const usersAS = await AsyncStorage.getItem('users');
        const users = usersAS === null ? [] : JSON.parse(usersAS);

        const financeAS = await AsyncStorage.getItem('finance');
        financeAS === null ? setFinanceStatistic(store.statistic) : setFinanceStatistic(JSON.parse(financeAS));

        // await fetch('https://cars-base.ru/api/cars?full=1')
        //     .then(response => response.json())
        //     .then(json => setListAuto(json))
        setUsersArray(users);
        users.map(user => {
            if (user && user.is_logged) {
                setIsLogged(true);
                setAuthUser(user);
            }
        })

        setUsersLoad(false);
    }

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        colorScheme === 'dark' ? setDarkModeEnabled(true) : setDarkModeEnabled(false)

        loadUsers();
    }, [])

    const handleSaveStatistic = async data => {
        setFinanceStatistic([...financeStatistic, data]);
        await AsyncStorage.setItem('finance', JSON.stringify([...financeStatistic, data]));
    }

    const registrationSubmit = async (data, success) => {
        if (success === 'registration') {
            setAuthUser(data);
        } else {
            await AsyncStorage.setItem('users', JSON.stringify([...usersArray, { ...authUser, user_id: userId, is_logged: true, rate: data }]))
            setIsLogged(true);
            loadUsers();
        }
    }

    const handleLogIn = async (data) => {
        const usersAS = await AsyncStorage.getItem('users');
        const usersArray = JSON.parse(usersAS);
        const logInUser = usersArray.map(user => user && (
            data.login === user.login && data.password === user.password ?
                { ...user, is_logged: true }
                :
                { ...user }

        ));

        await usersArray.length > 0 && usersArray.forEach(user => {
            if (data.login === user.login && data.password === user.password) {
                setAuthUser(user)
                loadUsers();
                setIsLogged(true);
                AsyncStorage.setItem('users', JSON.stringify(logInUser));
            }
        });
    }

    const handleLogOut = async () => {
        const logOutUser = usersArray.map(user => user.user_id === authUser.user_id ? { ...user, is_logged: false } : { ...user })
        await AsyncStorage.setItem('users', JSON.stringify(logOutUser))
        setIsLogged(false);
        setAuthUser(null);
        loadUsers();
    }

    const handleBalanceChanges = (data) => {
        const expenses = data.reportExpenses.map(categories => (
            categories.list.map(expenses => expenses.value)
        ))

        const sumExpenses = expenses.flat().reduce((a, b) => a + b, 0);
        const income = data.reportIncome.map(income => income.value);
        const sumIncome = income.reduce((a, b) => a + b, 0);

        setSumAllExpenses(sumExpenses ? sumExpenses : 0);
        setSumAllIncome(sumIncome ? sumIncome : 0);
    }

    const TabNavigator = () => {
        return (
            <Tab.Navigator
                initialRouteName='MainPage'
                backBehavior='history'
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: darkModeEnabled ? '#000' : '#002845'
                    },
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen
                    name="MainPage"
                    tabBarOptions={{
                        activeBackgroundColor: '#F5941E'
                    }}
                    options={{
                        tabBarLabel: 'Главная',
                        tabBarIcon: ({ focused }) =>
                            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M5.25 10.5V24.5H22.75V10.5L14 3.5L5.25 10.5Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M11.0833 16.9166V24.5H16.9167V16.9166H11.0833Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linejoin="round" />
                                <Path d="M5.25 24.5H22.75" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" />
                            </Svg>
                    }}
                >
                    {(props) => <MainPage {...props} currentBackground={currentBackground} darkModeEnabled={darkModeEnabled} listAuto={listAuto && listAuto} />}
                </Tab.Screen>
                <Tab.Screen
                    name="VinCode"
                    options={{
                        tabBarLabel: 'VIN-код',
                        tabBarIcon: ({ focused }) =>
                            <Svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M5.76471 0C4.67765 0 3.75529 0.691765 3.42588 1.64706L0 11.5294V24.7059C0 25.1427 0.173529 25.5616 0.482412 25.8705C0.791296 26.1794 1.21023 26.3529 1.64706 26.3529H3.29412C3.73095 26.3529 4.14988 26.1794 4.45876 25.8705C4.76765 25.5616 4.94118 25.1427 4.94118 24.7059V23.0588H13.6706C13.3473 21.9905 13.1809 20.8809 13.1765 19.7647C13.1791 17.7726 13.6979 15.8152 14.6822 14.0833C15.6665 12.3513 17.0828 10.904 18.7929 9.88235H3.29412L5.76471 2.47059H23.8824L25.8259 8.28471C26.8355 8.38997 27.8268 8.6281 28.7741 8.99294L26.2212 1.64706C25.8918 0.691765 24.9694 0 23.8824 0H5.76471ZM23.0588 11.5294C22.8447 11.5294 22.6635 11.6776 22.6306 11.8753L22.3176 14.0494C21.8235 14.2635 21.3459 14.5271 20.9176 14.8235L18.8753 14C18.6941 14 18.48 14 18.3647 14.2141L16.7176 17.0635C16.6188 17.2447 16.6518 17.4588 16.8165 17.5906L18.5624 18.9412C18.5294 19.2212 18.5129 19.4847 18.5129 19.7647C18.5129 20.0447 18.5294 20.3082 18.5624 20.5882L16.8165 21.9388C16.6682 22.0706 16.6188 22.2847 16.7176 22.4659L18.3647 25.3153C18.4635 25.5294 18.6776 25.5294 18.8753 25.5294L20.9176 24.7059C21.3459 25.0024 21.8071 25.2824 22.3176 25.48L22.6306 27.6541C22.6635 27.8518 22.8282 28 23.0588 28H26.3529C26.5341 28 26.7153 27.8518 26.7482 27.6541L27.0612 25.48C27.5553 25.2659 28 25.0024 28.4447 24.7059L30.4706 25.5294C30.6847 25.5294 30.8988 25.5294 31.0141 25.3153L32.6612 22.4659C32.76 22.2847 32.7106 22.0706 32.5624 21.9388L30.8 20.5882C30.8329 20.3082 30.8659 20.0447 30.8659 19.7647C30.8659 19.4847 30.8494 19.2212 30.8 18.9412L32.5459 17.5906C32.6941 17.4588 32.7435 17.2447 32.6447 17.0635L30.9977 14.2141C30.8988 14 30.6847 14 30.4706 14L28.4447 14.8235C28 14.5271 27.5553 14.2471 27.0447 14.0494L26.7318 11.8753C26.7153 11.6776 26.5341 11.5294 26.3529 11.5294H23.0588ZM5.76471 13.1765C6.41995 13.1765 7.04835 13.4368 7.51168 13.9001C7.975 14.3634 8.23529 14.9918 8.23529 15.6471C8.23529 16.3023 7.975 16.9307 7.51168 17.394C7.04835 17.8574 6.41995 18.1176 5.76471 18.1176C5.10947 18.1176 4.48106 17.8574 4.01774 17.394C3.55441 16.9307 3.29412 16.3023 3.29412 15.6471C3.29412 14.9918 3.55441 14.3634 4.01774 13.9001C4.48106 13.4368 5.10947 13.1765 5.76471 13.1765ZM24.7059 17.2941C26.0729 17.2941 27.1765 18.3976 27.1765 19.7647C27.1765 21.1318 26.0729 22.2353 24.7059 22.2353C23.3224 22.2353 22.2353 21.1318 22.2353 19.7647C22.2353 18.3976 23.3388 17.2941 24.7059 17.2941Z" fill={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} />
                            </Svg>
                    }}
                >
                    {(props) => <VinCode {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                </Tab.Screen>
                <Tab.Screen
                    name="FinanceStatistic"
                    options={{
                        tabBarLabel: 'Финансы',
                        tabBarIcon: ({ focused }) =>
                            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.4895 6.9819L18.541 2.33337L21.2316 6.99357L10.4895 6.9819Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M2.33334 8.16667C2.33334 7.52232 2.85568 7 3.50001 7H24.5C25.1444 7 25.6667 7.52232 25.6667 8.16667V24.5C25.6667 25.1443 25.1444 25.6667 24.5 25.6667H3.50001C2.85568 25.6667 2.33334 25.1443 2.33334 24.5V8.16667Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linejoin="round" />
                                <Path d="M20.5625 19.25H25.6667V13.4166H20.5625C18.8711 13.4166 17.5 14.7225 17.5 16.3333C17.5 17.9441 18.8711 19.25 20.5625 19.25Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linejoin="round" />
                                <Path d="M25.6667 9.625V23.625" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" />
                            </Svg>
                    }}
                >
                    {(props) => <FinanceStatistic
                        {...props}
                        setChosenDeal={setChosenDeal}
                        darkModeEnabled={darkModeEnabled}
                        currentBackground={currentBackground}
                        financeStatistic={financeStatistic}
                        setFinanceStatistic={setFinanceStatistic}
                    />}
                </Tab.Screen>
                <Tab.Screen
                    name="Scaner"
                    options={{
                        tabBarLabel: 'Сканер',
                        tabBarIcon: ({ focused }) =>
                            <Svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M23.3334 12.1581V3.50016C23.3334 2.85583 22.811 2.3335 22.1667 2.3335H5.83335C5.18902 2.3335 4.66669 2.85583 4.66669 3.50016V24.5002C4.66669 25.1445 5.18902 25.6668 5.83335 25.6668H15.1667" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M8.16669 9.9165H11.6667" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M16.3333 9.9165H19.8333" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M8.16669 16.3335H11.6667" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M8.16669 19.8335H11.6667" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M9.91669 11.6665V8.1665" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M22.008 22.0078L24.4829 24.4827" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" />
                                <Path d="M17.0583 22.0081C18.4251 23.375 20.6412 23.375 22.008 22.0081C23.3749 20.6413 23.3749 18.4252 22.008 17.0584C20.6412 15.6915 18.4251 15.6915 17.0583 17.0584C15.6914 18.4252 15.6914 20.6413 17.0583 22.0081Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>

                    }}
                >
                    {() => <Scaner
                        darkModeEnabled={darkModeEnabled}
                        currentBackground={currentBackground}
                    />
                    }
                </Tab.Screen>
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: 'Профиль',
                        tabBarIcon: ({ focused }) =>
                            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M14 25.6667C20.4433 25.6667 25.6666 20.4434 25.6666 14C25.6666 7.55672 20.4433 2.33337 14 2.33337C7.55665 2.33337 2.33331 7.55672 2.33331 14C2.33331 20.4434 7.55665 25.6667 14 25.6667Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M14 13.4167C15.6108 13.4167 16.9166 12.1109 16.9166 10.5C16.9166 8.88922 15.6108 7.58337 14 7.58337C12.3892 7.58337 11.0833 8.88922 11.0833 10.5C11.0833 12.1109 12.3892 13.4167 14 13.4167Z" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linejoin="round" />
                                <Path d="M5.84619 22.3603C6.04668 19.3203 8.57596 16.9166 11.6667 16.9166H16.3334C19.42 16.9166 21.9467 19.3139 22.1531 22.3482" stroke={focused ? "#F5941E" : (darkModeEnabled ? "#808080" : "#497DA2")} strokeWidth="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                    }}
                >
                    {(props) => <Profile
                        {...props}
                        darkModeEnabled={darkModeEnabled}
                        authUser={authUser}
                        setDarkModeEnabled={setDarkModeEnabled}
                        currentBackground={currentBackground}
                        setCurrentBackground={setCurrentBackground}
                        backgroundPictures={backgroundPictures}
                        handleLogOut={handleLogOut}
                    />}
                </Tab.Screen>
            </Tab.Navigator >
        )
    }

    return (
        !usersLoad &&
        <NavigationContainer>
            {!isLogged ?
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true,
                        ...TransitionPresets.SlideFromRightIOS

                    }}
                >
                    <Stack.Screen name="ApplyAgreement">
                        {(props) => <ApplyAgreement {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                    </Stack.Screen>
                    <Stack.Screen name="Authorization">
                        {(props) => <Authorization {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} handleLogIn={handleLogIn} usersArray={usersArray} />}
                    </Stack.Screen>
                    <Stack.Screen name="Verification">
                        {(props) => <Verification {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} usersArray={usersArray} registrationSubmit={registrationSubmit} />}
                    </Stack.Screen>
                    <Stack.Screen name="VerificationCode">
                        {(props) => <VerificationCode {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} usersArray={usersArray} registrationSubmit={registrationSubmit} />}
                    </Stack.Screen>
                    <Stack.Screen name="Registration">
                        {(props) => <Registration {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} usersArray={usersArray} registrationSubmit={registrationSubmit} />}
                    </Stack.Screen>
                    <Stack.Screen name="ChoiceRate">
                        {(props) => <ChoiceRate
                            {...props}
                            darkModeEnabled={darkModeEnabled}
                            currentBackground={currentBackground}
                            registrationSubmit={registrationSubmit}
                        />
                        }
                    </Stack.Screen>
                </Stack.Navigator>
                :
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.ModalPresentationIOS
                }}>
                    <Stack.Group
                        screenOptions={{
                            ...TransitionPresets.SlideFromRightIOS
                        }}
                    >
                        <Stack.Screen name='Main' component={TabNavigator} />
                        <Stack.Screen name='HistoryVin'>
                            {(props) => <HistoryVin {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='VinReport'>
                            {(props) => <VinReport {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='ChosenDeal'>
                            {(props) => <ChosenDeal
                                {...props}
                                chosenDeal={chosenDeal}
                                setChosenDeal={setChosenDeal}
                                financeStatistic={financeStatistic}
                                darkModeEnabled={darkModeEnabled}
                                currentBackground={currentBackground}
                                sumAllExpenses={sumAllExpenses}
                                sumAllIncome={sumAllIncome}
                                handleBalanceChanges={handleBalanceChanges}
                                setFinanceStatistic={setFinanceStatistic}
                            />
                            }
                        </Stack.Screen>
                        <Stack.Screen name='RatesList'>
                            {(props) => <RatesList {...props} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                    </Stack.Group>
                    <Stack.Group
                        screenOptions={{
                            ...TransitionPresets.ModalPresentationIOS
                        }}
                    >
                        <Stack.Screen name='MainFilter'>
                            {(props) => <MainFilter {...props} listAuto={listAuto} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='NewProject'>
                            {(props) => <NewProject {...props} handleSaveStatistic={handleSaveStatistic} financeStatistic={financeStatistic} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='FinanceFilter'>
                            {(props) => <FinanceFilter {...props} handleSaveStatistic={handleSaveStatistic} financeStatistic={financeStatistic} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='ChosenDealEditor'>
                            {(props) => <ChosenDealEditor
                                {...props}
                                setExpensesCategoriesList={setExpensesCategoriesList}
                                chosenDeal={chosenDeal}
                                setChosenDeal={setChosenDeal}
                                financeStatistic={financeStatistic}
                                setFinanceStatistic={setFinanceStatistic}
                                darkModeEnabled={darkModeEnabled}
                                currentBackground={currentBackground}
                                sumAllExpenses={sumAllExpenses}
                                sumAllIncome={sumAllIncome}
                                handleBalanceChanges={handleBalanceChanges}
                            />
                            }
                        </Stack.Screen>
                        <Stack.Screen name='ExpensesCategories'>
                            {(props) => <ExpensesCategories {...props} setExpensesCategoriesList={setExpensesCategoriesList} chosenDeal={chosenDeal} setChosenDeal={setChosenDeal} financeStatistic={financeStatistic} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='ProfileEditor'>
                            {(props) => <ProfileEditor {...props} authUser={authUser} darkModeEnabled={darkModeEnabled} currentBackground={currentBackground} />}
                        </Stack.Screen>
                        <Stack.Screen name='AddBalanceItem'>
                            {(props) => <AddBalanceItem
                                {...props}
                                expensesCategoriesList={expensesCategoriesList}
                                setExpensesCategoriesList={setExpensesCategoriesList}
                                chosenDeal={chosenDeal}
                                setChosenDeal={setChosenDeal}
                                darkModeEnabled={darkModeEnabled}
                                currentBackground={currentBackground}
                                sumAllExpenses={sumAllExpenses}
                                sumAllIncome={sumAllIncome}
                                handleBalanceChanges={handleBalanceChanges}
                            />
                            }
                        </Stack.Screen>
                    </Stack.Group>
                </Stack.Navigator>
            }
            <StatusBar barStyle={darkModeEnabled ? 'light-content' : 'dark-content'} backgroundColor={darkModeEnabled ? '#000' : '#fff'} animated={true} showHideTransition='fade' />
        </NavigationContainer>
    );
}