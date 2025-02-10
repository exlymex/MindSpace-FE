import {Link, Stack} from 'expo-router';
import {StyleSheet, View} from 'react-native';
import {CustomText} from "@/components";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <View style={styles.container}>
                <CustomText type="title">This screen doesn't exist.</CustomText>
                <Link href="/" style={styles.link}>
                    <CustomText type="link">Go to home screen!</CustomText>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
