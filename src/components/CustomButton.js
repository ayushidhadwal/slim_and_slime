import React from "react";
import { Button } from "native-base";

import { theme } from "../styles/theme";

export const CustomButton = ({ title, ...restProps }) => (
  <Button
    {...restProps}
    w="100%"
    borderRadius={theme.borderRadius}
    size="lg"
    alignSelf="center"
    _text={{
      fontWeight: 800,
      fontSize: 16,
    }}
  >
    {title}
  </Button>
);
