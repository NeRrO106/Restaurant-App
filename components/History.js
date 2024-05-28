import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


function History() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>History + comenzi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default History;