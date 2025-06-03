import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Shared/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/listing']}>
      <Routes>
        <Route path="/listing" element={<SearchBar />} />
      </Routes>
    </MemoryRouter>
  ),
};
