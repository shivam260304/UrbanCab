import { Link} from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link
            to="/home"
            className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-home-5-line'></i>
        </Link>
        {/* First Half of the screen */}
      <div className='h-1/2'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

        {/* Second half of the screen */}
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
            <img className="h-12" src={`/images/car.png`} alt=""/>
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Shivam</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>GJ-01 AB 1234</h4>
                <p className='text-sm text-gray-600'>Tata Nano</p>
            </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center">
            <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">562/11-A</h3>
                        <p className="text-sm -mt-1 text-gray-600">Kanakriya Lake Ahmedabad</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-3">
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className="text-lg font-medium">Rs 193</h3>
                        <p className="text-sm -mt-1 text-gray-600">cash Cash</p>
                    </div>
                </div>
            </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a payment</button>  
      </div>
    </div>
  )
}

export default Riding
