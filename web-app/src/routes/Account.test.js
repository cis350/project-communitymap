/**
* @jest-environment jsdom
*/

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import App from '../App';
import Account from './Account'

test('account', () => {
    render(<Account />);
    const linkElement = screen.getByText('Account');
    expect(linkElement).toBeInTheDocument();
    });

test('change email', () => {
    render(<Account />);
    const linkElement = screen.getByText('Change Email');
    expect(linkElement).toBeInTheDocument();
    });

test('change password', () => {
    render(<Account />);
    const linkElement = screen.getByText('Change Password');
    expect(linkElement).toBeInTheDocument();
    });

test('delete account', () => {
    render(<Account />);
    const linkElement = screen.getByText('Delete Account');
    expect(linkElement).toBeInTheDocument();
    });