import RowLabelCell from './RowLabelCell';
import ContentCell from './ContentCell';

const ContentRow = ({ dropHandler, rowKey, rowData, columnData, cellWidth, pixelsPerMinute }) => {

    const handleOnDrop = function (e) {
        console.log(rowKey)
        console.log(e)
        // console.log(e.dataTransfer.getData("originalData"))
        if (dropHandler) {
            // console.log(JSON.parse(e.dataTransfer.getData("originalData")))
            dropHandler(JSON.parse(e.dataTransfer.getData("originalData")));
        }
    }

    const handleOnDragOver = function (e) {
        e.preventDefault()
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
            
            <RowLabelCell cellWidth={100} >{rowData.label}</RowLabelCell>
            {
                columnData.map((data, colIndex) => {
                    return <ContentCell pixelsPerMinute={pixelsPerMinute} rowKey={rowKey} key={colIndex} cellWidth={cellWidth} rowData={rowData} cellStartMoment={data.startTime} cellEndMoment={data.endTime} />
                })
            }
        </div>
    );
};

export default ContentRow;