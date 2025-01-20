import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { BannerAd, BannerAdSize, adUnitIds } from '../utils/ads';
import mobileAds, { 
  RewardedAd,
  RewardedAdEventType,
  TestIds as GoogleTestIds 
} from 'react-native-google-mobile-ads';
import { saveCoins, getCoins } from '../utils/storage';

const rewarded = RewardedAd.createForAdRequest(
  __DEV__ ? GoogleTestIds.REWARDED : 'ca-app-pub-8177178441242549/1394989099', 
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['gaming', 'games'],
  }
);

const CoinsScreen = () => {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCoins = async () => {
      const savedCoins = await getCoins();
      setCoins(savedCoins);
    };
    loadCoins();
  }, []);

  const showRewardedAd = useCallback(async () => {
    setLoading(true);
    
    await rewarded.load();
    
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoading(false);
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        const newCoins = coins + 50;
        setCoins(newCoins);
        saveCoins(newCoins);
        Alert.alert('Congratulations! 🎉', 'You earned 50 coins!');
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>Your Coins: {coins}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.watchButton, loading && styles.watchButtonDisabled]}
        onPress={showRewardedAd}
        disabled={loading}
      >
        <Text style={styles.watchButtonText}>
          {loading ? 'Loading Ad...' : 'Watch Ad to Earn 50 Coins'}
        </Text>
      </TouchableOpacity>

      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={adUnitIds.banner}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  coinContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  watchButton: {
    marginTop: 30,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  watchButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  watchButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});

export default CoinsScreen