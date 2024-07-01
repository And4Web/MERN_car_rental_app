
function DefaultLayout(props) {
  return (
    <div >
      <div className="header bs-1">
        <div className="d-flex justify-content-between align-items-center">
          <h1>A-Cars</h1>
          {/* <button >User</button> */}
        </div>
      </div>

      <div className="content">
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout