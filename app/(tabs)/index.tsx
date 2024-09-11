import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, Keyboard, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const COLORS = {
  firstRouteBg: '#f9f6f1',
  secondRouteBg: '#f9f6f1',
  thirdRouteBg: '#f9f6f1',
  inputBackground: '#fff',
  inputBorderColor: '#ccc',
  inputTextColor: '#000',
  bubbleBackground: '#e0e0e0', // Slightly different background for the bubble
};

const Conversation = ({ submittedTexts, inputValue, setInputValue, handleTextSubmit }) => (
  <>
    {/* ScrollView to contain all text bubbles */}
    <ScrollView style={styles.bubbleContainer}>
      {submittedTexts.map((text, index) => (
        <View key={index} style={styles.bubble}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
      ))}
    </ScrollView>
    {/* Input field fixed at the bottom */}
    <TextInput
      style={styles.input}
      value={inputValue}
      onChangeText={setInputValue}
      placeholder="Type here..."
      placeholderTextColor={COLORS.inputTextColor}
      onSubmitEditing={handleTextSubmit} // Trigger on enter key press
    />
  </>
);

const FirstRoute = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [submittedTexts, setSubmittedTexts] = React.useState([]);

  const handleTextSubmit = () => {
    if (inputValue.trim()) {
      setSubmittedTexts([inputValue, ...submittedTexts]);
      setInputValue('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.scene, { backgroundColor: COLORS.firstRouteBg }]}>
      <Conversation
        submittedTexts={submittedTexts}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTextSubmit={handleTextSubmit}
      />
    </View>
  );
};

const SecondRoute = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [submittedTexts, setSubmittedTexts] = React.useState([]);

  const handleTextSubmit = () => {
    if (inputValue.trim()) {
      setSubmittedTexts([inputValue, ...submittedTexts]);
      setInputValue('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.scene, { backgroundColor: COLORS.secondRouteBg }]}>
      <Conversation
        submittedTexts={submittedTexts}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTextSubmit={handleTextSubmit}
      />
    </View>
  );
};

const ThirdRoute = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [submittedTexts, setSubmittedTexts] = React.useState([]);

  const handleTextSubmit = () => {
    if (inputValue.trim()) {
      setSubmittedTexts([inputValue, ...submittedTexts]);
      setInputValue('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.scene, { backgroundColor: COLORS.thirdRouteBg }]}>
      <Conversation
        submittedTexts={submittedTexts}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTextSubmit={handleTextSubmit}
      />
    </View>
  );
};

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '日本語' },
    { key: 'second', title: 'Francaise' },
    { key: 'third', title: 'Español' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    textAlign: 'left',
    bottom: 25, // Adds padding from the bottom
    left: 25,   // Adds padding from the left
    right: 25,  // Adds padding from the right
    height: 50,
    backgroundColor: COLORS.inputBackground,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: COLORS.inputBorderColor,
    paddingHorizontal: 15, // Slight padding inside the input
    color: COLORS.inputTextColor,
    borderRadius: 10, // Gives a rounded effect for the floating look
    shadowColor: "#000", // Adds shadow for a floating effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  bubbleContainer: {
    position: 'absolute',
    top: 25, // Start near the top
    left: 25,
    right: 25,
    zIndex: 10,
    flexDirection: 'column-reverse', // Newest bubble first
  },
  bubble: {
    backgroundColor: COLORS.bubbleBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10, // Space between each bubble
    borderColor: COLORS.inputBorderColor,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  bubbleText: {
    color: COLORS.inputTextColor,
  },
});
