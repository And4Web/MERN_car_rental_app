import {Row, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='auth-pages'>
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{position: 'relative'}}>
            <img src="/src/assets/images/car.jpg" alt="car background" height={550} />
          <div className="auth-bg-logo">
            <h1>A-Cars</h1>
            <p>Drive your favorite Cars at affordable price</p>
          </div>
        </Col>

        <Col lg={8} className='p-5'>
          <Form layout='vertical' className='auth-form p-5'>
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

export default Login