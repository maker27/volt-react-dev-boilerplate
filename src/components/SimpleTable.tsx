import React from 'react';
import { Table } from 'react-bootstrap';

type Row = Array<string | number | React.ReactElement>;

export default function SimpleTable({ columns, rows }: { columns: Row; rows: Array<Row> }): JSX.Element {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {columns.map((title, i) => (
                        <th key={i}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((cells, rowNum) => {
                    return (
                        <tr key={rowNum}>
                            {cells.map((cell, cellNum) => (
                                <td key={cellNum} className="align-middle">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
