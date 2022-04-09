import { Tooltip, UnstyledButton } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { Copy } from "tabler-icons-react";

export function ButtonCopy({ ctrlc }) {
  const clipboard = useClipboard();
  return (
    <Tooltip
      label="copied!"
      gutter={5}
      placement="center"
      position="top"
      radius="xl"
      transition="slide-down"
      transitionDuration={200}
      opened={clipboard.copied}
    >
      <UnstyledButton
        mt="4px"
        radius="xl"
        size="sm"
        styles={{}}
        onClick={() => clipboard.copy(ctrlc)}
      >
        <Copy size={16} />
      </UnstyledButton>
    </Tooltip>
  );
}
