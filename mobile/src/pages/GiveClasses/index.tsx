import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import bgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {
    const { goBack } = useNavigation(); 

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} style={styles.content} resizeMode='contain'>
                <Text style={styles.title}>
                    Quer ser um proffy?
                </Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={ () => { goBack() }}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>

        </View>
    );
}

export default GiveClasses;