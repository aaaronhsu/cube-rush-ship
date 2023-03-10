import React from 'react';


import { Container, Text, Flex, Spacer, Button, Divider, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon, WarningIcon } from '@chakra-ui/icons';


export default class CostEstimate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lowCosts: {
                "Concrete": 113,
                "Steel": 100,
                "Lumber": 350,
                "Asphalt": 85,
                "Brick": 340,
                "Copper Piping": 4,
                "Drywall": 0.5,
                "Insulation": 0.5,
                "Roofing Shingles": 100,
            },
            highCosts: {
                "Concrete": 126,
                "Steel": 150,
                "Lumber": 450,
                "Asphalt": 150,
                "Brick": 450,
                "Copper Piping": 8,
                "Drywall": 1,
                "Insulation": 2,
                "Roofing Shingles": 150,
            },
            shipTime: {
                "Concrete": 7,
                "Steel": 20,
                "Lumber": 46,
                "Asphalt": 18,
                "Brick": 26,
                "Copper Piping": 7,
                "Drywall": 3,
                "Insulation": 8,
                "Roofing Shingles": 7,
            },
            totalCost: 0,
            totalCostLabor: 0,
        };
    }

    componentDidMount = () => {
        this.calculateTotalCost();
    }

    calculateTotalCost = () => {
        let totalCost = 0;
        let totalCostLabor = 0;


        this.props.projectInfo.items.forEach(item => {
            let reqQuant = item.requiredQuantity;
            let curQuant = item.currentQuantity;

            if (isNaN(reqQuant)) reqQuant = 0;
            if (isNaN(curQuant)) curQuant = 0;

            if (item.itemName !== 'Holder Name' && reqQuant !== 0)
            totalCost += this.calculateCost(item) * (reqQuant - curQuant);

            let highCost = this.state.highCosts[item.itemName];
            totalCostLabor += highCost * reqQuant;
        });

        this.setState({ totalCost: totalCost, totalCostLabor: totalCostLabor });
    }

    calculateCost = (item) => {
        let cost = 0;
        let lowCost = this.state.lowCosts[item.itemName];
        let highCost = this.state.highCosts[item.itemName];
        let shipTime = this.state.shipTime[item.itemName];
        let currentQuantity = item.currentQuantity;
        let requiredQuantity = item.requiredQuantity;
        let time = this.props.projectInfo.time;

        if (isNaN(currentQuantity)) currentQuantity = 0;
        if (isNaN(requiredQuantity)) requiredQuantity = 0;

        if (currentQuantity < requiredQuantity) {
            cost = highCost - ((Math.min((time - shipTime), 10) / 10) * (highCost - lowCost));
        } 

        return cost;
    }

    determineUnits = (item) => {

        switch (item) {

            case 'Concrete':
                return 'cubic feet of ' + item;
            case 'Steel':
                return 'tons of ' + item;
            case 'Lumber':
                return 'thousands of board feet of ' + item;
            case 'Asphalt':
                return 'tons of ' + item;
            case 'Brick':
                return 'thousand ' + item + 's';
            case 'Copper Piping':
                return 'feet of ' + item;
            case 'Drywall':
                return 'square feet of ' + item;
            case 'Insulation':
                return 'square feet of ' + item;
            case 'Roofing Shingles':
                return 'square feet of ' + item;
            default:
                return 'select an item';
        }
    }

    renderItem = (item) => {
        return (
            item.itemName === 'Holder Name' || item.requiredQuantity === 0 ? null :
            
            item.currentQuantity >= item.requiredQuantity ?
            <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                You have enough {item.itemName} to complete your project.
            </ListItem> :

            
            this.state.shipTime[item.itemName] > parseInt(this.props.projectInfo.time) ?
            <ListItem>
                <ListIcon as={WarningIcon} color='red.500' />
                There is not enough time have {item.itemName} shipped in {this.props.projectInfo.time} days. The item will take {this.state.shipTime[item.itemName]} days to ship.
            </ListItem> :

            <ListItem>
                <ListIcon as={WarningTwoIcon} color='yellow.500' />
                At the unit rate of ${this.calculateCost(item)}, you can purchase {item.requiredQuantity - item.currentQuantity} {this.determineUnits(item.itemName)} for ${this.calculateCost(item) * (item.requiredQuantity - item.currentQuantity)}
            </ListItem>

        );
    }

    renderCosts = () => {
        return (
            <List spacing={3}>
                    {
                        this.props.projectInfo.items.map(item => (
                            this.renderItem(item)
                        ))
                    }
            </List>
        );
    }

    renderBackButton = () => {
        return (
            <Button onClick={(inc) => this.props.changePage(-1)}>Return to Materials</Button>
        );
    }

    renderMenuButton = () => {
        return (
            <Button onClick={(inc) => this.props.changePage(-2)}>Return to Menu</Button>
        );
    }

    render() {
        return (
            <Container mt="50px" mb="0">
                <Text fontSize="3xl" my="10px">Cost Estimate for {this.props.projectInfo.name}</Text>
                <Divider mb="20px" />

                {this.renderCosts()}

                <Text my="20px">Based on the current market prices, the materials for your construction project will cost <span className="bold">${this.state.totalCost}</span>.</Text>

                <Text my="20px">Accounting for labor cost in your area, your construction project is likely to cost between <span className="bold">${Math.round(this.state.totalCostLabor * 0.2 + this.state.totalCost)}</span> and <span className="bold">${Math.round(this.state.totalCostLabor * 0.4 + this.state.totalCost)}</span>.</Text>

                <Flex mb="20px">
                    {this.renderBackButton()}
                    <Spacer />
                    {this.renderMenuButton()}
                </Flex>

            </Container>
        );
    }
}