import Cell from './Cell';

const RowLabelCell = ({ cellWidth, children }) => {
    cellWidth = cellWidth ? cellWidth : 100;

    return (
        <Cell className="RowLabel" style={{width: cellWidth, backgroundColor: 'white', position: 'sticky', left: '0', zIndex: 999}}>
            {children}
        </Cell>
    );
};

export default RowLabelCell;