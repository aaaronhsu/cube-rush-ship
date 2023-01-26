import React from 'react';

import { Container, Text } from '@chakra-ui/react';

import ItemList from './ItemList';

export default class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    nextPage = (inc) => {
        this.setState({currentPage: this.state.currentPage + inc});
    }

    render() {
        return (
            <Container>
                {
                    this.state.currentPage === 1 ? <ItemList nextPage={(inc) => this.nextPage(inc)}></ItemList> : <Text>next page</Text>
                }

            </Container>
        );
    }
}