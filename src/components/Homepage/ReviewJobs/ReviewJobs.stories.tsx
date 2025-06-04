import type { Meta, StoryObj } from "@storybook/react";
import ReviewJobs from "./ReviewJobs";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof ReviewJobs> = {
  title: "Admin/ReviewJobs",
  component: ReviewJobs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ReviewJobs>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <ReviewJobs />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
