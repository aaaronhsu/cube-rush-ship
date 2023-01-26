import React from 'react';

import { Container, Text, Divider, Spacer, Flex, Button } from '@chakra-ui/react';

import Item from './Item';



export default class ItemList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: [{itemName: 'Holder Name', currentQuantity: 0, requiredQuantity: 0}],
        };
    }

    addItem = () => {
        let newItems = [...this.state.items];

        let newItem = {
            itemName: 'Holder Name',
            currentQuantity: 0,
            requiredQuantity: 0
        };
        newItems.push(newItem);

        this.setState({items: newItems});
    }


    renderAddItemButton = () => {
        return (
            <Button onClick={this.addItem}>Add Item</Button>
        );
    }

    renderProcessButton = () => {
        return (
            <Button onClick={() => this.props.nextPage(1)}>Process</Button>
        );
    }

    render() {
        return (
            <Container mt="50px" mb="0">

                <Text>List of Items</Text>
                <Divider mb="20px" />

                {
                    this.state.items.map(item => (
                        <span key={item.id}><Item></Item></span>
                    ))
                }

                <Flex>
                    {this.renderAddItemButton()}
                    <Spacer />
                    {this.renderProcessButton()}
                </Flex>


            </Container>

        );
    }
}