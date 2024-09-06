import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import Posts from "@/pages/posts";
import { useFetch } from "@/hook/api";

// Mock the useFetch hook
vi.mock("@/hook/api", () => ({
  useFetch: vi.fn(),
}));

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("Posts Page", () => {
  it("renders loading state", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/posts/test-slug"]}>
        <Routes>
          <Route path="/posts/:slug" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching post",
    });

    render(
      <MemoryRouter initialEntries={["/posts/test-slug"]}>
        <Routes>
          <Route path="/posts/:slug" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Error: Error fetching post")).toBeInTheDocument();
  });

  it("renders post not found state", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/posts/test-slug"]}>
        <Routes>
          <Route path="/posts/:slug" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Post not found")).toBeInTheDocument();
  });

  it("renders post data", () => {
    const post = {
      title: "Test Post",
      author: "John Doe",
      created_at: "2023-10-01T00:00:00Z",
      content: "This is a test post content.",
    };

    mockUseFetch.mockReturnValue({
      data: post,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/posts/test-slug"]}>
        <Routes>
          <Route path="/posts/:slug" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("author: John Doe")).toBeInTheDocument();
    expect(screen.getByText("1/10/2023")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test post content.")
    ).toBeInTheDocument();
  });
});
