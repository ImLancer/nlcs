import 'features/Greedy/pages/Main/index.scss';
import { setGrLastW, setBbLastW, setListResult, setGrResult, setGrTGT, setBbTGT, solveComplete } from 'features/Greedy/sortItemSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';

solveBag.propTypes = {
    onSubmit: PropTypes.func,
    sortItem: PropTypes.array,
    W: PropTypes.number,
}

solveBag.defaultProps = {
    onSubmit: null,
    items: [],
    W: null,
}

function greedy(items, W, TGT, dispatch) {    
    let lastW = W;
    let tgt = TGT;

    for( let i = 0; i < items.length; i++ ){
        let result = Math.min( Math.floor(lastW/items[i].itemWeight),items[i].itemAmount);
        let actionResult = setGrResult( [i,result] );
        dispatch(actionResult);

        lastW -= result * items[i].itemWeight;
        let actionWeight = setGrLastW(lastW);
        dispatch(actionWeight);
        
        tgt += result * items[i].itemValue;
        let actionTGT = setGrTGT(tgt);
        dispatch(actionTGT);
    };
}

function bb(i, items, TGT, V, CT, GLNTT, x, dispatch) {
    TGT = TGT;
    let j;
    for( j = Math.min( Math.floor(V/items[i].itemWeight),items[i].itemAmount ); j >= 0; j-- ){
        
        TGT += j * items[i].itemValue;
        V -= j * items[i].itemWeight;
        if( i < items.length - 1 ){
            CT = TGT + V * items[i+1].itemUnit;
        }
        //console.log( TGT, V, CT, GLNTT, "first", j)
        if( CT > GLNTT ){
            let temp
            x[i] = j;
            if( (i === items.length-1) || (V === 0) ){
                if( TGT > GLNTT ){
                    GLNTT = TGT;
                    //dispatch GLNTT & phuong an ngay tai day
                    let action = setBbTGT(GLNTT);
                    dispatch(action);

                    let lastWAction = setBbLastW(V);
                    dispatch(lastWAction);

                    let listResultAction = setListResult(x);
                    dispatch(listResultAction);
                }
            }else{
                temp = bb(i+1, items, TGT, V, CT, GLNTT, x, dispatch);
                GLNTT = temp;
            }
        }
        x[i] = 0;
        TGT -= j*items[i].itemValue;
        V += j*items[i].itemWeight;
    }
    return GLNTT;
}

function solveBag(props) {
    const { sortItem, dispatch, weight } = props;
    let items = [...sortItem];
    let TGT = 0;
    let i=0;
    let W = weight;
    let x = [];
    let V = weight
    let CT = weight * items[0].itemUnit
    let GLNTT = 0;
    

    //console.log(listItems, W);

    return (
        <div><Button className="button" color="info" onClick={() => {
        bb(i, items, TGT, V, CT, GLNTT, x, dispatch)
        greedy(items, W, TGT, dispatch)
        let setSolve = solveComplete(false);
        dispatch(setSolve);
        } } >Solve</Button></div>
    )
}

export default solveBag
