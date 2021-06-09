import { addInputs , subtractInputs, fetchRandomNumber } from '../actions/calculatorActions'
import configureStore from 'redux-mock-store';
import { shallow, mount, render } from 'enzyme';
import {Home} from '../components/Home';



const mockStore = configureStore();
const initialState = {output:0}
const store = mockStore(initialState);


describe('ACTIONS - Test calculatorActions',()=>{
    let wrapper
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
        wrapper = shallow(<Home />)
    });
    it('actionCreator addInputs', () => {
        const add = addInputs(50);
        //Créer le expect
        const expectedActions = [
            {
              'output': 50,
              'type': 'ADD_INPUTS',
            },
        ];
        store.dispatch(add);
        
        expect(store.getActions()).toEqual(expectedActions);

    });


    it('actionCreator subtractInputs', () => {
        const subtract = subtractInputs(-50);
        //Créer le expect
        const expectedActions = [
            {
              'output': -50,
              'type': 'SUBTRACT_INPUTS',
            },
        ];
        store.dispatch(subtract);
        expect(store.getActions()).toEqual(expectedActions);

    });

});

