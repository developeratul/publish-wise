"use client";

import { useDeleteBlogContext } from "@/app/dashboard/providers/delete-blog";
import Icon from "@/components/Icon";
import {
  ActionIcon,
  Anchor,
  Badge,
  Breadcrumbs,
  Group,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useBlogContext } from "../BlogProvider";

export default function BlogHeader() {
  const { blog } = useBlogContext();
  const { openDeleteBlogModal } = useDeleteBlogContext();

  const handleDeleteDraft = () => {
    openDeleteBlogModal(blog.id);
  };

  return (
    <Group position="apart" mb="xl">
      <Breadcrumbs>
        <Anchor component={Link} href="/dashboard">
          Blogs
        </Anchor>
        <Text lineClamp={1}>{blog.title}</Text>
      </Breadcrumbs>
      <Group spacing="xl">
        <BlogSavingStatus />
        <Menu withArrow>
          <Menu.Target>
            <ActionIcon size="md">
              <Icon name="IconDots" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handleDeleteDraft} color="red" icon={<Icon name="IconTrash" />}>
              Delete draft
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}

function BlogSavingStatus() {
  const { isSaving, isSavingSuccess } = useBlogContext();
  const { colors } = useMantineTheme();
  if (isSaving) {
    return (
      <Badge color="blue" size="lg" variant="dot">
        Saving...
      </Badge>
    );
  }
  if (isSavingSuccess) {
    return (
      <Badge color="green" size="lg" variant="dot">
        Saved
      </Badge>
    );
  }
  return <></>;
}
