import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  ColorValue,
} from "react-native";

type RectangularSwitchProps = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  width?: number;
  height?: number;
  activeColor?: ColorValue;
  inactiveColor?: ColorValue;
  thumbColor?: ColorValue;
  style?: ViewStyle;
};

export default function RectangularSwitch({
  value,
  onValueChange,
}: RectangularSwitchProps){
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const width = 50;
  const height = 28;
  const activeColor = "rgba(82, 139, 172, 0.64)";
  const inactiveColor = "rgba(63, 71, 78, 0.35)";
  const activeThumbColor = "rgba(89, 211, 255, 1)";
  const inactiveThumbColor="rgba(37, 98, 115, 1)";
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width - height + 2], 
  });


  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor as string, activeColor as string],
  });

  const thumbBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveThumbColor as string, activeThumbColor as string],
  });

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <Animated.View
        style={[
          styles.switchBase,
          {
            width,
            height,
            borderRadius: 8, 
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: height - 4,
              height: height - 4,
              borderRadius: 7, 
              transform: [{ translateX }],
              backgroundColor: thumbBackgroundColor
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchBase: {
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    position: "absolute",
    top: 2,
  },
});
