import RowLabelCell from './RowLabelCell';
import ColumnHeaderCell from './ColumnHeaderCell';

const HeaderRow = ({ columnData, cellWidth }) => {

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} >
            <RowLabelCell>{""}</RowLabelCell>
            {
                columnData.map((data, colIndex) => {
                    return (
                        <ColumnHeaderCell key={colIndex} cellWidth={cellWidth} >
                            {data.startTime.format("hh:mm")}
                        </ColumnHeaderCell>
                    )
                })
            }
        </div>
    );
};

export default HeaderRow;