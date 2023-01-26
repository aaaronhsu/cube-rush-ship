import React from 'react';

import { Grid, GridItem, Text, Select, Tooltip } from '@chakra-ui/react'

import {
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

export default class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    determineUnits = () => {

        switch (this.props.items[this.props.index].itemName) {

            case 'Concrete':
                return 'in cubic feet';
            case 'Steel':
                return 'in tons';
            case 'Lumber':
                return 'in thousand of board feet';
            case 'Asphalt':
                return 'in tons';
            case 'Brick':
                return 'in thousands';
            case 'Copper Piping':
                return 'in feet';
            case 'Drywall':
                return 'in square feet';
            case 'Insulation':
                return 'in square feet';
            case 'Roofing Shingles':
                return 'in square feet';
            default:
                return 'select an item';
        }
    }

    updateItemSelect = (itemName) => {
        let newItems = [...this.props.items];
        newItems[this.props.index].itemName = itemName;
        this.props.updateProject(newItems);
    }

    updateCurrentQuantity = (currentQuantity) => {
        let newItems = [...this.props.items];
        newItems[this.props.index].currentQuantity = currentQuantity;
        this.props.updateProject(newItems);
    }

    updateRequiredQuantity = (requiredQuantity) => {
        let newItems = [...this.props.items];
        newItems[this.props.index].requiredQuantity = requiredQuantity;
        this.props.updateProject(newItems);
    }


    renderItemSelect = () => {
        return(
            <GridItem w='100%' h='10' bg='white.500'>
                <Text>Item Name</Text>

                <Select 
                    placeholder={this.props.items[this.props.index].itemName === 'Holder Name' ? "Select Option" : this.props.items[this.props.index].itemName} 
                    textColor='black' 
                    onChange={(event) => {
                    this.updateItemSelect(event.target.value);
                }}>
                    <option value='Concrete'>Concrete</option>
                    <option value='Steel'>Steel</option>
                    <option value='Lumber'>Lumber</option>
                    <option value='Asphalt'>Asphalt</option>
                    <option value='Brick'>Brick</option>
                    <option value='Copper Piping'>Copper Piping</option>
                    <option value='Drywall'>Drywall</option>
                    <option value='Insulation'>Insulation</option>
                    <option value='Roofing Shingles'>Roofing Shingles</option>

                </Select>

            </GridItem>
        );
    }

    renderCurrentQuantity = () => {
        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Current Quantity</Tooltip>
                
                <Input placeholder={this.determineUnits()} textColor='black' onChange={(event) => {
                    this.updateCurrentQuantity(parseInt(event.target.value));
                }}/>

            </GridItem>
        );
    }

    renderRequiredQuantity = () => {
        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Required Quantity</Tooltip>
                
                <Input placeholder={this.determineUnits()} textColor='black' onChange={(event) => {
                    this.updateRequiredQuantity(parseInt(event.target.value));
                }}/>

            </GridItem>
        );
    }

    render() {
            return (
                <div>

                    <Grid templateColumns='repeat(3, 1fr)' gap={6} mb="40px">
                        
                        {this.renderItemSelect()}
                        {this.renderCurrentQuantity()}
                        {this.renderRequiredQuantity()}

                    </Grid>

                </div>
            );
    }
}