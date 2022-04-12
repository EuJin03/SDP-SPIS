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
  Anchor,
  ActionIcon,
  Modal,
  Button,
  Divider,
  Box,
  Tooltip,
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Pencil,
  Trash,
  ExternalLink,
  Book2,
  FileUpload,
  UserPlus,
  X,
} from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { DELETE_TASK_RESET } from "../constants/assignmentConstant";
import { ButtonCopy } from "./Clipboard";
import {
  taskAssignAction,
  taskDeleteAction,
} from "../actions/assignmentAction";
import TaskEditModal from "./TaskEditModal";
import { Link } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import SubmitModal from "./SubmitModal";

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
        if (
          typeof a[payload.sortBy] === "number" ||
          typeof b[payload.sortBy] === "number"
        ) {
          return b[payload.sortBy] - a[payload.sortBy];
        } else {
          return b[payload.sortBy].localeCompare(a[payload.sortBy]);
        }
      }

      if (
        typeof a[payload.sortBy] === "number" ||
        typeof b[payload.sortBy] === "number"
      ) {
        return a[payload.sortBy] - b[payload.sortBy];
      } else {
        return a[payload.sortBy].localeCompare(b[payload.sortBy]);
      }
    }),
    payload.search
  );
}

export const TaskList = ({ data, staff }) => {
  const [remove, setRemove] = useState({ id: "", status: false });

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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

  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState("");
  const [submitId, setSubmitId] = useState("");
  const [comment, setComment] = useState("");

  const setEditModal = (bool, id) => {
    setToggle(bool);
    setEditId(id);
  };

  const setSubmitModal = (bool, id, comment) => {
    setToggle(bool);
    setSubmitId(id);
    setComment(comment);
  };

  const rows = sortedData.map(row => (
    <tr key={row._id}>
      <td>
        <Anchor
          size="sm"
          href={row.topicURL}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textDecoration: "none",
          }}
          rel="noopener noreferrer"
        >
          <Text size="sm" mr="md">
            {row.topicName.length > 50
              ? row.topicName.substring(0, 50) + "..."
              : row.topicName}
          </Text>
          <ExternalLink size={16} />
        </Anchor>
      </td>
      <td>
        {row.subjectName.length > 50
          ? row.subjectName.substring(0, 50) + "..."
          : row.subjectName}
      </td>
      {staff ? (
        <>
          <td style={{ width: 200 }}>
            {dayjs(row.due).format("MMM D, YYYY h:mm A")}
          </td>

          <td style={{ width: 200 }}>
            {dayjs(row.updatedAt).format("MMM D, YYYY h:mm A")}
          </td>
          <td style={{ width: 180 }}>
            <Group spacing={4} position="right">
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" style={{ marginRight: 2 }}>
                  {row.studentAssigned}
                </Text>
                <Tooltip
                  label="Assign"
                  withArrow
                  color="blue"
                  transition="skew-up"
                >
                  <ActionIcon
                    onClick={() =>
                      dayjs(row.due).diff(new Date()) > 0
                        ? dispatch(taskAssignAction(row._id))
                        : showNotification({
                            autoClose: 4000,
                            title: "Oops, the assignment is due",
                            message:
                              "You cannot assign this task to students anymore!",
                            color: "red",
                            icon: <X />,
                          })
                    }
                  >
                    <UserPlus size={16} />
                  </ActionIcon>
                </Tooltip>
              </Box>
              <Tooltip
                label="Grade"
                withArrow
                color="cyan"
                transition="skew-up"
              >
                <ActionIcon
                  component={Link}
                  to={`/assignments/grade?id=${row._id}&students=${row.studentAssigned}`}
                >
                  <Book2 size={16} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Edit" withArrow color="teal" transition="skew-up">
                <ActionIcon onClick={() => setEditModal(true, row._id)}>
                  <Pencil size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip
                label="Delete"
                withArrow
                color="pink"
                transition="skew-up"
              >
                <ActionIcon
                  color="red"
                  onClick={() => {
                    setRemove({ id: row._id, status: true });
                  }}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </td>
        </>
      ) : (
        <>
          <td style={{ width: 180 }}>
            <Group position="apart">
              {row.staffName.length > 20
                ? row.staffName.substring(0, 20) + "..."
                : row.staffName}
              <ButtonCopy ctrlc={row.staffEmail} />
            </Group>
          </td>
          <td
            style={{
              width: 200,
            }}
          >
            {dayjs(row.due).format("MMM D, YYYY h:mm A")}
          </td>
          <td style={{ width: 160 }}>
            {dayjs(row.due).diff(new Date()) >= 0
              ? `${Math.floor(
                  dayjs(row.due).diff(new Date(), "hours") / 24
                )} days ${
                  dayjs(row.due).diff(new Date(), "hours") -
                  Math.floor(dayjs(row.due).diff(new Date(), "hours") / 24) * 24
                } hours`
              : "-"}
          </td>
          <td style={{ width: 120 }}>
            {row.grade !== 0 ? row.grade.toString() : "Not graded"}
          </td>
          <td style={{ width: 50 }}>
            <Group spacing={0} position="right">
              <ActionIcon
                onClick={() => {
                  if (dayjs(row.due).diff(new Date()) > 0) {
                    setSubmitModal(true, row._id, row.comments);
                  } else if (
                    !row.submission &&
                    dayjs(row.due).diff(new Date()) < 0
                  ) {
                    showNotification({
                      autoClose: 4000,
                      title: "Oops, the assignment is due",
                      message: "You cannot submit the assignment anymore!",
                      color: "red",
                      icon: <X />,
                    });
                  }
                }}
              >
                <FileUpload
                  color={row.submission ? "green" : "#1C7ED6"}
                  size={20}
                />
              </ActionIcon>
            </Group>
          </td>
        </>
      )}
    </tr>
  ));

  const dispatch = useDispatch();

  /** DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE */
  const taskDelete = useSelector(state => state.taskDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = taskDelete;

  useEffect(() => {
    if (successDelete) {
      setRemove({ id: "", status: false });
      dispatch({ type: DELETE_TASK_RESET });
    }

    if (errorDelete) {
      setRemove({ id: "", status: false });
      dispatch({ type: DELETE_TASK_RESET });
    }
  }, [dispatch, errorDelete, successDelete]);

  const deleteTaskHandler = id => {
    dispatch(taskDeleteAction(id));
  };
  /** DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE */

  return (
    <>
      {editId !== "" && (
        <TaskEditModal
          key={editId}
          taskId={editId}
          editToggle={toggle}
          setEditToggle={setEditModal}
        />
      )}
      {submitId !== "" && (
        <SubmitModal
          key={submitId}
          submissionId={submitId}
          comment={comment}
          editToggle={toggle}
          setEditToggle={setSubmitModal}
        />
      )}
      <Modal
        opened={remove.status}
        onClose={() => setRemove({ id: "", status: false })}
        title="Are you sure to delete this assignment?"
        centered
        size="xs"
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Divider my="lg" />
        <Group position="right">
          <Button
            loading={loadingDelete}
            size="xs"
            onClick={() => deleteTaskHandler(remove.id)}
          >
            Confirm
          </Button>
          <Button
            onClick={() => setRemove({ id: "", status: false })}
            size="xs"
            variant="outline"
          >
            Cancel
          </Button>
        </Group>
      </Modal>

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
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ minWidth: 700 }}
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "topicName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("topicName")}
              >
                Topic
              </Th>

              <Th
                sorted={sortBy === "subjectName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subjectName")}
              >
                Subject
              </Th>

              {!staff && (
                <Th
                  sorted={sortBy === "staffName"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("staffName")}
                >
                  Uploaded By
                </Th>
              )}
              <Th
                sorted={sortBy === "due"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("due")}
              >
                Due Date
              </Th>

              {!staff && (
                <>
                  <th>
                    <Text size="sm" weight="600">
                      Time Remaining
                    </Text>
                  </th>
                  <Th
                    sorted={sortBy === "grade"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("grade")}
                  >
                    Grade
                  </Th>
                </>
              )}
              {staff && (
                <Th
                  sorted={sortBy === "updatedAt"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("updatedAt")}
                >
                  Last Modified
                </Th>
              )}
              <th />
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
