import {Row, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import { RegisterFormDataType } from '../types';
import { useDispatch } from 'react-redux';
import { backendUrl, userRegister } from '../redux/actions/userActions';

function Register() {

  const dispatch = useDispatch();

  const onFinish = (values:RegisterFormDataType):undefined => {
    dispatch(userRegister(values));
    console.log(values);
  }
  console.log("backendUrl: ", backendUrl)
  return (
    <div className='auth-pages'>
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={14} style={{position: 'relative'}}>
          <img src="/src/assets/images/car.jpg" alt="car background" height={550} />
          <div className="auth-bg-logo">
            <h1>A-Cars</h1>
            <p>Drive your favorite Cars at affordable price</p>
          </div>
        </Col>
        
        <Col lg={10} className='p-5'>
          <Form layout='vertical' className='auth-form p-5' onFinish={onFinish}>
            <h1 className='text-light'>Register</h1>
            <hr/>
            <Form.Item name='username' label='Username' rules={[{required: true}]}>
              <Input type='text' placeholder='Enter  your username'/>
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{required: true}]}>
              <Input type='password' placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item name="cPassword" label="Confirm Password" rules={[{required: true}]}>
              <Input type='password' placeholder='Confirm your password'/>
            </Form.Item>
            <button className="auth-btn">Register</button>

            <p>Already have an account?</p>
            <Link to="/login" className='auth-toggle'>Login here</Link>
          </Form>
        </Col>
      </Row>

    </div>
  )
}

export default Register