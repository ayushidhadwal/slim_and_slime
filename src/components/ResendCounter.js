import { Text } from "native-base";
import * as React from "react";
import { memo, useState } from "react";
import { useInterval } from "../hooks/useInterval";

const DEFAULT_TIMER = 60;

const ResendCounter = ({ onPress }) => {
  const [timer, setTimer] = useState(DEFAULT_TIMER);

  useInterval(() => {
    setTimer((prev) => {
      if (prev !== 0) {
        return prev - 1;
      }
      return 0;
    });
  }, 1000);

  const onSendAgain = async () => {
    const result = await onPress();
    if (result) {
      setTimer(DEFAULT_TIMER);
    }
  };

  return timer > 0 ? (
    <Text textAlign={"center"} fontWeight={"700"}>
      Resend OTP in{" "}
      <Text color={"primary.500"} fontWeight={"800"}>
        {timer}
      </Text>
    </Text>
  ) : (
    <Text textAlign={"center"} fontWeight={"700"}>
      Didn't receive OTP?{" "}
      <Text color={"primary.500"} fontWeight={"800"} onPress={onSendAgain}>
        Send again
      </Text>
    </Text>
  );
};

export default memo(ResendCounter);
