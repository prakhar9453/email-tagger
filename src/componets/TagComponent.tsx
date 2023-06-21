import _map from "lodash/map";
import _includes from "lodash/includes";
import _filter from "lodash/filter";
import * as React from "react";

import { Button, SIZE } from "baseui/button";

import { TAGS } from "@email-tagger/constants/Tags";

export const Tags = ({ tags, actionHandler, rowIndex }) => {
  const filteredTags = _filter(TAGS, (tag) => !_includes(tags, tag.id));

  const onAddTag = React.useCallback(
    (tagToAdd) => {
      actionHandler({
        type: "CHANGE_EMAIL_TAG",
        payload: {
          index: rowIndex,
          updatedTags: [...tags, tagToAdd],
        },
      });
    },
    [actionHandler, rowIndex, tags]
  );

  return (
    <div className="flex gap-1">
      {_map(filteredTags, (tag) => (
        <Button
          className="h-5 p-1"
          size={SIZE.mini}
          onClick={() => onAddTag(tag.id)}
          style={{backgroundColor: `#${tag.color}`}}
        >
          {tag.label}
        </Button>
      ))}
    </div>
  );
};
