import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styleForm } from '../../assets/styles/form';
import {
  fonts,
  colors,
  margins,
  dimensions,
} from '../../assets/styles/variables';

const CitySelector = ({
  label,
  value,
  setValue,
  mandatory,
}) => {
  const [isCityOverlayActive, setIsCityOverlayActive] = useState(false);
  const defaultPlaceholder = !value || value === ' ' ? 'Kezd el írni a település nevét' : value;
  if (typeof value !== 'undefined') {
    return (
      <View>
        <Text style={styleForm.label as any}>
          {label}
          {mandatory && <Text style={styleForm.mandatory}> *</Text>}
        </Text>
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
          overlayStyle={styles.modalContainer}
        >
          <View style={styles.overlayContainer}>
            <GooglePlacesAutocomplete
              placeholder={defaultPlaceholder}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType="search"
              listViewDisplayed
              numberOfLines={3}
              fetchDetails
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                setValue({
                  cityName: data.description,
                  cityLat: details?.geometry.location.lat,
                  cityLng: details?.geometry.location.lng,
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
                console.log(value);
                if (value && value !== ' ') {
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
            <View style={styles.closeButton}>
              <Button
                title="Bezárás"
                color={colors.darkPrimary}
                onPress={() => {
                  setIsCityOverlayActive(false);
                }}
              />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  modalContainer: {
    paddingHorizontal: margins.lg,
    paddingVertical: margins.lg,
    borderRadius: 20,
    width: dimensions.fullWidth * 0.9,
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default CitySelector;
