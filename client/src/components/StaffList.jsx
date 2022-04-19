import React, { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Avatar,
  Switch,
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  X,
} from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ButtonCopy } from "./Clipboard";
import { adminAssignAction, viewAllStaffAction } from "../actions/staffAction";
import { showNotification, updateNotification } from "@mantine/notifications";
import { ADMIN_ASSIGN_RESET } from "../constants/staffConstant";

const useStyles = createStyles(theme => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter(item =>
    keys.some(
      key =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(query)
    )
  );
}

function sortData(data, payload) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export const StaffList = ({ data, staff }) => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const setSorting = field => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = event => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const dispatch = useDispatch();

  const adminAssign = useSelector(state => state.adminAssign);
  const { loading, success, error } = adminAssign;

  useEffect(() => {
    if (loading) {
      showNotification({
        id: "assign",
        loading: loading,
        title: "Updating staff status",
        message: "Please be patient",
        autoClose: false,
        disallowClose: true,
      });
    }
    if (success) {
      updateNotification({
        id: "assign",
        autoClose: 2000,
        title: "Happy",
        message: "Staff has been promoted/demoted",
        color: "green",
        icon: <Check />,
      });
      dispatch(viewAllStaffAction());
      dispatch({ type: ADMIN_ASSIGN_RESET });
    }

    if (error) {
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "wtf",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: ADMIN_ASSIGN_RESET });
    }
  }, [dispatch, error, loading, success]);

  const test = id => {
    dispatch(adminAssignAction(id));
  };

  const rows = sortedData.map(row => (
    <tr key={row._id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={row.image} radius={30} />
          <Text size="sm" weight={500}>
            {row.lName + " " + row.fName}
          </Text>
        </Group>
      </td>
      <td style={{ width: 340 }}>
        <Group position="apart">
          {row.email.length > 40
            ? row.email.substring(0, 40) + "..."
            : row.email}
          <ButtonCopy ctrlc={row.email} />
        </Group>
      </td>
      <td style={{ width: 160 }}>{dayjs(row.dob).format("MMM D, YYYY")}</td>
      <td style={{ width: 120 }}>{row.gender}</td>
      <td style={{ width: 100 }}>
        <Switch
          size="md"
          checked={row.isAdmin}
          onChange={() => test(row._id)}
          disabled={userInfo?.email === row.email}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <TextInput
        style={{ width: "90%" }}
        placeholder="Search by any field"
        mb="md"
        icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea style={{ flex: "0.84", width: "90%" }}>
        <Table
          verticalSpacing="sm"
          sx={{ minWidth: 800 }}
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "lName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lName")}
              >
                Staff Name
              </Th>

              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "dob"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dob")}
              >
                Birthday
              </Th>
              <Th
                sorted={sortBy === "gender"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("gender")}
              >
                Gender
              </Th>
              <th>
                <Text size="sm" weight={500}>
                  Is Admin?
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={staff ? 6 : 5}>
                  <Text mt="xl" weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
