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
  Avatar,
  Box,
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Pencil,
  Trash,
  ExternalLink,
  Checklist,
} from "tabler-icons-react";
import { ButtonCopy } from "./Clipboard";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import GradeModal from "./GradeModal";

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

export const GradeList = ({ data }) => {
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
  const [name, setName] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editComment, setEditComment] = useState("");

  const setEditModal = (bool, id, name, grade, comment) => {
    setToggle(bool);
    setEditId(id);
    setName(name);
    setEditGrade(grade);
    setEditComment(comment);
  };

  const rows = sortedData.map(row => (
    <tr key={row.assignments[0]._id}>
      <td style={{ width: "140px" }}>{row.studentID}</td>
      <td>{row.lName.substring(0, 28) + " " + row.fName.substring(0, 28)}</td>
      <td style={{ width: 160 }}>
        <Anchor
          size="sm"
          href={row.assignments[0].submissionFile}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textDecoration: "none",
          }}
          rel="noopener noreferrer"
        >
          <Text size="sm" mr="md">
            Submission
          </Text>
          <ExternalLink size={16} />
        </Anchor>
      </td>
      <td style={{ width: "180px" }}>
        {dayjs(row.updatedAt).format("MMM D, YYYY h:mm A")}
      </td>
      <td style={{ width: "120px" }}>
        {row.assignments[0].grade === 0
          ? "Not graded"
          : row.assignments[0].grade}
      </td>
      <td style={{ width: "200px" }}>
        {row.assignments[0].comments === ""
          ? "-"
          : row.assignments[0].comments.length > 20
          ? row.assignments[0].comments.substring(0, 20) + "..."
          : row.assignments[0].comments}
      </td>
      <td style={{ width: "40px" }}>
        <ActionIcon
          onClick={() =>
            setEditModal(
              true,
              row.assignments[0]._id,
              row.lName + " " + row.fName,
              row.assignments[0].grade,
              row.assignments[0].comments
            )
          }
        >
          <Checklist size="16" />
        </ActionIcon>
      </td>
    </tr>
  ));

  const dispatch = useDispatch();

  return (
    <>
      {editId !== "" && (
        <GradeModal
          key={editId}
          name={name}
          grade={editGrade}
          comment={editComment}
          editToggle={toggle}
          setEditToggle={setEditModal}
        />
      )}
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
                sorted={sortBy === "studentID"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("studentID")}
              >
                Student ID
              </Th>

              <Th
                sorted={sortBy === "lName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lName")}
              >
                Student Name
              </Th>
              <th>
                <Text size="sm" weight={500}>
                  Submission File
                </Text>
              </th>
              <Th
                sorted={sortBy === "updatedAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("updatedAt")}
              >
                Submitted On
              </Th>
              <Th
                sorted={sortBy === "assignments[0].grade"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("assignments[0].grade")}
              >
                Grade
              </Th>
              <th>
                <Text size="sm" weight={500}>
                  Comments
                </Text>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={7}>
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
