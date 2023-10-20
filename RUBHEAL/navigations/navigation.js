import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";



import CartScreen from "../screens/CartScreen.js"
import HomeScreen from "../screens/HomeScreen.js"
import RankScreen from "../screens/RankScreen.js"
import ChatScreen from "../screens/ChatScreen.js";
import MessageScreen from "../screens/MessageScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import AdminPage from "../screens/AdminPage.js";
import OrderDetail from "../screens/OrderDetail.js";
import CustomerBuyProduct from "../screens/CustomerBuyProduct.js";
import PageProductForAdmin from "../screens/PageProductForAdmin.js";
import DetailScreen from "../screens/DetailScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import Register from "../screens/RegistrationScreen.js";

import CustomHeaderButton from "../CustomButton/CustomHeaderButton.js";
import CreateScreen from "../screens/CreateScreen.js";
import UpdateScreen from "../screens/UpdateScreen.js";




const CreateNavigator = createNativeStackNavigator();
const CartNavigator = createNativeStackNavigator();
const OrderNavigator = createNativeStackNavigator();
const ChatNavigator = createNativeStackNavigator();
const LoginNavigator = createNativeStackNavigator();
const ProfileNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {

    return (
        <Tab.Navigator initialRouteName="HOME" screenOptions={{
            tabBarActiveTintColor: "darkblue",
            tabBarStyle: { backgroundColor: "#6A988B" },
            tabBarInactiveTintColor: "black"
        }}>
            <Tab.Screen name="HOME" component={Navigation} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="home" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Top" component={Rank} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="Trophy" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Chat" component={MessageNavigator} options={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="wechat" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Profile" component={UserNavigator} options={{
                headerShown: false,
                title: "ME",
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="user" size={26} color={color} />;
                },
            }} />
        </Tab.Navigator>
    )

}

function AdminAndProductMangement() {
    return (
        <CreateNavigator.Navigator initialRouteName="AdminMange">
            <CreateNavigator.Screen name="AdminMange" component={AdminPage} options={{ headerShown: false }} />
            <CreateNavigator.Screen name="Create" component={CreateScreen} options={{ title: "Create Product" }} />
            <CreateNavigator.Screen name="Update" component={UpdateScreen} options={{ title: "Update Product" }} />
        </CreateNavigator.Navigator>
    )

}



function MessageNavigator() {
    return (
        <ChatNavigator.Navigator initialRouteName="Message">
            <ChatNavigator.Screen name="Message" component={MessageScreen} options={({ route, navigation }) => ({
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title="Tab_1" iconName="ios-pencil" onPress={() => { }} />
                        <Item title="Tab_2" iconName="ios-home" onPress={() => { navigation.navigate('Home') }} />
                    </HeaderButtons>),

            })} />
            <ChatNavigator.Screen name="Chat" component={ChatScreen} options={{ title: "Folk" }} />

        </ChatNavigator.Navigator>
    )
}


function Rank() {
    return (
        <CartNavigator.Navigator initialRouteName="Rank">
            <CartNavigator.Screen name="Rank" component={RankScreen} />
            <CartNavigator.Screen name="Detail" component={DetailScreen} />
            <CartNavigator.Screen name="Cart" component={CartScreen} />
            <CartNavigator.Screen name="OrderDetail" component={OrderDetail} />
            <CartNavigator.Screen name="customerBuy" component={CustomerBuyProduct} />
        </CartNavigator.Navigator>
    )
}

function Navigation() {
    return (
        <CartNavigator.Navigator initialRouteName="Home">
            <CartNavigator.Screen name="Home" component={HomeScreen} />
            <CartNavigator.Screen name="Create" component={CreateScreen} />
            <CartNavigator.Screen name="Login" component={LoginScreen} />
            <CartNavigator.Screen name="Update" component={UpdateScreen} />
            <CartNavigator.Screen name="Detail" component={DetailScreen} />
            <CartNavigator.Screen name="customerBuy" component={CustomerBuyProduct} />
        </CartNavigator.Navigator>
    )

}

function LoginRegister() {
    return (

        <LoginNavigator.Navigator initialRouteName="Login">
            <LoginNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <LoginNavigator.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <LoginNavigator.Screen name="HomePage" component={TabNavigator} options={{ headerShown: false }} />
            <LoginNavigator.Screen name="OrderDetail" component={OrderDetail} />
            <LoginNavigator.Screen name="Cart" component={CartScreen} />
        </LoginNavigator.Navigator>
    )

}

function UserNavigator() {
    return (
        <ProfileNavigator.Navigator initialRouteName="Profile">
            <ProfileNavigator.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="Admin" component={AdminNavigation} options={{ headerShown: false }} />

        </ProfileNavigator.Navigator>
    )
}

function AdminNavigation() {
    return (
        <ProfileNavigator.Navigator initialRouteName="Admin">
            {/* <ProfileNavigator.Screen name="Profile" component={ProfileScreen} options={{headerShown : false}}/> */}
            <ProfileNavigator.Screen name="Admin" component={AdminAndProductMangement} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="AdminProduct" component={PageProductForAdmin} />
            <ProfileNavigator.Screen name="CustomerProduct" component={CustomerBuyProduct} />
        </ProfileNavigator.Navigator>

    )
}

export default function Mainavigation() {
    return (
        <NavigationContainer>
            <LoginRegister />
        </NavigationContainer>
    );
}