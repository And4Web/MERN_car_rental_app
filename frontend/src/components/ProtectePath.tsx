



function ProtectePath(props) {
    // const navigate = useNavigate();
    if(localStorage.getItem('user')){
      return <div>
        {props.children}
      </div>
    }else{
      window.location.href="/login"
    }
  
}

export default ProtectePath