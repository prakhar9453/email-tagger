//libs
import * as React from "react";
import dynamic from "next/dynamic";
import _map from "lodash/map";

//component
import { EmailItem } from "./EmailItem";
import { Tags } from "./TagComponent";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StyledTable, StyledCell } from "baseui/table";

//constants
import { EMAILS } from "@email-tagger/constants/Emails";

//hooks
import { useEmailActions } from "@email-tagger/hooks/useEmailActions";

const EmailTaggerList = () => {
  const [emails, setEmail] = React.useState(() => EMAILS);

  const actionHandler = useEmailActions({ setEmail });

  return (
    <div className="flex justify-center p-4">

      <StyledTable style={{ width: "50%" }}>
        {_map(emails, (email, rowIndex) => (
          <StyledCell
            className="w-full"
            style={{
              borderBottom: "1px",
              borderTop: "0px",
              borderRight: "0px",
              borderLeft: "0px",
              borderStyle: "solid",
              borderColor: "rgba(0, 0, 0, 0.12)",
            }}
          >
            <div className="flex flex-row justify-between w-full">
              <EmailItem
                {...email}
                rowIndex={rowIndex}
                actionHandler={actionHandler}
              />
              <Tags
                {...email}
                actionHandler={actionHandler}
                rowIndex={rowIndex}
              />
            </div>
          </StyledCell>
        ))}
      </StyledTable>
    </div>
  );
};

const EmailTaggerListNoSSR = () => (
  <StyletronProvider value={new Styletron()}>
    <BaseProvider theme={LightTheme}>
      <EmailTaggerList />
    </BaseProvider>
  </StyletronProvider>
);

export default dynamic(() => Promise.resolve(EmailTaggerListNoSSR), {
  ssr: false,
});
