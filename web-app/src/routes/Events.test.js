/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

import Events from './Events'

test('Events', () => {
    render(<Events />);
    const linkElement = screen.getByText('Events');
    expect(linkElement).toBeInTheDocument();
    });

test('My Events', () => {
    render(<Events />);
    const linkElement = screen.getByText('My Events');
    expect(linkElement).toBeInTheDocument();
    });

test('Create an Event', () => {
    render(<Events />);
    const linkElement = screen.getByText('Create an Event');
    expect(linkElement).toBeInTheDocument();
    });

test('Create Event', () => {
    render(<Events />);
    const linkElement = screen.getByText('Create Event');
    expect(linkElement).toBeInTheDocument();
    });

test('Click Event to Sign Up', () => {
    render(<Events />);
    const linkElement = screen.getByText('Click Event to Sign Up');
    expect(linkElement).toBeInTheDocument();
    });
    