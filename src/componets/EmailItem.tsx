//libs
import * as React from "react";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _reduce from "lodash/reduce";
import _find from "lodash/find";

//component
import { Tag, KIND, VARIANT } from "baseui/tag";

import { TAGS } from "@email-tagger/constants/Tags";

export const EmailItem = ({
  mailId,
  subject,
  tags,
  rowIndex,
  actionHandler,
}) => {
  const onRemoveTag = React.useCallback(
    (tagIdToRemove) => {
      actionHandler({
        type: "CHANGE_EMAIL_TAG",
        payload: {
          index: rowIndex,
          updatedTags: _filter(tags, (tag) => tag !== tagIdToRemove),
        },
      });
    },
    [actionHandler, rowIndex, tags]
  );

  const resolvedTags = React.useMemo(
    () =>
      _reduce(
        tags,
        (acc, tagId) => {
          const resolvedTag = _find(TAGS, { id: tagId });

          if (resolvedTag) {
            acc.push(resolvedTag);
          }

          return acc;
        },
        []
      ),
    [tags]
  );

  return (
    <div className="flex flex-col gap-1">
      <div style={{ lineHeight: "16px", fontSize: "14px" }}> {mailId}</div>
      <div className="flex gap-1">
        {_map(resolvedTags, (tag) => (
          <Tag
            onActionClick={() => onRemoveTag(tag.id)}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  height: "14px",
                  margin: "0px",
                  padding: "8px",
                }),
              },
              ActionIcon: {
                style: ({ $theme }) => ({
                  height: "10px",
                  width: "10px",
                }),
              },
              Action: {
                style: ({ $theme }) => ({
                  height: "10px",
                  width: "10px",
                  marginLeft: "4px",
                }),
              },
            }}
            kind={KIND.custom}
            color={`#${tag.color}`}
          >
            <div style={{ lineHeight: "14px", fontSize: "12px" }}>
              {tag.label}
            </div>
          </Tag>
        ))}
      </div>
      <div style={{ lineHeight: "14px", fontSize: "12px", color: "grey" }}>
        {" "}
        {subject}
      </div>
    </div>
  );
};
