import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  COINS: '@coins',
};

export const saveCoins = async (coins) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.COINS, coins.toString());
  } catch (error) {
    console.error('Error saving coins:', error);
  }
};

export const getCoins = async () => {
  try {
    const coins = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
    return coins ? parseInt(coins) : 0;
  } catch (error) {
    console.error('Error getting coins:', error);
    return 0;
  }
}; 