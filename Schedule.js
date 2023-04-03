import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {DateTime} from "luxon";

const WIDTH = Dimensions.get('window').width;
const CustomCard = ({item}) => {
    const fp1 = DateTime.fromISO(`${item["FirstPractice/Date"]}T${item["FirstPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp2 = DateTime.fromISO(`${item["SecondPractice/Date"]}T${item["SecondPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp3 = DateTime.fromISO(`${item["ThirdPractice/Date"]}T${item["ThirdPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const sprintRace = DateTime.fromISO(`${item["Sprint/Date"]}T${item["Sprint/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const qual = DateTime.fromISO(`${item["Qualifying/Date"]}T${item["Qualifying/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const race = DateTime.fromISO(`${item["Date"]}T${item["Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();

    return (
        <Card style={{
            width: WIDTH * 0.95,
            marginTop: 2,
            marginBottom: 2
        }}>
            <Card.Title title={item["RaceName"]} subtitle={item["Circuit/CircuitName"]}/>
            {sprintRace !== 'Invalid DateTime' &&
                <Card.Content>
                    <Text variant="bodyMedium">FP1: {fp1}</Text>
                    <Text variant="bodyMedium">Qual: {qual}</Text>
                    <Text></Text>
                    <Text variant="bodyMedium">FP2: {fp2}</Text>
                    <Text variant="bodyMedium">Sprint: {sprintRace}</Text>
                    <Text></Text>
                    <Text variant="bodyMedium">Race: {race}</Text>
                </Card.Content>
            }

            {sprintRace === 'Invalid DateTime' &&
                <Card.Content>
                    <Text variant="bodyMedium">FP1: {fp1}</Text>
                    <Text variant="bodyMedium">FP2: {fp2}</Text>
                    <Text variant="bodyMedium">FP3: {fp3}</Text>
                    <Text></Text>
                    <Text variant="bodyMedium">Qual: {qual}</Text>
                    <Text></Text>
                    <Text variant="bodyMedium">Race: {race}</Text>
                </Card.Content>
            }

        </Card>
    )
};

export default function Schedule(props) {
    const {schedule} = props;

    return (
        <View style={styles.container}>
            <FlatList
                data={schedule}
                renderItem={({item}) => <CustomCard item={item}/>}
                keyExtractor={item => item.id}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH
    },
});