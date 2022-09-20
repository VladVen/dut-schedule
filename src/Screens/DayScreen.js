import React, {useEffect} from "react";
import {Text, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderButton from "../Custom/AppHeaderButton";


export const DayScreen = ({navigation}) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
                    <Item title={'Menu'}
                          iconName={'menu'}
                          onPress={() => navigation.navigate('Login')}
                    />
                </HeaderButtons>
            ),
        })
    }, [])

    return(
        <View>
            <Text>
                Day
            </Text>
        </View>
    )
}