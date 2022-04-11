import React, { useRef } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { CloudUpload, X } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageAction } from "../actions/uploadAction";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles(theme => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

function getActiveColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black;
}

export function DropImage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef();

  const dispatch = useDispatch();

  const imageUpload = useSelector(state => state.imageUpload);
  const { loading } = imageUpload;

  const uploadFile = e => {
    dispatch(uploadImageAction(e[0]));
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={e => {
          uploadFile(e);
        }}
        onReject={() => {
          showNotification({
            autoClose: 5000,
            title: "Cannot accept the format:(",
            message: "Image is not acceptable or file size too large",
            color: "red",
            icon: <X />,
          });
        }}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
      >
        {status => (
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <CloudUpload size={50} color={getActiveColor(status, theme)} />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? "Drop image here"
                : status.rejected
                ? "Image must be less than 5mb"
                : "Upload Image"}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
              <i>all types of image</i> that are less than 3mb in size.
            </Text>
          </div>
        )}
      </Dropzone>

      <Button
        loading={loading}
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current()}
      >
        Select Image
      </Button>
    </div>
  );
}
