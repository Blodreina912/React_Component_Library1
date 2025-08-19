import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

// Define sample data and columns to be used in the stories
const sampleColumns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "city", title: "City", dataIndex: "city", sortable: false },
];

const sampleData = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "London" },
  { name: "Charlie", age: 35, city: "Paris" },
  { name: "David", age: 40, city: "Tokyo" },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [], // When loading, the data prop should be an empty array
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
