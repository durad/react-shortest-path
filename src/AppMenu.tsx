import React from 'react';
import { AppMode } from './App';
import './AppMenu.scss';

interface AppMenuProps {
  appMode: AppMode;
  onSelect: (mode: AppMode) => void;
}

export const AppMenu: React.FC<AppMenuProps> = ({ appMode, onSelect }) => {
  return (
    <div className="app-menu-component">
      <div className={`btn set-block ${appMode === AppMode.SET_BLOCK ? 'selected' : ''}`} onClick={() => onSelect(AppMode.SET_BLOCK)}>Set</div>
      <div className={`btn remove-block ${appMode === AppMode.REMOVE_BLOCK ? 'selected' : ''}`} onClick={() => onSelect(AppMode.REMOVE_BLOCK)}>Remove</div>
      <div className={`btn set-start ${appMode === AppMode.SET_START ? 'selected' : ''}`} onClick={() => onSelect(AppMode.SET_START)}>Start</div>
      <div className={`btn set-end ${appMode === AppMode.SET_END ? 'selected' : ''}`} onClick={() => onSelect(AppMode.SET_END)}>End</div>
    </div>
  );
}

