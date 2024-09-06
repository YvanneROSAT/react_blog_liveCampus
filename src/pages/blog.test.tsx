import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Blog from '@/pages/blog';
import { useFetch } from '@/hook/api';

// Mock the useFetch hook
vi.mock('@/hook/api', () => ({
  useFetch: vi.fn(),
}));

// Mock the HeroSection and CardPost components
vi.mock('@/components/heroSection', () => ({
  __esModule: true,
  default: () => <div>HeroSection</div>,
}));

vi.mock('@/components/cardPost', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe('Blog Page', () => {
  it('renders loading state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching posts',
    });

    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Error fetching posts')).toBeInTheDocument();
  });

  it('renders posts', () => {
    const posts = [
      {
        slug: 'post-1',
        title: 'Post 1',
        author: 'Author 1',
        summary: 'Summary 1',
        category: 'Category 1',
        created_at: '2023-10-01T00:00:00Z',
      },
      {
        slug: 'post-2',
        title: 'Post 2',
        author: 'Author 2',
        summary: 'Summary 2',
        category: 'Category 2',
        created_at: '2023-10-02T00:00:00Z',
      },
    ];

    mockUseFetch.mockReturnValue({
      data: posts,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(screen.getByText('HeroSection')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });
});