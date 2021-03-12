import PropTypes from 'prop-types';
import React from 'react';
import { Button, Table } from 'reactstrap';
import './index.scss';
import SolveList from './SolveList';

SolveTable.propTypes = {
    title: PropTypes.string,
}

SolveTable.defaultProps = {
    title: '',
}

function SolveTable(props) {
    const { items, lastW, tgt, weight } = props;

    return (
        <div>
            <Table striped responsive hover size="sm"  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th className="textCenter">Result</th>
                    </tr>
                </thead>
                <SolveList Items={items} lastW={lastW} weight={weight} tgt={tgt} />
            </Table>
        </div>
    )
}

export default SolveTable
