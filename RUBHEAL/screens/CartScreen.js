import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebase, config, storage } from '../database';
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot, doc, getDoc } from 'firebase/firestore';
import dayjs from "dayjs";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// SplashScreen.preventAutoHideAsync();

const CartScreen = ({ route, navigation }) => {
    //อย่าเอาไว้หลังconditionเด็ดขาดไม่งั้นพังแน่
    const [productAmount, setproductAmount] = useState(1);
    const user = firebase.auth().currentUser;
    const [address, setAddress] = useState('');
    const [addressName, setAddressName] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [productData, setProductData] = useState([]);

    const data = {
        owner: route.params.owner,
        pic: route.params.pic,
        title: route.params.title,
        price: route.params.price,
        amount: productAmount,
        numOrder: myRandom(5000, 100000),
        productId: route.params.productId
    }

    const updateProduct = (productId, updatedData) => {
        const productRef = firebase.firestore().collection('products').doc(productId);
        // Use the update method to update the document with the new data
        productRef.set(updatedData)
            .then(() => {
                console.log('Product updated successfully.');
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const getData = async () => {
        const users = await firebase.firestore().collection('users').where('email', '==', user.email).get();
        const product = doc(firebase.firestore(), "products", route.params.productId)
        const docProductSnapshot = await getDoc(product)
        setProductData(docProductSnapshot.data())
        setAmount(docProductSnapshot.data().amount)
        // console.log("datadatadatadata", productData)


        // console.log('aaaaaaaaaaaaaaaaaaaaaa')
        users.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setAddress(doc.data().address)
            setAddressName(doc.data().addressName)
            setPhone(doc.data().phone)
            // console.log(doc.id, " => ", doc.data());
        });
    }
    useEffect(() => {
        getData()
    })

    // console.log("datadatadata", productData)

    const [loaded] = useFonts({
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });
    if (!loaded) {
        return null;
    }

    // console.log(user)

    function myRandom(min, max) {
        const N = max - min + 1;
        return Math.floor(Math.random() * N) + min;
    }

    const cal_total = data.price * data.amount
    const total = parseFloat(cal_total) + 50

    const purchased = () => {
        // console.log(data.owner)
        if (!address) {
            Alert.alert('No Address!', 'Field your address in Settings', [
                { text: 'OK', onPress: () => navigation.navigate('HomePage') },
            ])
        } else {
            Alert.alert('Are You Sure?', 'If you press to order, you cannot cancel it.', [
                {
                    text: 'Cancel', // Cancel button
                    style: 'cancel', // This makes it a cancel button on both Android and iOS
                },
                {
                    text: 'OK', onPress: () => {
                        // data.amount = จน.ที่คนซื้อ
                        updateProduct(route.params.productId, {
                            name: productData.name,
                            price: productData.price,
                            detail: productData.detail,
                            amount: productData.amount - data.amount,
                            condition: productData.condition,
                            category: productData.category,
                            owner: productData.owner,
                            image: productData.image,
                            rating: productData.rating
                        });
                        myDate = dayjs(new Date).format('DD/MM/YYYY')
                        myTime = dayjs(new Date).format('HH:mm')
                        console.log(myDate)
                        firebase
                            .firestore()
                            .collection("purchased")
                            .add({
                                date: myDate,
                                time: myTime,
                                title: data.title,
                                total_price: total,
                                amount: data.amount,
                                owner: data.owner,
                                customer: user.email,
                                order_num: data.numOrder,
                                address: address,
                                addressName: addressName,
                                phone: phone,
                                pic: data.pic,
                                productId: route.params.productId
                            })
                            .then(() => {
                                navigation.navigate('OrderDetail', {
                                    date: myDate, time: myTime, title: route.params.title, pic: route.params.pic,
                                    price: route.params.price, amount: data.amount, total: total, numOrder: data.numOrder,
                                    address: address, addressName: addressName, phone: phone, id: data.id,
                                    productId: route.params.productId
                                })
                            });
                    }
                }])


        }

    }

    function minus() {
        if (data.amount <= 1) {
            Alert.alert('DELETE', 'Are you sure to delete from the cart?', [
                {
                    text: 'yes',
                    onPress: () => navigation.navigate('Home')
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
            ])
        } else {
            setproductAmount(data.amount - 1)
        }
    }
    function plus() {
        if (productAmount >= amount) {
            setproductAmount(productAmount)
            Alert.alert('Amount', 'There are not enough products in the warehouse.', [
                {
                    text: 'yes',
                }
            ])


        } else {
            setproductAmount(productAmount + 1)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 10 }}>
                <View style={styles.product}>
                    <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                        source={{ uri: data.pic }} resizeMode="contain"
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Anuphan' }}>{data.title}{'\n'}x{data.price} Baht</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={minus}>
                                <AntDesign name="minussquareo" size={30} color="black" />
                            </Pressable>
                            <Text style={{ marginHorizontal: 5, fontSize: 20 }}>{data.amount}</Text>
                            <Pressable onPress={plus}>
                                <AntDesign name="plussquareo" size={30} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ padding: 10, marginBottom: 20 }}>
                <View style={styles.seperator} />
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Feather name="map-pin" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Ship To</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{address}</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{addressName} {phone}</Text>
                    </View>
                </View>
                <View style={styles.seperator} />
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <Feather name="truck" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Shipping</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Flash</Text>
                    </View>
                </View>
                <View style={styles.seperator} />
                <View style={{ marginTop: 10, marginBottom: 40 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Price</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.price} Baht</Text>
                    </View>
                    <View style={styles.seperator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>50 Baht</Text>
                    </View>
                    <View style={styles.seperator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: 'Anuphan' }}>Total</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: 'Anuphan' }}>{total} Baht</Text>
                    </View>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <TouchableOpacity style={styles.order} onPress={purchased}>
                    <Text style={styles.textbutton}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    product: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    order: {
        backgroundColor: "#9276F2",
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignContent: "center"
    },
    textbutton: {
        fontWeight: "700",
        color: 'white',
        textAlign: 'center'
    },
    seperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ddd'
    }

});

export default CartScreen
