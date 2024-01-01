const CaseTile = ({ style, index, caseData}) => {

    const handleOnDrag = function (e) {
        // console.log("adding case data", caseData)
        e.dataTransfer.setData("originalData", JSON.stringify(caseData))
        // console.log(e.dataTransfer.getData("originalData"))
    }

    // console.log(Object.keys(e.dataTransfer.getData("originalData")))

    return (
      <>
        <div 
            onDragStart={handleOnDrag}
            className="CaseTile"
            onClick={()=>console.log("click")}
            draggable={true}
            style={{
            backgroundColor: 'orange',
            pointerEvents: 'auto',
            ...style // allows inline style to override default style properties
        }}>
                <div>{caseData.name}</div>
                <div>{caseData.specialty}</div>
            </div>
      </>
    );
  };
  
  export default CaseTile;