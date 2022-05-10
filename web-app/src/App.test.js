/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import App from './App';

test('welcome', () => {
    render(<App />);
    const linkElement = screen.getByText('Welcome!');
    expect(linkElement).toBeInTheDocument();
    });

test('login', () => {
    render(<App />);
    const linkElement = screen.getByText('Log In');
    expect(linkElement).toBeInTheDocument();
    });

test('signup', () => {
    render(<App />);
    const linkElement = screen.getByText('Signup');
    expect(linkElement).toBeInTheDocument();
    });
    