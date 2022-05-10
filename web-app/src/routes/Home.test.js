/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import App from '../App'
import Home from './Home'

test('Your Upcoming Events', () => {
    render(<Home />);
    const linkElement = screen.getByText('Your Upcoming Events');
    expect(linkElement).toBeInTheDocument();
    });

test('Google Map', () => {
    render(<Home />);
    const linkElement = screen.getByText('Google Map');
    expect(linkElement).toBeInTheDocument();
    });

test('Home', () => {
    render(<Home />);
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
    });