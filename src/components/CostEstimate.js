import React from 'react';


import { Container, Text, Flex, Spacer, Button, Divider } from '@chakra-ui/react';


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
        };
    }

    componentDidMount = () => {
        this.calculateTotalCost();
    }

    calculateTotalCost = () => {
        let totalCost = 0;

        this.props.projectInfo.items.forEach(item => {
            if (item.itemName !== 'Holder Name' && item.requiredQuantity !== 0)
            totalCost += this.calculateCost(item) * (item.requiredQuantity - item.currentQuantity);
        });

        this.setState({ totalCost: totalCost });
    }

    calculateCost = (item) => {
        let cost = 0;
        let lowCost = this.state.lowCosts[item.itemName];
        let highCost = this.state.highCosts[item.itemName];
        let shipTime = this.state.shipTime[item.itemName];
        let currentQuantity = item.currentQuantity;
        let requiredQuantity = item.requiredQuantity;
        let time = this.props.projectInfo.time;

        if (currentQuantity < requiredQuantity) {
            cost = highCost - ((Math.min((time - shipTime), 10) / 10) * (highCost - lowCost));
        } 

        return cost;
    }

    renderItem = (item) => {
        return (
            <div>
                {
                    item.itemName === 'Holder Name' || (item.requiredQuantity === 0 && item.currentQuantity === 0) ? null
                    :
                    item.requiredQuantity > item.currentQuantity ?
    
                        <Container>
                            <Text>Based off the current unit price of ${this.calculateCost(item)}, it will cost you ${this.calculateCost(item) * (item.requiredQuantity - item.currentQuantity)} to buy the remaining {item.requiredQuantity - item.currentQuantity} {item.itemName}</Text>
                        </Container>
    
                        :
    
                        <Container>
                            <Text>You have enough {item.itemName}</Text>
                        </Container>
                }
            </div>
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

                    {
                        this.props.projectInfo.items.map(item => (
                            <span key={item.id}>
                                {this.renderItem(item)}
                            </span>
                        ))
                    }

                <Text my="10px">Based on the current market prices, your construction project will cost ${this.state.totalCost}</Text>

                <Flex>
                    {this.renderBackButton()}
                    <Spacer />
                    {this.renderMenuButton()}
                </Flex>

            </Container>
        );
    }
}