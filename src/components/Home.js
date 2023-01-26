import React from 'react';

import { Container, Text, SimpleGrid, Button } from '@chakra-ui/react';

import ItemList from './ItemList';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            currentProject: -1,
            projects: [],
        };
    }

    changePage = (inc) => {
        this.setState({currentPage: this.state.currentPage + inc});
    }

    changeProject = (num) => {
        console.log("Updating Project to: " + num);
        this.setState({
            currentProject: num,
            currentPage: 2,
        });
    }

    createProject = () => {
        let newProjects = [...this.state.projects];
        let newItem = {
            itemName: 'Holder Name',
            currentQuantity: 0,
            requiredQuantity: 0
        };
        let newItems = [];
        newItems.push(newItem);

        let newProject = {
            name: 'Project ' + (this.state.projects.length + 1),
            number: this.state.projects.length,
            items: newItems,
        };
        newProjects.push(newProject);

        this.setState({
            projects: newProjects,
            currentProject: this.state.projects.length,
            currentPage: 2,
        });
    }

    updateProject = (items) => {
        let newProjects = [...this.state.projects];
        newProjects[this.state.currentProject].items = items;
        this.setState({projects: newProjects});
    }

    render() {
        return (
            <Container>

                {this.state.currentPage}

                {
                    this.state.currentPage === 1 ?

                    <div>
                        <SimpleGrid columns={2} spacing={80}>
                            {
                                this.state.projects.map(project => (
                                    <Button 
                                        key={project.id} 
                                        height='80px' 
                                        onClick={(p) => this.changeProject(project.number)}
                                    >
                                        Test
                                    </Button>
                                ))
                            }

                            <Button height='80px' onClick={() => this.createProject()}>Add Project</Button>

                        </SimpleGrid>

                        <Text>tyfawthyftu</Text>
                    </div>
                    :

                    <div>
                        <ItemList 
                            changePage={(inc) => this.changePage(inc)} 
                            projectInfo={this.state.projects[this.state.currentProject]}
                            updateProject={(items) => this.updateProject(items)}
                        >

                        </ItemList>


                    </div>
                }


            </Container>
        );
    }
}