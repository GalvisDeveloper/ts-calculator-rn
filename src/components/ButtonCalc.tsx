import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ButtonProps {
  text: string;
  last?: boolean;
  header?: boolean;
  flexed?: boolean;
  action: () => void;
}

const ButtonCalc = (props: ButtonProps) => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View
        style={[
          styles.btn,
          props.flexed
            ? styles.btnFlexed
            : props.last
            ? styles.btnOrange
            : props.header
            ? styles.btnGray
            : styles.btnDark,
        ]}>
        <Text
          style={[
            props.last
              ? styles.btnText
              : props.header
              ? styles.btnTextDark
              : styles.btnText,
          ]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCalc;

const styles = StyleSheet.create({
  btn: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
  },
  btnDark: {
    backgroundColor: '#2D2D2D',
  },
  btnGray: {
    backgroundColor: '#9B9B9B',
  },
  btnOrange: {
    backgroundColor: '#FF9427',
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: 'white',
    fontWeight: '300',
  },
  btnTextDark: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
  },
  btnFlexed: {
    width: 170,
    backgroundColor: '#2D2D2D',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
