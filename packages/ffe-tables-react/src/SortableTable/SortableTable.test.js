import React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import SortableTable from './SortableTable';

describe('<SortableTable>', () => {
    const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
        { header: 'Employee-id', key: 'id' },
        { header: '', key: 'button' },
    ];

    const data = [
        {
            name: 'Zombie Mountain',
            age: 36,
            id: 2,
            button: <button>poke</button>,
        },
        {
            name: 'Daenerys Targaryen',
            age: 16,
            id: 4,
            button: <button>poke</button>,
        },
        { name: 'Ned Stark', age: 48, id: 3, button: <button>poke</button> },
        { name: 'Jon Snow', age: 20, id: 1, button: <button>poke</button> },
    ];

    const wrapper = render(<SortableTable columns={columns} data={data} />);

    it('should show right amount of th tags', () => {
        expect(wrapper.find('th')).to.have.length(columns.length);
    });

    it('should render a row for each data array entry', () => {
        expect(wrapper.find('tbody tr')).to.have.length(data.length);
    });

    it('should set data-th property on each cell rendered', () => {
        expect(wrapper.find('[data-th]')).to.have.length(
            data.length * columns.length,
        );
    });

    it('should add `aria-sort` property', () => {
        expect(wrapper.find('[aria-sort]')).to.have.length(columns.length);
    });

    it('should not show sorting arrow if header is blank string', () => {
        expect(
            wrapper.find('.ffe-sortable-table__sort-arrow').length,
        ).to.be.equal(columns.length - 1);
    });

    it('should show buttons in table when passing in buttons in data', () => {
        expect(wrapper.find('button').length).to.be.equal(data.length);
    });

    it('should call onSort after sorting table', () => {
        const onSort = sinon.spy();
        const table = shallow(
            <SortableTable columns={columns} data={data} onSort={onSort} />,
        );
        table.instance().tableHeaderClicked('name');
        sinon.assert.calledWith(
            onSort,
            sinon.match(val => {
                return (
                    'sortBy' in val && 'descending' in val && 'tableData' in val
                );
            }),
        );
    });

    describe('condensed', () => {
        it('should by default not be condensed', () =>
            expect(wrapper.find('.ffe-table--condensed')).to.have.length(0));

        const condensedWrapper = render(
            <SortableTable condensed={true} columns={columns} data={data} />,
        );

        it('can be condensed', () =>
            expect(condensedWrapper).to.have.length(1));
    });
});
