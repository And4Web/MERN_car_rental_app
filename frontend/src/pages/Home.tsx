import DefaultLayout from '../components/DefaultLayout'
import { useSelector } from 'react-redux';
import {Row, Col} from 'antd';
import Loader from '../components/Loader';

function Home() {
  const {cars} = useSelector(state=>state?.cars);

  const {loading} = useSelector(state=>state?.alert);

  console.log(cars, loading);
  return (
    
    <DefaultLayout>
      {loading && <Loader/>}

      {!loading && <div className='cars-container'>
        <Row justify="center" align="middle" gutter={16} className='mt-3'>
        {
          cars?.map((car, index)=>{
            return (
              <Col lg={5} md={8} sm={12} xs={20} >              
                <div key={index} className="car p-2 bs-1 mt-3">
                  <img src={car.image} alt={car.name} className='car-img mb-2' />

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div>
                      <h6>{car.name}</h6>
                      <p>&#8377;{car.rentPerHour} per hour</p>
                    </div>


                    <div>
                      <button className='btn-1'>Book now</button>
                    </div>
                  </div>
                </div>
              </Col>
            )
          })
        }
      </Row>
        </div>}
      
    </DefaultLayout>
  )
}

export default Home