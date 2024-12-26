const LocationSearchPannel = () => {

  const locations = [
    "72, Natraj Society, Bahrgav Road Ahmedabad",
    "72, Natraj Society, Bahrgav Road Ahmedabad",
    "72, Natraj Society, Bahrgav Road Ahmedabad",
    "72, Natraj Society, Bahrgav Road Ahmedabad",
    "72, Natraj Society, Bahrgav Road Ahmedabad"
  ]

  return (
    <div>
      {
        locations.map(function(elem, index){
          return (
            <div key={index} //React requires a unique key for each child
              className='flex gap-4 p-3 border-2 rounded-xl active:border-black border-gray-50 items-center my-2 justify-start'>
              <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className='ri-map-pin-fill'></i></h2>
              <h4 className='font-medium'>{elem}</h4>
            </div>
          )
        })
      }
    </div>

  )
}

export default LocationSearchPannel
