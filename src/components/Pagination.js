import React from 'react';

import { Container } from '@chakra-ui/react';

import ItemList from './ItemList';

export default class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    render() {
        return (
            <Container>
                {
                    this.state.currentPage === 1 ? <ItemList></ItemList> : null
                }
            </Container>
        );
    }
}