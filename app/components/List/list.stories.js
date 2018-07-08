import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './index';
import {array} from '@storybook/addon-knobs';

storiesOf('Elements', module).add('List', () => (
  <List data={array("data", [["elem1","elem2","elem3"]])} header={array("header", ["Row1","Row2","Row3"])}></List>
));