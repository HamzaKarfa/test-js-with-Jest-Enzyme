import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Layout from '../components/Layout';
import Home from '../components/Home';
import '../setUpTests';



//Créer un mock de Home
jest.mock("../components/Home", () => 'Home' )

describe('Layout snapshot',()=>{
    let layout
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        layout = shallow(
            <Layout />
          )
      });
      
    it('It renders without crashing', () => {
        //Créer le expect
        expect(
            renderer.create(<Layout />).toJSON()
        ).toMatchSnapshot()
    });

    it('It renders Home', () => {
        //Créer snapshot*
        expect(layout.find('Home')).toMatchSnapshot()
    });
    
});
