import calculatorReducers from '../reducers/calculatorReducers'
import configureStore from 'redux-mock-store'
import { addInputs , subtractInputs, fetchRandomNumber } from '../actions/calculatorActions'

describe('Calculator Reducers',() => {

    it('adds correctly', () => {
        let state = {
            output: 100
        };
        let action = {type:"ADD_INPUTS", output: 500};
        state = calculatorReducers(state, action);
        //Créer le expect      
        expect(action.output).toEqual(state.output);
     });

    it('delete correctly', () => {
        let state = {
            output:100
        };
        let action = {type:"SUBTRACT_INPUTS", output:50};
        state = calculatorReducers(state,action);
        //Créer le expect
        expect(action.output).toEqual(state.output);

    });
});