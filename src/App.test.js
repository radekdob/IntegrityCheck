import {render, screen} from '@testing-library/react';
import App from './App';

import React from "react";

test('renders empty div before first initialisation', () => {
    const {getByTestId} = render(<App/>);
    expect(getByTestId('router')).toBeFalsy();
});
