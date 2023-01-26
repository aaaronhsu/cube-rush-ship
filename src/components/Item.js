import React from 'react';

import { Grid, GridItem, Text, Select } from '@chakra-ui/react'

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
                <Text>Current Quantity</Text>
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
                <Text>Required Quantity</Text>
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