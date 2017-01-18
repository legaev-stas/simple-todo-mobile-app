import React from 'react';
import Checkbox from '../../components/forms/checkbox';
import InputGroup from '../../components/forms/input-group';

const Header = ({title, showDone, changeSearch, resetSearch, doneToggle}) => (
    <div className="header cf">
        <h1 className="left">To-Do List</h1>

        <div className="search-bar right">
            <Checkbox
                checked={showDone}
                onChange={(e) => doneToggle(e.target.checked)}
            >Show done</Checkbox>
            <InputGroup
                type="text"
                icon="clear-left"
                placeholder="Search"
                value={title}
                onChange={(e) => changeSearch(e.target.value)}
                onReset={resetSearch}
            />
        </div>
    </div>
);

export default Header;
