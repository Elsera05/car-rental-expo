import * as React from 'react';
import renderer from 'react-test-renderer';
import CarList from '../CarList'

it('CarList renders correctly', () => {
    const tree = renderer.create(
        <CarList
        image={require ("@/assets/images/img_photo.png")}
        carName= {"Innova"}
        passengers={5}
        baggage={4}
        price={'50000'}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});