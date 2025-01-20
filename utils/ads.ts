import mobileAds, { 
  BannerAd, 
  BannerAdSize, 
  TestIds,
  MaxAdContentRating 
} from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    return mobileAds().initialize();
  })
  .then(adapterStatuses => {
    console.log('Initialization complete!', adapterStatuses);
  });

export const adUnitIds = {
  banner: __DEV__ ? TestIds.BANNER : 'ca-app-pub-8177178441242549/YOUR_BANNER_ID',
  interstitial: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8177178441242549/YOUR_INTERSTITIAL_ID',
  rewarded: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8177178441242549/1394989099',
};

export { BannerAd, BannerAdSize, TestIds }; 