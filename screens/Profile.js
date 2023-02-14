import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import store from '../components/Store';
const Profile = () => {
    const [mode, setmode] = store.useState("mode");
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>fin aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text >Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>fineeee aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>hhhh aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>fin1</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>here fin</Text>
                <Text >fin1real</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text >Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>fineeee aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>hhhh aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>fin1</Text>
                <Text>Profile aghgh</Text>
                <Text>Profile aghgh</Text>
                <Text>here fin</Text>
                <Text >finfffff1real</Text>
            </ScrollView>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        //  width: '100%',
        height: '100%',
        //height: 500,
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#ECF1FE',
        //padding: 10,

    },
})
export default Profile