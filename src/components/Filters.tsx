import React from 'react';

const Filters = (props: any) => {
    return (
        <div>
            <label htmlFor="filter">Select UserId</label>
            <select
                name="userId"
                id="filter"
                onChange={(event) => props.onSelect(event)}
            >
                <option value="default">All</option>
                <option value="1">Selected 1</option>
                <option value="2">Selected 2</option>
                <option value="3">Selected 3</option>
            </select>
        </div>
    );
};

export default Filters;
