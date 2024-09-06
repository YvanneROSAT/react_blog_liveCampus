import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/notFound';

describe('NotFound Page', () => {
  it('renders the 404 message', () => {
    render(<NotFound />);

    // Vérifie que le texte "404" est présent
    expect(screen.getByText('404')).toBeInTheDocument();

    // Vérifie que le texte "Page not found" est présent
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    render(<NotFound />);

    // Vérifie que le texte "404" a la classe "text-4xl font-bold text-red-500"
    const heading = screen.getByText('404');
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-red-500');

    // Vérifie que le texte "Page not found" a la classe "text-xl"
    const paragraph = screen.getByText('Page not found');
    expect(paragraph).toHaveClass('text-xl');
  });
});