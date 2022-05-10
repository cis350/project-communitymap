/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import App from '../App'
import Community from './Community'

test('Community', () => {
    render(<Community />);
    const linkElement = screen.getByText('Community');
    expect(linkElement).toBeInTheDocument();
    });

test('Join the chat', () => {
    render(<Community />);
    const linkElement = screen.getByText('Join the Chat');
    expect(linkElement).toBeInTheDocument();
    });

test('Connected users', () => {
    render(<Community />);
    const linkElement = screen.getByText('Connected Users');
    expect(linkElement).toBeInTheDocument();
    });

test('Previous messages', () => {
    render(<Community />);
    const linkElement = screen.getByText('Previous Messages');
    expect(linkElement).toBeInTheDocument();
    });

test('New Messages', () => {
    render(<Community />);
    const linkElement = screen.getByText('New Messages');
    expect(linkElement).toBeInTheDocument();
    });

test('Send', () => {
    render(<Community />);
    const linkElement = screen.getByText('Send');
    expect(linkElement).toBeInTheDocument();
    });
