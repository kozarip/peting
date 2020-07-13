import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styleForm } from '../../assets/styles/form';
import { fonts, colors } from '../../assets/styles/variables';

const CitySelector = ({
  label,
  value,
  setValue,
}) => {
  const [isCityOverlayActive, setIsCityOverlayActive] = useState(false);
  const defaultPlaceholder = value === ' ' ? 'Kezd el írni a település nevét' : value;
  if (value) {
    return (
      <View>
        <Text style={styleForm.label as any}>{label}</Text>
        <Text
          onPress={
            () => { setIsCityOverlayActive(true); }
          }
          style={styleForm.cardInput as any}
        >
          {defaultPlaceholder}
        </Text>
        <Overlay
          isVisible={isCityOverlayActive}
          windowBackgroundColor="rgba(255, 255, 255, 0.3)"
          overlayBackgroundColor="#fff"
          width="80%"
          height="70%"
        >
          <View>
            <GooglePlacesAutocomplete
              placeholder={defaultPlaceholder}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType="search"
              listViewDisplayed={true}
              numberOfLines={3}
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
                setIsCityOverlayActive(false);
              }}
              styles={{
                container: {
                  position: 'relative',
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
                  textAlign: 'center',
                },
                listView: {
                  position: 'absolute',
                  top: 30,
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
          <View style={styles.closeButton}>
            <Button
              title="Bezárás"
              color={colors.darkPrimary}
              onPress={() => {
                setIsCityOverlayActive(false);
              }}
            />
          </View>
        </Overlay>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default CitySelector;
