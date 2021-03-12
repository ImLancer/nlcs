
import PropTypes from 'prop-types';
import React from 'react';
import { object } from 'yup/lib/locale';
import './index.scss';


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
    const { Items, lastW, tgt, weight } = props;

    let fakeItems = [...Items];

    return (
        <tbody>
            {
                fakeItems.map( item => (
                    <tr>
                        <th scope="row">{fakeItems.indexOf(item)+1}</th>
                        <td>{item.itemName}</td>
                        <td className="textCenter">{item.grResult}</td>
                    </tr>
                    )
                )
            }
            {
                <tr>
                    <td className="textCenter" colSpan={2}>Total Weight</td>
                    <td className="textCenter">{weight}</td>
                </tr>
            }
            {
                <tr>
                    <td className="textCenter" colSpan={2}>Remaining Weight</td>
                    <td className="textCenter">{lastW}</td>
                </tr>
            }
            {
                <tr>
                    <td className="textCenter" colSpan={2}>Total Value</td>
                    <td className="textCenter">{tgt}</td>
                </tr>
            }
        </tbody>
    )
}

export default listItem
