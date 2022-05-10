/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import Signup from './Signup'

test('Signup page', () => {
    render(<Signup />);
    const linkElement = screen.getByText('Signup!');
    expect(linkElement).toBeInTheDocument();
    });

test('Signup button', () => {
    render(<Signup />);
    const linkElement = screen.getByText('Signup');
    expect(linkElement).toBeInTheDocument();
    });

test('login button', () => {
    render(<Signup />);
    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
    });