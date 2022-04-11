import {
  createStyles,
  Paper,
  Text,
  Box,
  UnstyledButton,
  Group,
  ScrollArea,
  TextInput,
  Avatar,
  NativeSelect,
  MultiSelect,
  Button,
  Modal,
  Image,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Binary,
  Book,
  CalendarEvent,
  Check,
  CloudFog,
  Edit,
  Hash,
  Logout,
  Mail,
  Trash,
  User,
  UserOff,
  Users,
  X,
} from "tabler-icons-react";
import { courseListAction } from "../actions/courseAction";
import { updateStaffProfile } from "../actions/staffAction";
import { updateStudentProfile } from "../actions/studentAction";
import { DropImage } from "../components/DropImage";
import { UPLOAD_IMAGE_RESET } from "../constants/uploadConstant";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
import { usePrevious } from "../hooks/usePrevious";

const links = [
  { link: "/edit", label: "Edit Profile", icon: Edit },
  { link: "/reset-password", label: "Reset Password", icon: Binary },
  { link: "/deactivate-account", label: "Deactivate Account", icon: UserOff },
];

const useStyles = createStyles(theme => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    position: "relative",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  paper: {
    height: "88vh",
    width: "78%",
    display: "flex",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 3px",
  },

  nav: {
    height: "100%",
    flex: "0.25 0 52px",
    borderRight: "2px solid #f1f1f1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navButton: {
    width: "100%",
    height: "60px",
    backgroundColor: "#ffffff",
    padding: "20px",

    "&:hover": {
      backgroundColor: "#FAFBFC",
      borderLeft: "3px solid #ADB5BD",
      padding: "20px 20px 20px 17px",
    },
  },

  linkActive: {
    borderLeft: "3px solid #666666",
    backgroundColor: "#FAFBFC",
    padding: "20px 20px 20px 17px",

    "&:hover": {
      borderLeft: "3px solid #666666",
      padding: "20px 20px 20px 17px",
    },
  },

  content: {
    height: "100%",
    flex: 0.75,
  },

  editInput: {
    padding: "40px",
  },

  imageLink: {
    fontSize: "14px",
    color: "#427AEB",
  },

  updateSubmit: {
    height: "24vh",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  imagePlaceholder: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "80px",
  },
}));

const Profile = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Edit Profile");
  const [toggle, setToggle] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const dispatch = useDispatch();

  const courseList = useSelector(state => state.courseList);
  const { error: courseErr, courses } = courseList;

  const prevCourse = usePrevious(courses);
  useEffect(() => {
    if (courses?.length === 0 && prevCourse !== courses)
      dispatch(courseListAction());
  }, [courses, courseErr, dispatch, prevCourse]);

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo: logInfo } = userLogin;

  let userInfo = regInfo?.course ? regInfo : logInfo;

  const form = useForm({
    initialValues: {
      image: userInfo?.image,
      fname: userInfo?.fname,
      lname: userInfo?.lname,
      dob: new Date(userInfo?.dob),
      course: userInfo?.course,
    },
  });

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
    userInfo: updateInfo,
  } = userUpdateProfile;

  useEffect(() => {
    if (updateSuccess && updateInfo) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setTempImage("");
      showNotification({
        title: "Happy",
        message: "Profile has been updated successfully",
        color: "green",
        icon: <Check />,
      });
    }

    if (updateError) {
      showNotification({
        title: "Sad",
        message: "Profile is not updated. Please try again later",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, updateError, updateSuccess]);

  const imageUpload = useSelector(state => state.imageUpload);
  const { image, success, error: imageError } = imageUpload;

  useEffect(() => {
    if (success) {
      if (image) {
        dispatch({ type: UPLOAD_IMAGE_RESET });
        setTempImage(image.url);
        showNotification({
          title: "Happy",
          message: "Image has been uploaded successfully",
          color: "green",
          icon: <Check />,
        });
      }
    }

    if (imageError) {
      showNotification({
        title: "Sad",
        message: "Image is not uploaded. Please try again later",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, image, imageError, success, tempImage]);

  const linkButtons = links.map(item => (
    <UnstyledButton
      key={item.link}
      className={cx(classes.navButton, {
        [classes.linkActive]: item.label === active,
      })}
      onClick={event => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <Group>
        <item.icon className={classes.linkIcon} />
        <Text>{item.label}</Text>
      </Group>
    </UnstyledButton>
  ));

  const data = courses?.courseList
    ? courses.courseList.map(v => ({
        value: v._id,
        label: v.courseName,
      }))
    : [];

  return (
    <div className={classes.wrapper}>
      <Modal
        centered
        opened={toggle}
        onClose={() => setToggle(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        size="800"
      >
        <Box>
          <Text size="lg" weight={600} mb="md">
            Select an Image
          </Text>
          {tempImage === "" ? (
            <Box py="lg">
              <DropImage />
            </Box>
          ) : (
            <Box className={classes.imagePlaceholder}>
              <Image
                p="sm"
                width={240}
                height={240}
                fit="contain"
                src={tempImage}
                withPlaceholder
              />

              <UnstyledButton onClick={() => setTempImage("")}>
                <Trash color="red" size={20} />
              </UnstyledButton>
            </Box>
          )}
          <Group position="right">
            <Button
              onClick={() => {
                form.setFieldValue("image", tempImage);
                setToggle(false);
              }}
            >
              Confirm
            </Button>
            <Button variant="outline" onClick={() => setToggle(false)}>
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
      <Paper className={classes.paper}>
        <Box className={classes.nav}>
          <Box>{linkButtons}</Box>
          <UnstyledButton
            className={classes.navButton}
            style={{ borderRadius: "0px 0px 0px 2px" }}
          >
            <Group>
              <Logout className={classes.linkIcon} color="red" size="20" />
              <Text color={"red"} weight={500}>
                Logout
              </Text>
            </Group>
          </UnstyledButton>
        </Box>
        <ScrollArea className={classes.content}>
          <Box className={classes.editInput}>
            <form
              onSubmit={e => {
                e.preventDefault();
                userInfo?.studentID
                  ? dispatch(
                      updateStudentProfile({
                        image: form.values.image,
                        fName: form.values.fname,
                        lName: form.values.lname,
                        dob: form.values.dob.toISOString(),
                        course: form.values.course,
                      })
                    )
                  : dispatch(
                      updateStaffProfile(
                        form.values.image,
                        form.values.fname,
                        form.values.lname,
                        form.values.dob.toISOString(),
                        form.values.course
                      )
                    );
              }}
            >
              {active === "Edit Profile" && (
                <>
                  <Group direction="column" grow>
                    <Group align="center">
                      <Avatar
                        size="xl"
                        radius="lg"
                        src={form.values.image}
                        alt="Profile Image"
                      />
                      <Group direction="column" align="left">
                        <Text mb="-sm" size="lg" weight={600}>
                          {form.values.lname + " " + form.values.fname}
                        </Text>
                        <UnstyledButton
                          onClick={() => {
                            setToggle(true);
                          }}
                          size="xs"
                          className={classes.imageLink}
                        >
                          Change Profile Picture
                        </UnstyledButton>
                      </Group>
                    </Group>
                    <Group position="apart" grow>
                      <TextInput
                        label="First Name"
                        required
                        value={form.values.fname}
                        onChange={() => form.setFieldValue("fname")}
                        {...form.getInputProps("fname")}
                        icon={<User size={16} />}
                      />
                      <TextInput
                        label="Last Name"
                        icon={<Users size={16} />}
                        value={form.values.lname}
                        onChange={() => form.setFieldValue("lname")}
                        {...form.getInputProps("lname")}
                        required
                      />
                    </Group>
                    <TextInput
                      label="Email"
                      icon={<Mail size={16} />}
                      value={userInfo?.email}
                      onChange={() => {}}
                    />
                    <DatePicker
                      label="Birthday"
                      icon={<CalendarEvent size={16} />}
                      required
                      placeholder="Select your birthday"
                      excludeDate={date => date => new Date()}
                      onFocus={false}
                      value={form.values.dob}
                      onChange={e => form.setFieldValue("dob", e)}
                      {...form.getInputProps("dob")}
                    />
                    {userInfo?.studentID ? (
                      <NativeSelect
                        data={data}
                        icon={<Hash size={14} />}
                        placeholder="Select your course"
                        label="Course"
                        value={form.values.course}
                        onChange={() => form.setFieldValue("course")}
                        {...form.getInputProps("course")}
                        required
                      />
                    ) : (
                      <MultiSelect
                        data={data}
                        icon={<Hash size={14} />}
                        placeholder="Select your course"
                        label="Course"
                        value={form.values.course}
                        onChange={() => form.setFieldValue("course")}
                        {...form.getInputProps("course")}
                        required
                      />
                    )}
                  </Group>
                  <Box className={classes.updateSubmit}>
                    <Button type="submit" loading={updateLoading}>
                      Update Profile
                    </Button>
                  </Box>
                </>
              )}
            </form>
            {active === "Reset Password" && <h1>fak</h1>}
            {active === "Deactivate Account" && <h1>fak</h1>}
          </Box>
        </ScrollArea>
      </Paper>
    </div>
  );
};

export default Profile;
