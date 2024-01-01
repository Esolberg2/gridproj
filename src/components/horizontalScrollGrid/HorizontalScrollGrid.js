import React from 'react';
import GridRow from '../gridRow/GridRow';

const HorizontalScrollGrid = ({ rows, columns, gridData, cellWidth, columnLabels, renderLabelCell, renderContentCell, renderColHeaderCell, showRowLabels, controllerRef }) => {

    // const [gridStateData, setGridStateData] = useState(gridData);

    // const updateRow = function () {
    //     setGridStateData(current => {
    //         return {
    //             ...current,
    //             1: {
    //                 ...current[1],
    //                 label: "foo"
    //             }
    //         }
    //     })
    // }

    // console.log("HorizontalScrollGrid rendered")

    // render helpers
    const renderColHeaders = function() {
        if (columnLabels != null) {
            return (
                <GridRow
                    key={-1}
                    rowIndex={-1}
                    columns={columns}
                    cellWidth={cellWidth}
                    showLabel={showRowLabels}
                    rowData={columnLabels}
                    renderContentCell={renderColHeaderCell}
                    renderLabelCell={renderLabelCell}
                    />
            )
        }
    }

    const renderBodyRows = function() {
        return (
            <div>
                {Object.keys(gridData).map((rowKey, rowIndex) => (
                    <GridRow
                        key={rowKey}
                        rowIndex={rowIndex}
                        columns={columns} 
                        cellWidth={cellWidth}
                        showLabel={showRowLabels}
                        renderContentCell={renderContentCell}
                        rowLabel={gridData[rowKey].label}
                        rowData={gridData[rowKey]}
                        renderLabelCell={renderLabelCell}
                        controllerRef={controllerRef}
                        />
                ))}
            </div>
        )
    }

    return (
        <div className="HorizontalScrollGridContainer" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {renderColHeaders()}
                    {renderBodyRows()}
                </div>
            </div>
            {/* <button onClick={updateRow}>test</button> */}
        </div>
    );
};

export default HorizontalScrollGrid;