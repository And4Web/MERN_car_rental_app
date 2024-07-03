import {Row, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import { LoginFormDataType } from '../types';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Login() {

  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state?.alert);

  useEffect(()=>{
    AOS.init();
  },[])

  const onFinish = (values:LoginFormDataType):undefined => {
    dispatch(userLogin(values));
    console.log(values);
  }
  
  if(loading){
    return (
      <Loader/>
    )
  }else{
    return (
      <div className='auth-pages'>
        <Row gutter={16} className='d-flex align-items-center'>
          <Col lg={14} style={{position: 'relative'}}>
              <img data-aos="slide-right" data-aos-duration="2000" src="/src/assets/images/car.jpg" alt="car background" height={550} />
            <div className="auth-bg-logo">
              <h1>A-Cars</h1>
              <p>Drive your favorite Cars at affordable price</p>
            </div>
          </Col>
  
          <Col lg={10} className='p-5'>
            <Form layout='vertical' className='auth-form p-5' onFinish={onFinish}>
              <h1 className='text-light'>Login</h1>
              <hr/>
              <Form.Item name='username' label='Username' rules={[{required: true}]}>
                <Input type='text' placeholder='Enter  your username'/>
              </Form.Item>
  
              <Form.Item name="password" label="Password" rules={[{required: true}]}>
                <Input type='password' placeholder='Enter your password'/>
              </Form.Item>
              <button className="auth-btn">Login</button>
  
              <p>Don't have an account yet?</p>
              <Link to="/register" className='auth-toggle'>Register here</Link>
            </Form>
          </Col>
        </Row>
  
      </div>
    )
  }
}

export default Login