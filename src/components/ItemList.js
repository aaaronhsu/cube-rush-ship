import React from 'react';

import { Container, Text, Divider, Spacer, Flex, Button } from '@chakra-ui/react';

import Item from './Item';



export default class ItemList extends React.Component {
    
    constructor(props) {
        super(props);
    }

    addItem = () => {
        let newItems = [...this.props.projectInfo.items];

        let newItem = {
            itemName: 'Holder Name',
            currentQuantity: 0,
            requiredQuantity: 0
        };

        newItems.push(newItem);

        console.log("Added Item");
        this.props.updateProjectItems(newItems);

    }

    renderBackButton = () => {
        return (
            <Button onClick={(inc) => this.props.changePage(-1)}>Return to Projects</Button>
        );
    }

    renderAddItemButton = () => {
        return (
            <Button onClick={() => this.addItem()}>Add Item</Button>
        );
    }

    renderProcessButton = () => {
        return (
            <Button onClick={(inc) => this.props.changePage(1)}>Process</Button>
        );
    }

    render() {
        return (
            <Container mt="50px" mb="0">

                <Text fontSize="3xl" my="10px">{this.props.projectInfo.name}</Text>

                <Text>List of Items</Text>
                <Divider mb="20px" />

                {
                    this.props.projectInfo.items.map((item, index) => (
                        <span key={item.id}> 
                                <Item
                                    updateProjectItems={(items) => this.props.updateProjectItems(items)}
                                    items={this.props.projectInfo.items}
                                    index={index}
                                    >
                                
                                </Item>
                        </span>
                    ))
                }

                <Flex>
                    {this.renderAddItemButton()}
                    <Spacer />
                    {this.renderBackButton()}
                    <Spacer />
                    {this.renderProcessButton()}
                </Flex>


            </Container>

        );
    }
}