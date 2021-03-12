import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'reactstrap';
import './index.css';
import List from './List';

CreateTable.propTypes = {
    title: PropTypes.string,
}

CreateTable.defaultProps = {
    title: '',
}

function CreateTable(props) {
    const { Items } = props;

    return (
        <Table striped responsive hover size="sm"  >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th className="textCenter">Item Amount</th>
                    <th className="textCenter">Item Value</th>
                    <th className="textCenter">Item Weight</th>
                    <th className="textCenter">Item Unit</th>
                </tr>
            </thead>
            <List Items={Items} />
        </Table>
    )
}

export default CreateTable
