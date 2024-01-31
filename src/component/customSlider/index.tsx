import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';
import { Text } from 'react-native-paper';

const CustomSlider = ({
  handleChange,
}: {
  handleChange: (values: number[]) => void;
}) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    []
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(
    (lowValue: number, highValue: number) => {
      setLow(lowValue);
      setHigh(highValue);
      handleChange([lowValue, highValue]);
    },
    []
  );

  return (
    <View style={styles.root}>
      <Slider
        style={styles.slider}
        min={1000}
        max={1000000}
        step={500}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.valueText} numberOfLines={1}>
          Min: {low}
        </Text>
        <Text style={styles.valueText} numberOfLines={1}>
          Max: {high}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  slider: {},
  button: {},
  horizontalContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  valueText: {
    fontSize: 12,
  },
});

export default CustomSlider;
