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
} from "@mantine/core";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Pencil,
  Trash,
  ExternalLink,
} from "tabler-icons-react";
import { ButtonCopy } from "./Clipboard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resourceDeleteAction } from "../actions/resourceAction";
import ResourceEditModal from "./ResourceEditModal";
import { DELETE_RESOURCE_RESET } from "../constants/resourceConstant";

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

export const ResourceList = ({ data, staff, test }) => {
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

  const setEditModal = (bool, id) => {
    setToggle(bool);
    setEditId(id);
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
            {row.topicName.length > 65
              ? row.topicName.substring(0, 65) + "..."
              : row.topicName}
          </Text>
          <ExternalLink size={16} />
        </Anchor>
      </td>
      <td>{row.subjectName}</td>
      <td>{row.staffName}</td>
      <td>
        <Group position="apart">
          {row.staffEmail}
          <ButtonCopy ctrlc={row.staffEmail} />
        </Group>
      </td>
      <td>{row.createdAt.substring(0, 10)}</td>

      {staff && staff === row.staffEmail ? (
        <td>
          <Group spacing={10} position="right">
            <ActionIcon onClick={() => setEditModal(true, row._id)}>
              <Pencil size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                setRemove({ id: row._id, status: true });
              }}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  ));

  const dispatch = useDispatch();

  const resourceDelete = useSelector(state => state.resourceDelete);
  const { loading, success } = resourceDelete;

  useEffect(() => {
    if (success) {
      setRemove({ id: "", status: false });
      dispatch({ type: DELETE_RESOURCE_RESET });
    }
  }, [dispatch, success]);

  function deleteHandler(id) {
    dispatch(resourceDeleteAction(id));
  }

  return (
    <>
      {editId !== "" && (
        <ResourceEditModal
          key={editId}
          resourceId={editId}
          editToggle={toggle}
          setEditToggle={setEditModal}
        />
      )}
      <Modal
        opened={remove.status}
        onClose={() => setRemove({ id: "", status: false })}
        title="Are you sure to delete this resource?"
        centered
        size="xs"
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Divider my="lg" />
        <Group position="right">
          <Button
            loading={loading}
            size="xs"
            onClick={() => deleteHandler(remove.id)}
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
        style={{ width: "80%" }}
        placeholder="Search by any field"
        mb="md"
        icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea style={{ flex: "0.84", width: "80%" }}>
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
              <Th
                sorted={sortBy === "staffName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("staffName")}
              >
                Uploaded By
              </Th>
              <Th
                sorted={sortBy === "staffEmail"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("staffEmail")}
              >
                Staff Email
              </Th>
              <Th
                sorted={sortBy === "createdAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("createdAt")}
              >
                Uploaded Date
              </Th>
              {staff && <Th />}
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
