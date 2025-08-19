// InputField.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["filled", "outlined", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "Please enter a valid email address.",
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    invalid: true,
    errorMessage: "This is an error message.",
    helperText: " ",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
