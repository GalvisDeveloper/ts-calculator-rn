import React, {useState} from 'react';
import {Text, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import ButtonCalc from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

const calc = {
  1: ['AC', '+/-', '%', '/'],
  2: ['7', '8', '9', 'x'],
  3: ['4', '5', '6', '-'],
  4: ['1', '2', '3', '+'],
  5: ['0', '.', '='],
};

enum ActionTypes {
  AC = 'AC',
  '+/-' = '+/-',
  // Agrega más acciones aquí según sea necesario
}

const CalculatorScreen = () => {
  const [number, setNumber] = useState('0');
  const [lastNumber, setLastNumber] = useState('0');

  // Función para eliminar un dígito
  const deleteDigit = () => {
    let numberSliced = number.slice(0, -1);
    let conditions = ['-', '', '-0'];
    setNumber(conditions.includes(numberSliced) ? '0' : numberSliced);
  };

  // Configuración del componente Swipeable
  const swipeConfig = {
    onSwipeLeft: deleteDigit, // Función a ejecutar al deslizar hacia la izquierda
  };

  const clean = () => {
    setNumber('0');
  };

  const buildNumber = (numberText: string) => {
    if (number === '0' && numberText !== '.' && !isNaN(parseInt(numberText))) {
      setNumber(numberText);
      // console.log('join')
    } else {
      let newNumber = number + numberText;
      // console.log(number);
      if (
        (number.includes('.') && numberText === '.') ||
        (isNaN(parseInt(numberText)) && !numberText.startsWith('.'))
      )
        return;

      setNumber(newNumber);
    }
  };

  const positiveNegative = () => {
    if (number !== '0') {
      setNumber(number.includes('-') ? number.replace('-', '') : '-' + number);
    }
  };

  const ACTIONS_P: Record<ActionTypes, () => void> = {
    [ActionTypes.AC]: () => clean(),
    [ActionTypes['+/-']]: () => positiveNegative(),
  };

  return (
    <View style={styles.calcCt}>
      <Text style={styles.minimalResult}>{lastNumber}</Text>
      {/* <View
      ref={resultViewRef} {...panResponder.panHandlers}
      >
        <Text style={styles.result}>{number}</Text>
      </View> */}

      <GestureRecognizer {...swipeConfig}>
        <Text style={styles.result}>{number}</Text>
      </GestureRecognizer>

      {Object.values(calc).map((array, index) => {
        return (
          <View style={styles.mainRow} key={index}>
            {array.map((item, idx) => {
              return (
                <ButtonCalc
                  key={idx}
                  text={item}
                  last={idx === array.length - 1}
                  flexed={array.length < 4 && idx === 0}
                  header={index === 0}
                  action={
                    ACTIONS_P[item as ActionTypes] || (() => buildNumber(item))
                  }
                />
              );
            })}
          </View>
        );
      })}
      {/* <View style={styles.mainRow}>
        <ButtonCalc text="a" />
        <ButtonCalc text="b" />
        <ButtonCalc text="c" />
        <ButtonCalc text="d" />
      </View>
      <View style={styles.mainRow}>
        <ButtonCalc text="a" />
        <ButtonCalc text="b" />
        <ButtonCalc text="c" />
        <ButtonCalc text="d" />
      </View> */}
    </View>
  );
};

export default CalculatorScreen;
