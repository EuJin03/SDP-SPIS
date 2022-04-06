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
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Pencil,
  Trash,
} from "tabler-icons-react";

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
        typeof item[key] === "string" &&
        item[key]?.toLowerCase().includes(query)
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
        return b[payload.sortBy]?.localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy]?.localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export const ResourceList = ({ data }) => {
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

  const rows = sortedData.map(row => (
    <tr key={row._id}>
      <td>
        <Anchor size="sm" href={row.topicURL}>
          {row.topicName}
        </Anchor>
      </td>
      <td>{row.subjectName}</td>
      <td>{row.staffName}</td>
      <td>{row.createdAt.substring(0, 10)}</td>
      <td colSpan={0.5}>
        <Group spacing={10} position="right">
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon color="red">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
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
              sorted={sortBy === "topic"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("topic")}
            >
              Topic
            </Th>

            <Th
              sorted={sortBy === "subject"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("subject")}
            >
              Subject
            </Th>
            <Th
              sorted={sortBy === "staff"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("staff")}
            >
              Uploaded By
            </Th>
            <Th
              sorted={sortBy === "date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("date")}
            >
              Uploaded Date
            </Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={5}>
                <Text mt="xl" weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};
