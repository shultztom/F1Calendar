import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, ActivityIndicator, Dimensions} from 'react-native';
import {Text} from "react-native-paper";
import {useEffect, useState} from "react";
import {DateTime} from "luxon"
import axios from "axios";

import Schedule from "./Schedule"

export default function App() {
    const BASE_URL = 'https://f1-schedule-api-kekredzema-uc.a.run.app'


    const [schedule, setSchedule] = useState(null);
    const [isLoadingSchedule, setLoadingSchedule] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const YEAR = DateTime.now().year;
            const response = await axios.get(`${BASE_URL}/calendar/${YEAR}/year`);
            const {data} = response;
            setSchedule(data);
            setLoadingSchedule(false);
        }

        fetchData().catch(err => console.log(`Error: ${err.message}`));
    }, [isLoadingSchedule])

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="displayMedium">F1 Calendar</Text>

            {isLoadingSchedule && <ActivityIndicator size="large"/>}
            {!isLoadingSchedule && <Schedule schedule={schedule}/>}

            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH
    },
});
