import React from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

const List = ({data, header, centered, headerSort}) => {

    let i = 0;

    let headers = header.map(function(item){return headerSort ? <Table.HeaderCell onClick={headerSort.bind(this,i)} 
                                                                key={i++}>
                                                        {item}
                                                    </Table.HeaderCell> : 
                                                    <Table.HeaderCell key={i++}>
                                                        {item}
                                                    </Table.HeaderCell>});

    let items = data.map(item => <Content key={i++} data={item}/>);
    
    return(
        <Table textAlign={"center"} className="table">
            <Table.Header>
                <Table.Row>
                  {headers}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items}
            </Table.Body>
        </Table>
    )

}

const Content = ({data}) => {

    let i = 0;

    let cell = data.map(item=> <Table.Cell key={i++}>{item}</Table.Cell>);

    return(
        <Table.Row>
            {cell}
        </Table.Row>
    )
}

export default List;