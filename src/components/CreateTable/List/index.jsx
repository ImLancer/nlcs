
import PropTypes from 'prop-types';
import React from 'react';
import { object } from 'yup/lib/locale';
import './index.css';

listItem.propTypes = {
    onClick: PropTypes.func,
    Items: PropTypes.array,
}

listItem.defaultProps = {
    onClick: null,
    Items: [],
    fakeItems: [],
    isSort: false,
    Temp: object,
}

function listItem(props) {
    const { Items } = props;

    let fakeItems = [...Items];

    return (
        <tbody>
            {
                fakeItems.map( item => (
                    <tr>
                        <th scope="row">{fakeItems.indexOf(item)+1}</th>
                        <td>{item.itemName}</td>
                        <td className="textCenter">{item.itemAmount}</td>
                        <td className="textCenter">{item.itemValue}</td>
                        <td className="textCenter">{item.itemWeight}</td>
                        <td className="textCenter">{item.itemUnit}</td>
                    </tr>
                    )
                )
            }
        </tbody>
    )
}

export default listItem
