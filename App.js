import React from 'react';
import {StyleSheet, Text, View, Button, Picker, TextInput} from 'react-native';
import {Speech} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "yoda",
      inputText: "",
      translatedText: ""
    }

    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.getUserInputTextDOM = this.getUserInputTextDOM.bind(this);
    this.getTranslatedTextDOM = this.getTranslatedTextDOM.bind(this);
  }

  handleButtonClicked() {
    // Speech.speak("Hello World im first try to speech.")
    let baseURL = `https://api.funtranslations.com/translate/${this.state.selectedLanguage}.json?text=${this.state.inputText}`;
    let finalURL = encodeURI(baseURL);
    fetch(finalURL)
      .then(resp => {
        console.log(resp);
      })
      .catch(exp => {
        console.log(exp);
      })
  }

  getTranslatedTextDOM() {
    return null;
  }

  getUserInputTextDOM() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(inputText) => this.setState({inputText})}
        value={this.state.inputText}
        multiline={true}
      />
    );

  }

  render() {

    let oLanguageSelectorDOM = (
      <Picker
        selectedValue={this.state.selectedLanguage}
        style={{height: 20, width: 100}}
        onValueChange={(itemValue, itemIndex) => this.setState({selectedLanguage: itemValue})}>
        <Picker.Item label="Yoda" value="yoda"/>
        <Picker.Item label="Dothraki" value="dothraki"/>
        <Picker.Item label="Valyrian" value="valyrian"/>
        <Picker.Item label="Minion" value="minion"/>
        <Picker.Item label="Groot" value="groot"/>
      </Picker>
    );

    let oInputDOM = !!this.state.translatedText ? this.getTranslatedTextDOM() : this.getUserInputTextDOM();

    return (
      <View style={styles.container}>

        <Text>Translate text to your favourite fun language</Text>

        {oLanguageSelectorDOM}
        {oInputDOM}

        <Button onPress={this.handleButtonClicked} title="Translate"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
