import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { localizations } from '../../services/localizations';
import { styleForm } from '../../assets/styles/form';
import { fonts } from '../../assets/styles/variables';

const CitySelector = ({
  label,
  value,
  setValue,
}) => {
  if (value) {
    return (
      <View>
        <Text style={styleForm.label as any}>{label}</Text>
        <GooglePlacesAutocomplete
          placeholder={localizations.t('placeholderCity')}
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          listViewDisplayed={false}
          fetchDetails
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            setValue({
              city: {
                name: data.description,
                lat: details?.geometry.location.lat,
                lng: details?.geometry.location.lng,
              },
            });
          }}
          styles={{
            container: {
            },
            textInputContainer: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              padding: 0,
            },
            textInput: {
              marginLeft: -10,
              marginRight: 0,
              height: 28,
              fontSize: fonts.heading3,
              padding: 0,
            },
          }}
          getDefaultValue={() => {
            if (value !== ' ') {
              return value;
            }
            return '';
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBALxjV_6gBYeTAJLCpEj0rWoF-N3v5t-w',
            language: 'hu', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          debounce={200}
        />
      </View>
    );
  }
  return <></>;
};

export default CitySelector;
