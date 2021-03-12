import AddItemForm from 'components/AddItemForm';
import Banner from 'components/Banner';
import CreateTable from 'components/CreateTable';
import Layout from 'components/Layout';
import LoadFileForm from 'components/LoadFileForm';
import QuaVaForm from 'components/QuaVaForm';
import ShowResultForm from 'components/ShowResultForm';
import SolveGrTable from 'components/SolveGrTable';
import SolveBbTable from 'components/SolveBbTable';
import Sort from 'components/Sort';
import SolveBag from 'features/Greedy/components/SolveBag';
import { addSession, checkBag3, setBb, setGr, setNotSort } from 'features/Greedy/greedySlice';
import { addItem } from 'features/Greedy/itemSlice';
import { addSortItem, setGrLastW, setBbLastW } from 'features/Greedy/sortItemSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Label, Row } from 'reactstrap';
import "./index.css";

MainPage.propTypes = {};

function MainPage(props) {
    const dispatch = useDispatch();
    const items = useSelector(state =>  state.items);
    const grLastW = useSelector(state => state.sortItem.grLastW);
    const bbLastW = useSelector(state => state.sortItem.bbLastW);
    const GLNTT = useSelector(state => state.sortItem.GLNTT)
    const grTGT = useSelector(state => state.sortItem.grTGT);
    const bbTGT = useSelector(state => state.sortItem.bbTGT);
    const isBb = useSelector(state => state.session.isBb);
    const isGr = useSelector(state => state.session.isGr);
    const isBag3 = useSelector(state => state.session.isBag3);
    const isByHand = useSelector(state => state.session.isByHand)
    const session = useSelector( state => state.session.session );
    const sortItem = useSelector( state => state.sortItem.sortItem);
    const sortComplete = useSelector( state => state.sortItem.isSort );
    const solveComplete = useSelector(state => state.sortItem.isSolve);
    const isNotSort = useSelector(state => state.session.isNotSort);
    const rootWeight = useSelector(state => state.session.session.weight);
    

    let quantity = null;
    let weight = null;
    let key = 0;

    function handleLoadFileForm(values){
        let listItem;
        if( localStorage.length > 0 ){
            listItem = JSON.parse(localStorage.getItem(`session${localStorage.length-1}`))
            console.log(listItem.items,listItem.session);
        
            let previousSession = {
                key: listItem.session.key,
                session: listItem.session.session,
                weight: listItem.session.weight,
                quantity: listItem.session.quantity
            }
    
            let previousAction = addSession(previousSession);
            dispatch(previousAction);
        }

        const reader = new FileReader();
        reader.onload = function () {
            const lines = reader.result.split('\n')
            let numOfSession = session.length;

            let tempSession = lines[0].split(' ');
            let weight = Number(tempSession[1])
            let mainSession = {
                key: session.length,
                session: session.length,
                quantity: Number(tempSession[0]),
                weight: weight
            }
            let sessionAction = addSession(mainSession);
            dispatch(sessionAction);

            let lastWAction = setGrLastW(Number(tempSession[1]));
            dispatch(lastWAction);
            let lastWAction1 = setBbLastW(Number(tempSession[1]));
            dispatch(lastWAction1);

            let tempItem = lines.slice(1);
            let t = tempItem.map((line,index) => {
                let temp = line.split(' ');
                let n = temp.length;
                let name = temp.slice(0,n-3);
                let valuesChange = {
                    itemName: name.join(' '),
                    itemAmount: Number(temp[n-3]),
                    itemValue: Number(temp[n-2]),
                    itemWeight: Number(temp[n-1]),
                    itemUnit: Number(temp[n-2])/ Number(temp[n-1]),
                    grResult: 0,
                    bbResult: 0,
                    key: index,
                    ofSession: numOfSession,
                }
                const action = addItem(valuesChange);
                const actionSort = addSortItem(valuesChange);
                dispatch(action);
                dispatch(actionSort);
            })

        }
        reader.readAsText(values.thing);

        let actionNotSort = setNotSort(true);
        dispatch(actionNotSort);
    }
    
    function handleQuavaSubmit(values){
        let valuesChange = {...values}
        valuesChange.quantity = Number(valuesChange.quantity);
        valuesChange.weight = Number(valuesChange.weight);

        if( session.length > 0 ){
            key = session[session.length-1].session + 1;
        }
        valuesChange.key = key;
        valuesChange.session = key;
        
        let action = addSession(valuesChange);
        dispatch(action);

        let tempAction = setGrLastW(valuesChange.weight);
        dispatch(tempAction);
        
        let checkBagAction
        if( valuesChange.subjectId === 2 ) {
            checkBagAction = checkBag3(true);
            dispatch(checkBagAction);
        };
    }

    function handleAddItemSubmit(values){
        let valuesChange = {...values}
        valuesChange.itemAmount = Number(valuesChange.itemAmount);
        valuesChange.itemWeight = Number(valuesChange.itemWeight);
        valuesChange.itemValue = Number(valuesChange.itemValue);
        valuesChange.grResult = 0;
        valuesChange.bbResult = 0;
        valuesChange.ofSession = key;
        valuesChange.Key = items.length
        if(session.length > 0){
            valuesChange.weight = rootWeight;
        }
         
        
        if( session.length > 0 ){
            key = session[session.length-1].session;
        };

        const action = addItem(valuesChange);
        const actionSort = addSortItem(valuesChange);
        dispatch(action);
        dispatch(actionSort);
    }

    function handleShowResultForm(values){
        if( values.algorithmId === 1 ){
            let action1 = setGr(true);
            let action2 = setBb(false);
            dispatch(action1);
            dispatch(action2);
        } else if( values.algorithmId === 2 ){
            let action1 = setGr(false);
            let action2 = setBb(true);
            dispatch(action1);
            dispatch(action2);
        } else if( values.algorithmId === 3 ){
            let action1 = setGr(true);
            let action2 = setBb(true);
            dispatch(action1);
            dispatch(action2);
        }
    }

    if(session.length > 0){
        quantity = session[0].quantity;
        weight = session[0].weight;
    }

    if( items.length === quantity && isByHand ){
        let actionNotSort = setNotSort(true);
        dispatch(actionNotSort);
    }

    return (
        <div>
            <Banner title="" />

            <Layout>
                <Row className="padding">
                    <Col 
                        sm={{ size: '2' }}
                        className="inputLeft" 
                    >
                        { !isByHand && !sortComplete && <Label className="loadfile">Enter your file: </Label> }
                        { !isByHand && !sortComplete && <LoadFileForm onSubmit={handleLoadFileForm} /> }
                        { isByHand && !sortComplete && <QuaVaForm onSubmit={handleQuavaSubmit} />}
                    </Col>
                    <Col sm={{ size: 7 }}>
                        { !sortComplete && <Label className="label">Table with User's input Values:</Label> }
                        { sortComplete && <Label className="label">Table with Values was Sorted:</Label> }
                        { !sortComplete && <CreateTable Items={items} />}
                        { sortComplete && <CreateTable Items={sortItem} />}
                        { !solveComplete && "-------------------------------------------------------------------------------------------------------------------------------------" }
                        <Row>
                            <Col>
                                { !solveComplete && isGr && <Label className="loadfile">Greedy Result: </Label> }
                                { !solveComplete && isGr && <SolveGrTable items={sortItem} lastW={grLastW} weight={weight} tgt={grTGT} /> }
                            </Col>
                            <Col>
                                { !solveComplete && isBb && <Label className="loadfile">BrandAndBound Result: </Label> }
                                { !solveComplete && isBb && <SolveBbTable items={sortItem} lastW={bbLastW} weight={weight} tgt={bbTGT} /> }
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        { (items.length < quantity)  && <AddItemForm isBag3={isBag3} onSubmit={handleAddItemSubmit} /> }
                        { isNotSort && !sortComplete && <Sort sortItem={sortItem} dispatch={dispatch} /> }
                        { solveComplete && sortComplete && <SolveBag sortItem={sortItem} weight={weight} GLNTT={GLNTT} dispatch={dispatch} /> }
                        { !solveComplete && <ShowResultForm items={items} session={session} onSubmit={handleShowResultForm} /> }
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}

export default MainPage
