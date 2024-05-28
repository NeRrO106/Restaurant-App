import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function Search() {

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    
  };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
        />
        <Ionicons name="search" size={24} color="black" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Search;