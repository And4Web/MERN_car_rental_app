

function ProtectePath(props) {
    
    if(localStorage.getItem('user')){
      return <div>
        {props.children}
      </div>
    }else{
      window.location.href="/login"
      // return redirect("/login")
    }
  
}

export default ProtectePath