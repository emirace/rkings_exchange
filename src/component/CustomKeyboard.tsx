import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, Text, Icon } from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveHeight } from '../utils/size';

interface CustomKeyboardProps {
  onKeyPress: (currentValues: string) => void;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress }) => {
  const { colors } = useTheme();
  const [enteredValues, setEnteredValues] = useState<string>('');

  const handleKeyPress = (value: string) => {
    let updatedValues =
      value === 'DEL' ? enteredValues.slice(0, -1) : enteredValues + value;
    setEnteredValues(updatedValues);
    onKeyPress(updatedValues);
  };

  const renderButton = (
    label: string,
    borders: {
      right?: boolean;
      left?: boolean;
      top?: boolean;
      bottom?: boolean;
    }
  ) => (
    <React.Fragment key={label}>
      <TouchableOpacity
        onPress={() => handleKeyPress(label)}
        style={[
          styles.button,
          borders.right && styles.separatorRight,
          borders.left && styles.separatorLeft,
          borders.top && styles.separatorTop,
          borders.bottom && styles.separatorBottom,
          { borderColor: colors.elevation.level1 },
        ]}
      >
        <Text style={styles.buttonText}>
          {label === 'DEL' ? (
            <Icon
              source={'backspace-outline'}
              size={getResponsiveFontSize(45)}
            />
          ) : (
            label
          )}
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  );

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.row}>
        {[1, 2].map((label) =>
          renderButton(label.toString(), { bottom: true, right: true })
        )}
        {renderButton('3', { bottom: true })}
      </View>
      <View style={styles.row}>
        {[4, 5].map((label) =>
          renderButton(label.toString(), { bottom: true, right: true })
        )}
        {renderButton('6', { bottom: true })}
      </View>
      <View style={styles.row}>
        {[7, 8].map((label) =>
          renderButton(label.toString(), { bottom: true, right: true })
        )}
        {renderButton('9', { bottom: true })}
      </View>
      <View style={styles.row}>
        {['.', '0'].map((label) => renderButton(label, { right: true }))}
        {renderButton('DEL', {})}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: getResponsiveHeight(100),
  },
  buttonText: {
    fontSize: getResponsiveFontSize(40),
  },
  separatorTop: {
    borderTopWidth: 1,
  },
  separatorLeft: {
    borderLeftWidth: 1,
  },

  separatorBottom: {
    borderBottomWidth: 1,
  },
  separatorRight: {
    borderRightWidth: 1,
  },
});

export default CustomKeyboard;
