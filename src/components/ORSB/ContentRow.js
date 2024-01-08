import RowLabelCell from './RowLabelCell';
import ContentCell from './ContentCell';

const ContentRow = ({ dropHandler, rowData, columnData, cellWidth, labelWidth, pixelsPerMinute }) => {

    const handleOnDrop = function (e) {
        if (dropHandler) {
            dropHandler(e);
        }
    }

    const handleOnDragOver = function (e) {
        e.preventDefault()
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} onDrop={handleOnDrop} onDragOver={handleOnDragOver} >
            <RowLabelCell cellWidth={labelWidth} >{rowData.label}</RowLabelCell>
            {
                columnData.map((data, colIndex) => {
                    return <ContentCell pixelsPerMinute={pixelsPerMinute} key={colIndex} cellWidth={cellWidth} rowData={rowData} cellStartMoment={data.startTime} cellEndMoment={data.endTime} />
                })
            }
        </div>
    );
};

export default ContentRow;