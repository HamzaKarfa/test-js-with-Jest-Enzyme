import React from 'react'
import { shallow, mount, render } from 'enzyme';

import HomeContainer,{Home} from '../components/Home';

import {Provider} from 'react-redux';
import '../setUpTests';


import {addInputs, subtractInputs} from '../actions/calculatorActions'
import {createStore} from 'redux'
import calculatorReducers from '../reducers/calculatorReducers'

describe('HOME snapshot',()=>{
    it('It renders without crashing', () => {
        //CRéer un snapshot test
        expect(Home).toMatchSnapshot();

    });

});

describe('HOME shallow description',()=>{
    let wrapper;
    const output = 10;

    //Permet avant chaque it de refaire un fresh shallow rendering
    // afin d'éviter les conflits avec les tests précédents
    beforeEach(()=>{
        wrapper = shallow(<Home output={output}/>)
    });

    it('Renders', () => {
       expect(wrapper.length).toEqual(1)
    });

    it('Contains header - h2', () => {
        //Créer le expect
        expect(wrapper.exists('h2')).toBeTruthy();
        // expect(wrapper.find('h2').get(0).props.children).toBeTruthy()
    });
    it('H2 header value ', () => {
        //Créer le expect
        expect(wrapper.find('h2').get(0).props.children).toEqual('Using React and Redux')
    });
    it('Contains input1', () => {
        // 
        //Créer le expect
        const input1 =  wrapper.find('input').first();
        expect(input1).toMatchSnapshot();

    });
    it('Contains input2', () => {
        //Créer le expect
       
        const input2 =  wrapper.find('input').at(1);
        expect(input2).toMatchSnapshot();
    });
     it('Contains output', () => {
         //Créer le expect
         const input3 =  wrapper.find('input').last();
         expect(input3).toMatchSnapshot();

    });
    it('Contains button with id="add"', () => {
        
        const addButton = wrapper.find("button#add");
        expect(addButton).toMatchSnapshot();

    });
    it('Contains button with id="subtract"', () => {
        //Créer le expect
        const  substractButton =  wrapper.find('button#subtract');
        expect(substractButton).toMatchSnapshot();
    });
});




describe('HOME connected to store',()=>{

    let store, wrapper;

    beforeEach(()=>{
        // On créé un store avec le reducer, cela nous permettra de dispatch une action et
        // de tester le lien entre le Container Home et le store
        store = createStore(calculatorReducers);
        // On créé un render avec shallow, on ajoute le  dive à la fin pour avoir accès
        // à un niveau supplémentaire du domTree
        // https://airbnb.io/enzyme/docs/api/ShallowWrapper/dive.html
        wrapper = mount( <Provider store={store}><HomeContainer /></Provider> );
    });

    it('Check store works', () => {

        //On dispatch une action addInput avec le store
        store.dispatch(addInputs(500));

        //Récupération du nouveau state après l'action
        wrapper = mount( <Provider store={store}><HomeContainer /></Provider> );

        //Nous récupérons dans le wrapper les informations du container Home
        const containerHome = wrapper.find(Home);
        //Nous Récupérons la prop output pour constater qu'elle a bien été mise à jour
        const outputProp = containerHome.prop('output');

        // Nous écrivons enfin l'assertion permettant de confirmer que la props output
        // A bien été modifiée en accord avec l'action dispatchée au store en ligne 81;
        expect(outputProp).toBe(500)
    });

});



describe('HOME mounted',()=>{

    let store, wrapper;
    const fetchRandomNumber = jest.fn().mockResolvedValue(145);


    beforeEach(()=>{
        store = createStore(calculatorReducers);
        wrapper = mount( <HomeContainer store={store} fetchRandomNumber={fetchRandomNumber}/>);
    });


    it('Calculate when Inputs are Filled and ADD is Clicked', () => {

        let input1 = wrapper.find('input').at(0);
        input1.instance().value = 20;

        let input2 = wrapper.find('input').at(1);
        input2.instance().value = 20;

        let addButton = wrapper.find('button').at(0);

        addButton.simulate('click');

        let output = wrapper.find('input').at(2);

        expect(output.prop('value')).toEqual(40);
    });


    it('Calculate when Inputs are Filled and ADD is Clicked', () => {
        let substractButton = wrapper.find('button').at(0);
    });

    it('fetch when asked', () => {

        let fetchButton = wrapper.find('button').at(2);

        fetchButton.simulate('click');

        setTimeout(checkValue, 100);

        function checkValue(){
            let input1 = wrapper.find('input').at(0);
            expect(input1.prop('value')).toEqual(145);
        }

    });


});