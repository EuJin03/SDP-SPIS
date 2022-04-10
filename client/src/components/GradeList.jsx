import React, { useState } from "react";
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
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Checklist,
} from "tabler-icons-react";
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

export const GradeList = ({ data }) => {
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
  const [studentID, setStudentID] = useState("");
  const [editGrade, setEditGrade] = useState(1);
  const [editComment, setEditComment] = useState("");

  const setEditModal = (bool, id, studentID, grade, comment) => {
    setToggle(bool);
    setEditId(id);
    setStudentID(studentID);
    setEditGrade(grade);
    setEditComment(comment);
  };

  const rows = sortedData.map(row => (
    <tr key={row.assignments[0]._id}>
      <td style={{ width: "140px" }}>{row.studentID}</td>
      <td>{row.lName.substring(0, 28) + " " + row.fName.substring(0, 28)}</td>
      <td style={{ width: 140 }}>
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
      <td style={{ width: "110px" }}>
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
              row.studentID,
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

  return (
    <>
      {editId !== "" && (
        <GradeModal
          key={editId}
          studentID={studentID}
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
                Name
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
