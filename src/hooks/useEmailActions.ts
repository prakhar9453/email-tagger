//libs
import * as React from "react";
import update from "immutability-helper";

export const useEmailActions = ({ setEmail }) => {
  return React.useCallback(
    (action) => {
      const { type, payload } = action;

      switch (type) {
        case "CHANGE_EMAIL_TAG": {
          const { index, updatedTags } = payload;
          setEmail((prevState) =>
            update(prevState, {
              [index]: {
                tags: {
                  $set: updatedTags,
                },
              },
            })
          );
        }
      }
    },
    [setEmail]
  );
};
