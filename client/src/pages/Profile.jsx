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
  Divider,
  Switch,
  Badge,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CalendarEvent,
  Check,
  Edit,
  Hash,
  Logout,
  Mail,
  Trash,
  User,
  UserOff,
  Users,
  Lock,
  ShieldLock,
  LockAccess,
  X,
} from "tabler-icons-react";
import { courseListAction } from "../actions/courseAction";
import { updateStaffProfile } from "../actions/staffAction";
import { logout, updateStudentProfile } from "../actions/studentAction";
import { DropImage } from "../components/DropImage";
import { UPLOAD_IMAGE_RESET } from "../constants/uploadConstant";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
import { usePrevious } from "../hooks/usePrevious";

const links = [
  { link: "/edit", label: "Edit Profile", icon: Edit },
  { link: "/reset-password", label: "Reset Password", icon: LockAccess },
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
    overflowY: "hidden",
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

  resetPassword: {
    height: "10vh",
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
  const [remove, setRemove] = useState(false);

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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    if (updateError) {
      showNotification({
        title: "Invalid Input",
        message: "Please check your input again!",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, updateError, updateInfo, updateSuccess]);

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

  const [checked, setChecked] = useState(userInfo.isActive);

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

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      <Modal
        opened={remove}
        onClose={() => setRemove(false)}
        title="Are you sure to logout?"
        centered
        size="xs"
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Divider my="lg" />
        <Group position="right">
          <Button size="xs" onClick={() => logoutHandler()}>
            Confirm
          </Button>
          <Button onClick={() => setRemove(false)} size="xs" variant="outline">
            Cancel
          </Button>
        </Group>
      </Modal>
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
            onClick={() => setRemove(true)}
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
                      updateStaffProfile({
                        image: form.values.image,
                        fName: form.values.fname,
                        lName: form.values.lname,
                        dob: form.values.dob.toISOString(),
                        course: form.values.course,
                      })
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
                      {userInfo?.studentID ? (
                        <Badge
                          mt="-lg"
                          color={userInfo?.isActive ? "green" : "red"}
                        >
                          {userInfo?.isActive ? "Active" : "Inactive"}
                        </Badge>
                      ) : (
                        <Badge
                          mt="-lg"
                          color={userInfo?.isAdmin ? "green" : "blue"}
                        >
                          {userInfo?.isAdmin ? "Admin" : "Staff"}
                        </Badge>
                      )}
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
                      onFocus={false}
                      excludeDate={date => date > new Date()}
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
            <form
              onSubmit={e => {
                e.preventDefault();
                userInfo?.studentID
                  ? dispatch(
                      updateStudentProfile({
                        oldPassword: form.values.oldPassword,
                        password: form.values.newPassword,
                        confirmPassword: form.values.confirmPassword,
                      })
                    )
                  : dispatch(
                      updateStaffProfile({
                        oldPassword: form.values.oldPassword,
                        password: form.values.newPassword,
                        confirmPassword: form.values.confirmPassword,
                      })
                    );
              }}
            >
              {active === "Reset Password" && (
                <>
                  <Text weight={600} size="xl">
                    Reset Password
                  </Text>
                  <Divider
                    label="reset password"
                    labelPosition="center"
                    my="md"
                  />
                  <Group direction="column" grow>
                    <TextInput
                      type="password"
                      label="Old Password"
                      required
                      value={form.values.oldPassword}
                      onChange={() => form.setFieldValue("oldPassword")}
                      {...form.getInputProps("oldPassword")}
                      icon={<ShieldLock size={16} />}
                    />
                    <TextInput
                      label="New Password"
                      required
                      type="password"
                      value={form.values.newPassword}
                      onChange={() => form.setFieldValue("newPassword")}
                      {...form.getInputProps("newPassword")}
                      icon={<Lock size={16} />}
                    />
                    <TextInput
                      label="Confirm Password"
                      required
                      type="password"
                      value={form.values.confirmPassword}
                      onChange={() => form.setFieldValue("confirmPassword")}
                      {...form.getInputProps("confirmPassword")}
                      icon={<Lock size={16} />}
                    />
                  </Group>

                  <Box className={classes.resetPassword}>
                    <Button type="submit" loading={updateLoading}>
                      Reset
                    </Button>
                  </Box>
                </>
              )}
            </form>
            {active === "Deactivate Account" && (
              <>
                <Text weight={600} size="xl">
                  Account Visibility
                </Text>
                <Divider
                  label="Disable Your Account?"
                  labelPosition="center"
                  my="md"
                />
                {userInfo?.studentID ? (
                  <>
                    <Text size="sm" color="red">
                      Disabling your account will prevent you from receiving
                      assignment from lecturers
                    </Text>
                    <Text size="sm" color="green">
                      You may reactivate it on future
                    </Text>
                    <Switch
                      my="xl"
                      label="Are you sure to enable/disable your account?"
                      checked={checked}
                      onChange={e => {
                        dispatch(
                          updateStudentProfile({
                            isActive: !checked ? "true" : "false",
                          })
                        );
                        setChecked(e.currentTarget.checked);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Text size="sm" color="red">
                      Staff are not allowed to disable account manually. Please
                      contact admin for assistant.
                    </Text>
                  </>
                )}
              </>
            )}
          </Box>
        </ScrollArea>
      </Paper>
    </div>
  );
};

export default Profile;
