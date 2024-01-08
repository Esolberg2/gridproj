import Cell from './Cell';

const ColumnHeaderCell = ({ cellWidth, children }) => {

    return (
        <Cell style={{width: cellWidth, alignItems: 'flex-start'}} >
            <div style={{paddingLeft: '10px'}} >
                {children}
            </div>
        </Cell>
    );
};

export default ColumnHeaderCell;