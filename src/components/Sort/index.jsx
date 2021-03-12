import { setSortComplete, swapSortItem } from 'features/Greedy/sortItemSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import './index.scss';

sort.propTypes = {
  onClick: PropTypes.func,
}

sort.defaultProps = {
  onClick: null,
  fakeItems: [],
  isSort: false,
}

function sort(props) {
  const { sortItem, dispatch } = props
  let Items = [...sortItem]

  function sortSelector(Items, dispatch){

    if( Items.length > 1 ) {
        for (let i = 0 ; i <= Items.length-2 ; i++) {
            let key = i;
            for ( let j = i+1 ; j <= Items.length-1 ; j++ ) {
                if( Items[key].itemUnit < Items[j].itemUnit ){
                    key = j;
                }
            }
            
            let kTemp = {...Items[key]};
            let iTemp = {...Items[i]}
            
            Items = Items.slice(0,i).concat(kTemp).concat(Items.slice(i+1))
            Items = Items.slice(0,key).concat(iTemp).concat(Items.slice(key+1))
        }
    }

    let action = swapSortItem(Items);
    dispatch(action)

    let sortCompleteAction = setSortComplete(true);
    dispatch(sortCompleteAction)
  }

  return (
    <div><Button className="button" color="info" onClick={() => sortSelector(Items, dispatch)}>Sort</Button></div>
  )
}

export default sort
