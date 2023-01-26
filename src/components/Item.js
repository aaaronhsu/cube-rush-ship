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
        this.state = {
            itemName: null,
            currentQuantity: 0,
            requiredQuantity: 0,
        };
    }

    determineUnits = () => {

        switch (this.state.itemName) {

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

    renderItemSelect = () => {
        return(
            <GridItem w='100%' h='10' bg='white.500'>
                <Text>Item Name</Text>

                <Input placeholder='Item Name' textColor='black' onChange={(event) => {
                    this.setState({itemName: event.target.value});
                }}/>

            </GridItem>
        );
    }

    renderCurrentQuantity = () => {

        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Current Quantity</Tooltip>
                <NumberInput
                                defaultValue={0}
                                variant='flushed'
                                min={0}
                                max={100000000}
                                onChange={(valueString) => {
                                    this.setState({currentQuantity: valueString});
                                }
                            }
                            textColor='black'
                            >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </GridItem>
        );
    }

    renderRequiredQuantity = () => {

        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Required Quantity</Tooltip>
                <NumberInput
                                defaultValue={0}
                                variant='flushed'
                                min={0}
                                max={100000000}
                                onChange={(valueString) => {
                                    this.setState({requiredQuantity: valueString});
                                }
                            }
                            textColor='black'
                            >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </GridItem>
        );
    }


    renderItemSelectNew = () => {
        return(
            <GridItem w='100%' h='10' bg='white.500'>
                <Text>Item Name</Text>

                <Select placeholder='Item Name' textColor='black' onChange={(event) => {
                    this.setState({itemName: event.target.value});
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

    renderCurrentQuantityNew = () => {
        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Current Quantity</Tooltip>
                
                <Input placeholder={this.determineUnits()} textColor='black' onChange={(event) => {
                    this.setState({currentQuantity: parseInt(event.target.value)});
                }}/>

            </GridItem>
        );
    }

    renderRequiredQuantityNew = () => {
        return (
            <GridItem w='100%' h='10' bg='white.500'>
                <Tooltip label={this.determineUnits()}>Required Quantity</Tooltip>
                
                <Input placeholder={this.determineUnits()} textColor='black' onChange={(event) => {
                    this.setState({requiredQuantity: parseInt(event.target.value)});
                }}/>

            </GridItem>
        );
    }

    render() {
            return (
                <div>

                    <Grid templateColumns='repeat(3, 1fr)' gap={6} mb="40px">
                        
                        {this.renderItemSelectNew()}
                        {this.renderCurrentQuantityNew()}
                        {this.renderRequiredQuantityNew()}

                    </Grid>

                </div>
            );
    }
}