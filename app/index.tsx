import {useAppSelector} from '@/store/store';
import {Redirect} from 'expo-router';

if (__DEV__) {
    import('../ReactotronConfig.ts').then(() => console.log('Reactotron Configured'));
}

export default function Index() {
    const {accessToken} = useAppSelector(state => state.auth);

    if (accessToken) {
        return <Redirect href="/(root)/(tabs)"/>;
    }

    return <Redirect href="/login"/>;
} 