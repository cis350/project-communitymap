/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import Map from './Map'

test('Map', () => {
    render(<Map />);
    const linkElement = screen.getByText('Map');
    expect(linkElement).toBeInTheDocument();
    });