import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  MultiSelect,
  NativeSelect,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import React, { useState } from "react";
import {
  Cake,
  Check,
  Hash,
  Lock,
  Man,
  User,
  Woman,
  X,
} from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import { Link } from "react-router-dom";

const PasswordRequirement = ({ meets, label }) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <Check /> : <X />} <Box ml={7}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach(requirement => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export const AccountDetails = ({ type, setType, form, error }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  return (
    <>
      <Paper
        radius="md"
        mb="xl"
        p="xl"
        withBorder
        style={{
          height: "520px",
          width: "600px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Text size="xl" weight={500}>
          Welcome to SPIS, Sign Up as
        </Text>

        <Group grow mb="md" mt="md" style={{ margin: "20px 0" }}>
          <Button
            type="button"
            variant={type === "student" ? "light" : "outline"}
            radius="sm"
            onClick={() => {
              setType("student");
              form.setFieldValue("email", "");
              form.setFieldValue("password", "");
              form.setFieldValue("confirmPassword", "");
              form.setFieldValue("course", "");
            }}
          >
            Student
          </Button>
          <Button
            type="button"
            variant={type === "staff" ? "light" : "outline"}
            radius="sm"
            onClick={() => {
              setType("staff");
              form.setFieldValue("password", "");
              form.setFieldValue("confirmPassword", "");
              form.setFieldValue("email", "");
              form.setFieldValue("course", []);
            }}
          >
            Staff
          </Button>
        </Group>

        <Divider
          label={`Sign Up as ${upperFirst(type)}`}
          labelPosition="center"
          mt="lg"
          style={{ margin: "40px 0" }}
        />
        <Group direction="column" grow mt="-md">
          <TextInput
            required
            label="Email"
            icon={<User size={16} />}
            placeholder={
              type === "student"
                ? "TP061195@mail.apu.edu.my"
                : "eugene@staffemail.apu.edu.my"
            }
            value={form.values.email}
            onChange={event =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            {...form.getInputProps("email")}
            error={
              error?.includes("email") || error?.includes("Empty")
                ? "Must be a valid APU authorized email"
                : error?.includes("Exist")
                ? "Email has already been registered"
                : null
            }
          />
          <Popover
            opened={popoverOpened}
            position="bottom"
            placement="start"
            withArrow
            styles={{ popover: { width: "100%" } }}
            trapFocus={false}
            transition="pop-top-left"
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
            target={
              <PasswordInput
                required
                description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 symbol"
                label="Password"
                icon={<Lock size={16} />}
                placeholder="Password"
                value={form.values.password}
                onChange={event =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                {...form.getInputProps("password")}
                error={error?.includes("Password must contain") ? error : null}
              />
            }
          >
            <Progress
              color={color}
              value={strength}
              size={5}
              style={{ marginBottom: 10 }}
            />
            <PasswordRequirement
              label="Includes at least 6 characters"
              meets={form.values.password.length > 5}
            />
            {checks}
          </Popover>
          <PasswordInput
            label="Confirm Password"
            required
            icon={<Lock size={16} />}
            placeholder="Confirm Password"
            value={form.values.confirmPassword}
            onChange={event =>
              form.setFieldValue("confirmPassword", event.currentTarget.value)
            }
            {...form.getInputProps("confirmPassword")}
            error={error?.includes("Password do not match") ? error : null}
          />
        </Group>
        <Group position="right">
          <Anchor
            component={Link}
            to={`/login`}
            tabIndex={1}
            type="button"
            sx={theme => ({
              paddingTop: 18,
              color:
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ],
              fontWeight: 500,
              fontSize: theme.fontSizes.xs,
            })}
          >
            Already have an Account? Login
          </Anchor>
        </Group>
      </Paper>
    </>
  );
};

export const PersonalDetails = ({ form, error }) => {
  return (
    <Paper
      radius="md"
      mb="xl"
      p="xl"
      withBorder
      style={{
        height: "520px",
        width: "600px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Text size="xl" weight={500}>
        Personal Details
      </Text>

      <Divider labelPosition="center" my="xl" />
      <Group direction="column" grow>
        <TextInput
          required
          label="First Name"
          placeholder="Tin"
          icon={<User size={16} />}
          value={form.values.fname}
          onChange={event =>
            form.setFieldValue("fname", event.currentTarget.value)
          }
          {...form.getInputProps("fname")}
          error={error?.includes("name") ? "Must not be blank" : null}
        />
        <TextInput
          required
          label="Last Name"
          placeholder="Eugene"
          icon={<User size={16} />}
          value={form.values.lname}
          onChange={event =>
            form.setFieldValue("lname", event.currentTarget.value)
          }
          {...form.getInputProps("lname")}
          error={error?.includes("name") ? "Must not be blank" : null}
        />
        <NativeSelect
          data={["Male", "Female"]}
          icon={
            form.values.gender === "Male" ? (
              <Man size={16} />
            ) : (
              <Woman size={16} />
            )
          }
          placeholder="Select your Gender"
          label="Gender"
          value={form.values.gender}
          onChange={event =>
            form.setFieldValue("gender", event.currentTarget.value)
          }
          {...form.getInputProps("gender")}
          required
          error={error?.includes("Gender") ? "Select your sex" : null}
        />

        <DatePicker
          label="Date of Birth"
          icon={<Cake size={16} />}
          required
          excludeDate={date => date => new Date()}
          placeholder="Select your birthday"
          value={form.values.dob}
          onChange={e => form.setFieldValue("dob", e)}
          {...form.getInputProps("dob")}
          error={!form.values.dob ? "Select your birthday" : null}
        />
      </Group>
    </Paper>
  );
};

export const RegisterForm = ({ type, form, courses, loading }) => {
  const data = courses.courseList.map(v => ({
    value: v._id,
    label: v.courseName,
  }));
  return (
    <Paper
      radius="md"
      mb="xl"
      p="xl"
      withBorder
      style={{
        height: "520px",
        width: "600px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
      }}
    >
      {loading && <LoadingOverlay visible={true} />}
      <Text size="xl" weight={500}>
        Select the course that you enrolled
      </Text>
      <Divider labelPosition="center" my="xl" />
      {type === "student" ? (
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
    </Paper>
  );
};
