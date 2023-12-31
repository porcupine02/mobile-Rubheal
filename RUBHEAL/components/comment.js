import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const comment = (props) => {
    const starIcons = [];

    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

        if (i < props.item.rating) {
            starIcons.push(
                <AntDesign key={i} name="star" size={20} color="orange" />

            );

        }

        else {
            starIcons.push(
                <AntDesign key={i} name="star" size={20} color="grey" />

            )
        }
    }



    return (
        // { borderBottomColor: '#aaa', borderBottomWidth: 1, paddingVertical: 10 }
        <View style={{
            marginHorizontal: 20,
            backgroundColor: '#ddd', borderRadius: 10, margin: 10, paddingBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
        }}>
            <View style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 10 }}>
                <Image
                    source={props.item.imageProfile ? {uri : props.item.imageProfile} : { uri: 'https://picsum.photos/200' }}
                    style={[styles.account, { marginTop: 10 }]} />
                <Text style={{
                    fontSize: 16, fontWeight: '400',
                    fontFamily: 'Anuphan'
                }}> {props.item.name}{'\n'}
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>


                        {starIcons}
                        <Text style={{ fontSize: 16, bottom: 0 }}> {props.item.time} </Text>
                    </View>
                </Text>

            </View>
            <Text style={styles.content}>
                {props.item.comment}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 10,
        paddingTop: 30
    },
    content: {
        paddingHorizontal: '19%',
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Anuphan'

    },
    account: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 50,
        marginLeft: 20,
    },
});


export default comment;