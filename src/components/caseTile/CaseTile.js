const CaseTile = ({ style, index, name, specialty}) => {

    return (
      <>
        <div 
            className="CaseTile"
            onClick={()=>console.log("click")}
            draggable={true}
            style={{
            backgroundColor: 'orange',
            pointerEvents: 'auto',
            ...style // allows inline style to override default style properties
        }}>
                <div>{name}</div>
                <div>{specialty}</div>
            </div>
      </>
    );
  };
  
  export default CaseTile;