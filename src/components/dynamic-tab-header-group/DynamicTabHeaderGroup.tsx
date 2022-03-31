import React, { ChangeEvent, useState } from 'react';
import type { FC } from 'react';
import { Button, Divider, Tab, Tabs } from '@mui/material';

/**
 * Interfaces
 */
export interface TableTabHeaderGroupItem {
  key?: string;
  label?: string;
  value?: string;
  color?: 'inherit' | 'primary' | 'secondary';
  variant?: 'text' | 'outlined' | 'contained';
}

export interface TableTabHeaderGroup {
  value?: string;
  enabled?: boolean;
  tabHeaders?: TableTabHeaderGroupItem[];
  textColor?: 'inherit' | 'primary' | 'secondary';
  indicatorColor?: 'primary' | 'secondary';
  scrollButtons?: boolean | 'auto';
  variant?: 'scrollable' | 'standard' | 'fullWidth';
  margin?: number;
  onChangeHandler?: (event: ChangeEvent<{}>, value: string) => void;
}

const DynamicTabHeaderGroup: FC<TableTabHeaderGroup> = (props) => {
  const {
    indicatorColor,
    onChangeHandler,
    scrollButtons,
    textColor,
    variant,
    value,
    tabHeaders,
  } = props;

  const [currentTab, setCurrentTab] = useState<string>(value!);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);

    if (onChangeHandler) {
      onChangeHandler(event, value);
    }
  };

  const tabHeaderData = tabHeaders ? tabHeaders : [];

  return (
    <>
      <Tabs
        indicatorColor={indicatorColor ? indicatorColor : 'primary'}
        onChange={onChangeHandler ? onChangeHandler : handleTabsChange}
        scrollButtons={scrollButtons ? scrollButtons : 'auto'}
        textColor={textColor ? textColor : 'primary'}
        variant={variant ? variant : 'scrollable'}
        value={value}
      >
        {tabHeaderData.map((tabHeader) => (
          <Tab
            key={tabHeader.value}
            label={tabHeader.label}
            value={tabHeader.value}
          />
        ))}
      </Tabs>
      <Divider />
    </>
  );
};

export default DynamicTabHeaderGroup;
