import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  result: {
    color: 'white',
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 10,
  },
  minimalResult: {
    fontSize: 30,
    textAlign: 'right',
    color: 'rgba(255,255,255,0.5)',
  },
  calcCt: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
    gap: 10,
  },
});
