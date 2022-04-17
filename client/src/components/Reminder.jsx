import {
  ActionIcon,
  Box,
  createStyles,
  Divider,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "tabler-icons-react";
import {
  addToReminder,
  removeFromReminder,
  viewReminder,
} from "../actions/dashboardAction";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
  },
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  content: {
    width: "100%",
    height: "20vh",
    margin: "14px 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  todo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #f1f1f1",
    padding: "6px 15px",
    borderRadius: "7px",
    marginBottom: "8px",
  },
}));

const Reminder = () => {
  const { classes } = useStyles();

  const [text, setText] = useState("");
  const [char, setChar] = useState(70);

  const dispatch = useDispatch();

  useEffect(() => {
    if (text !== "") {
      setChar(70 - text.length);
    }
  }, [text]);

  const reminder = useSelector(state => state.reminder);
  const { reminder: item, success } = reminder;

  useEffect(() => {
    if (!item) dispatch(viewReminder());

    if (success) dispatch(viewReminder());
  });

  const todo = item
    ? item.map((i, index) => (
        <Box key={index} className={classes.todo}>
          <Text size="sm" className={classes.todoText} lineClamp={1}>
            {index + 1}. {i}
          </Text>
          <ActionIcon>
            <Trash
              size="16px"
              color="red"
              onClick={() => dispatch(removeFromReminder(index))}
            />
          </ActionIcon>
        </Box>
      ))
    : null;

  return (
    <Box className={classes.wrapper}>
      <Box>
        <Text size="xl" weight={600}>
          Reminders
        </Text>
        <Divider my="sm" style={{ width: "100%" }} />
      </Box>
      <Box>
        <TextInput
          label={
            text === ""
              ? "Remind me"
              : `${char} characters remaining, Enter to add reminder`
          }
          placeholder="Do assignments..."
          classNames={classes}
          value={text}
          onChange={e => {
            if (char > 0) setText(e.target.value);
            if (char === 0) {
              setText(text.substring(0, 69));
            }
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              if (text !== "") {
                dispatch(addToReminder(text));
                setText("");
              }
            }
          }}
        />
        <ScrollArea className={classes.content}>{todo}</ScrollArea>
      </Box>
    </Box>
  );
};

export default Reminder;
