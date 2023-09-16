import React, {useEffect, useState} from 'react';
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
  '/' = '/',
  'x' = 'x',
  '+' = '+',
  '-' = '-',
  '=' = '=',
  '%' = '%',
}

enum OperatorTypes {
  '/' = '/',
  'x' = 'x',
  '+' = '+',
  '-' = '-',
  '=' = '=',
}

const CalculatorScreen = () => {
  const [number, setNumber] = useState('0');
  const [lastNumber, setLastNumber] = useState('0');
  const [operator, setOperator] = useState<null | OperatorTypes>(null);

  let TYPOS = {
    [OperatorTypes['+']]: Number(number) + Number(lastNumber),
    [OperatorTypes['-']]: Number(lastNumber) - Number(number),
    [OperatorTypes['x']]: Number(number) * Number(lastNumber),
    [OperatorTypes['/']]: Number(lastNumber) / Number(number),
    [OperatorTypes['=']]: 0,
  };

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
    setLastNumber('0');
    setOperator(null);
  };

  const buildNumber = (numberText: string) => {
    let newNumber = number + numberText;

    if (number === '0' && numberText !== '.' && !isNaN(Number(numberText))) {
      setNumber(numberText);
    } else {
      if (
        (number.includes('.') && numberText === '.') ||
        (isNaN(Number(numberText)) && !numberText.startsWith('.'))
      )
        return;

      if (operator && lastNumber === '0') {
        setLastNumber(number);
        setNumber(numberText.startsWith('.') ? '0.' : numberText);
      } else {
        //TODO: check escritura desde el igual
        setNumber(newNumber.substring(0, 10));
      }
    }
  };

  const positiveNegative = () => {
    if (number !== '0') {
      setNumber(number.includes('-') ? number.replace('-', '') : '-' + number);
    }
  };

  console.log(operator);
  const operation = (type: OperatorTypes) => {
    // changePrevNumber();

    if (lastNumber === '0' && operator) return;

    let result = operator ? TYPOS[operator].toString() : TYPOS[type].toString();
    setOperator(type);

    if (operator) {
      setLastNumber('0');
      setOperator(type === '=' ? null : type);
      setNumber(result);
    } else {
      setLastNumber(number.endsWith('.') ? number.slice(0, -1) : number);
      setNumber('0');
      setOperator(type);
    }
  };

  const percent = () => {
    if (number !== '0') {
      setNumber((Number(number) / 100).toString());
    }
  };

  const ACTIONS_P: Record<ActionTypes, () => void> = {
    [ActionTypes.AC]: () => clean(),
    [ActionTypes['+/-']]: () => positiveNegative(),
    [ActionTypes['+']]: () => operation(OperatorTypes['+']),
    [ActionTypes['-']]: () => operation(OperatorTypes['-']),
    [ActionTypes['/']]: () => operation(OperatorTypes['/']),
    [ActionTypes['x']]: () => operation(OperatorTypes['x']),
    [ActionTypes['=']]: () => operation(OperatorTypes['=']),
    [ActionTypes['%']]: () => percent(),
  };

  return (
    <View style={styles.calcCt}>
      {lastNumber !== '0' && (
        <Text style={styles.minimalResult}>{lastNumber}</Text>
      )}

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
    </View>
  );
};

export default CalculatorScreen;
