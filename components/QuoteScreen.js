import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

export default class QuoteScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      quote: ""
    };
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 30
      },
      alignRight: {
        textAlign: "right"
      }
    });

    return (
      <View style={styles.container}>
        <Text>Hello {this.state.name}!</Text>
        <Text>{this.state.quote.content}</Text>
        <Text style={styles.alignRight}>
          {this.state.quote.author ? " - " + this.state.quote.author : ""}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    this.storeData();
    this.getData();
    this.fetchQuote().then(response => {
      this.setState({ quote: response });
    });
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem("user_name", "Simon Gomes");
    } catch (e) {
      // saving error
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_name");
      if (value !== null) {
        // value previously stored
        this.setState({ name: value });
      }
    } catch (e) {
      // error reading value
    }
  };

  fetchQuote = async () => {
    try {
      let response = await fetch("https://api.quotable.io/random");
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };
}
