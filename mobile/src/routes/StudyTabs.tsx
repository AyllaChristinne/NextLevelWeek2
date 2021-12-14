import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from '@expo/vector-icons';

import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return(
        /** Aqui nao precisa de NavigationContainer pq essas rotas estão dentro de outra rota
         * que ja está dentro de um NavigationContainer */
        <Navigator
            tabBarOptions={{
                style: {
                    /** Sombras */
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                },
                tabStyle: {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 25
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                inactiveTintColor: '#c1bccc',
                activeBackgroundColor: '#ebebf5',
                activeTintColor: '#32264d'
            }}
        
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return(
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color }/>
                        );
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return(
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color }/>
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;