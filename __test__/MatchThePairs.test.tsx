import React from "react";
import renderer from "react-test-renderer";

import MatchThePairs from "../src/screens/MatchThePairs";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

test("renders correctly", () => {
  const tree = renderer.create(<MatchThePairs />).toJSON();
  expect(tree).toMatchSnapshot();
});
