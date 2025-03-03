import Reactotron from 'reactotron-react-native';


const reactotron = Reactotron.configure({host: 'localhost', name: 'App'})
    .useReactNative()
    .connect();

if (typeof console !== 'undefined') {
    (console as unknown as { tron: typeof Reactotron }).tron = Reactotron;
}

export default reactotron;
