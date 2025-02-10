import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromStorage = async (key: string) => {
    return await AsyncStorage.getItem(key);

};

export const saveToStorage = async (key: string, value: string) => {
    return await AsyncStorage.setItem(key, value);
};
