import React from 'react';

import { Container, Text, SimpleGrid, Button, Divider } from '@chakra-ui/react';

import ItemList from './ItemList';
import CostEstimate from './CostEstimate';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        let sampleProject = {
            name: 'Sample House',
            number: 0,
            items: [
                {
                    itemName: 'Concrete',
                    currentQuantity: 0,
                    requiredQuantity: 540,
                },
                {
                    itemName: 'Steel',
                    currentQuantity: 0,
                    requiredQuantity: 15,
                },
                {
                    itemName: 'Lumber',
                    currentQuantity: 0,
                    requiredQuantity: 20,
                },
                {
                    itemName: 'Asphalt',
                    currentQuantity: 0,
                    requiredQuantity: 16,
                },
                {
                    itemName: 'Brick',
                    currentQuantity: 0,
                    requiredQuantity: 9,
                },
                {
                    itemName: 'Copper Piping',
                    currentQuantity: 0,
                    requiredQuantity: 300,
                },
                {
                    itemName: 'Drywall',
                    currentQuantity: 0,
                    requiredQuantity: 1500,
                },
                {
                    itemName: 'Insulation',
                    currentQuantity: 0,
                    requiredQuantity: 1500,
                },
                {
                    itemName: 'Roofing Shingles',
                    currentQuantity: 0,
                    requiredQuantity: 3000,
                },
            ],
            time: 45,
        }

        this.state = {
            currentPage: 1,
            currentProject: -1,
            projects: [sampleProject],
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
            time: 60,
        };

        newProjects.push(newProject);

        this.setState({
            projects: newProjects,
            currentProject: this.state.projects.length,
            currentPage: 2,
        });
    }

    updateProjectItems = (items) => {
        let newProjects = [...this.state.projects];
        newProjects[this.state.currentProject].items = items;
        this.setState({projects: newProjects});
    }

    updateProjectTime = (time) => {
        let newProjects = [...this.state.projects];
        newProjects[this.state.currentProject].time = time;
        this.setState({projects: newProjects});
    }

    render() {
        return (
            <Container>


                {
                    this.state.currentPage === 1 ?
                    
                    <div>
                        <Text fontSize="3xl" mt="50px" mb="10px">Projects</Text>
                        <Divider mb="20px" />

                        <SimpleGrid columns={2} spacing={10}>
                            {
                                this.state.projects.map(project => (
                                    <Button 
                                        key={project.id} 
                                        height='80px' 
                                        onClick={(p) => this.changeProject(project.number)}
                                    >
                                        {project.name}
                                    </Button>
                                ))
                            }

                            <Button height='80px' onClick={() => this.createProject()}>+</Button>

                        </SimpleGrid>

                    </div>
                    :

                    this.state.currentPage === 2 ?

                    <div>
                        <ItemList 
                            changePage={(inc) => this.changePage(inc)} 
                            projectInfo={this.state.projects[this.state.currentProject]}
                            updateProjectItems={(items) => this.updateProjectItems(items)}
                            updateProjectTime={(time) => this.updateProjectTime(time)}
                        >

                        </ItemList>
                    </div>

                    :

                    <div>
                        <CostEstimate
                            changePage={(inc) => this.changePage(inc)} 
                            projectInfo={this.state.projects[this.state.currentProject]}
                        >

                        </CostEstimate>
                    </div>
                }


            </Container>
        );
    }
}