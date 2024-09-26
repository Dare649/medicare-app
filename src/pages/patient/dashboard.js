<div className='flex flex-col gap-y-8 w-full'>
          <div className='flex lg:flex-row sm:flex-col items-center gap-5 w-full'>
            <div className="wallet bg-primary-100 rounded-lg lg:w-[50%] sm:w-full">
              <div className='lg:m-6 sm:m-3'>
                <div className='flex flex-row items-center justify-between mb-5'>
                  <h2 className="text-white capitalize text-xl font-medium">medicare wallet</h2>
                  <h4 className="text-white capitalize">nigerian naira</h4>
                </div>
                <h2 className="first-letter:capitalize text-white">total balance</h2>
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-col'>
                    <div className="flex flex-row items-center space-x-4 mb-5">
                      <h1 className="text-2xl font-semibold text-white">{!showBalance ? `${"#0.00"}`: "****"}</h1>
                      <span
                        onClick={handleBalance}
                        className="cursor-pointer font-bold text-white"
                      >
                        {
                          showBalance && showBalance ?
                          (<PiEyeClosedLight size={20}/>):(<PiEyeLight size={20}/>)
                        }
                      </span>
                    </div>
                    <button className="flex items-center space-x-2 py-3 px-8 bg-white rounded-lg text-primary-100 font-medium text-sm"><span className=""><FiUpload/></span><span className="first-letter:capitalize">add money</span></button>
                    
                  </div>
                  <div className="sm:hidden lg:flex">
                    <img src={coin} alt="" className="w-full"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="appointment border-primary-100 border-2 rounded-lg lg:w-[50%] sm:w-full">
              <div className="flex flex-row items-center justify-between">
                <div className="lg:m-6 sm:m-3">
                  <h2 className="text-white font-medium first-letter:capitalize text-xl">an appointment is just a click away</h2>
                  <p className="text-white text-xs text-wrap mb-12">start your journey to affordable healthcare today</p>
                  <button onClick={handleVisible} className="flex capitalize items-center space-x-2 py-3 px-8 bg-white rounded-lg text-primary-100 font-medium text-sm">book an appointment</button>
                </div>
                <div className="sm:hidden lg:flex">
                  <img src={doc} alt="MyMedicare" className=""/>
                </div>
              </div>
              {visible && (
                <Modal visible={visible} onClose={handleVisible}>
                  <AppointmentBooking handleCancel={handleVisible} handleClose={handleVisible} />
                </Modal>
              )}
            </div>
          </div>
          
          <div className="w-full flex lg:flex-row sm:flex-col gap-5">
            <div className="graph lg:w-[60%] sm:w-full border-2 border-neutral-50 rounded-lg">
              <GraphSlider graphDetails={graphDetails}/>
            </div>

            <div className="flex flex-col gap-y-5 lg:w-[40%] sm:w-full">
              <div className="appointments border-2 border-neutral-50 rounded-lg w-full">
                <div className="lg:m-4 sm:m-1">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-medium capitalize">appointments</h2>
                    <Link to={"/patient-appointments"} className="capitalize text-primary-100 font-bold text-sm flex flex-row items-center space-x-2 text-md">
                      <p>see more</p>
                      <p><IoIosArrowForward/></p>
                    </Link>
                  </div>
                  <div>
                    {
                      dashboardAppointment.map((item, id) =>(
                        <Link key={id} to={""} className="">
                          <div className="rounded-lg bg-primary-100/50 my-2">
                            <div className="flex flex-row items-center justify-between py-2 px-1">
                              <div className="flex flex-row space-x-3 items-center ">
                                <div className="rounded-lg bg-primary-100">
                                  <img src={item.img} alt="MyMedicare" className="p-[1.5px]"/>
                                </div>
                                <div className="flex flex-col">
                                  <h2 className="font-bold capitalize text-lg">{item.doctor}</h2>
                                  <p className="font-medium first-letter:capitalize">{item.speciality}</p>
                                </div>
                              </div>
                              <p className="font-bold text-primary-100">{item.time}</p>
                            </div>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>

              <div className="prescription w-full border-2 border-neutral-50 rounded-lg">
                <div className="lg:m-4 sm:m-1">
           
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-lg font-medium capitalize">recent prescription</h2>
                      <Link to={"/patient-prescription"} className="text-primary-100 capitalize text-sm flex flex-row items-center space-x-2 text-md font-bold">
                        <p>see more</p>
                        <p><IoIosArrowForward/></p>
                      </Link>
                    </div>
               
                  <div className="bg-neutral-50/50 rounded-lg">
                    <div>
                      {
                        dashboardPrescription.map((item, id) =>(
                          <div key={id} className=" ">
                            <div className="py-2 px-1">
                              <h2 className="text-primary-100 font-bold text-lg capitalize">{item.title}</h2>
                              <div className="flex flex-row gap-y-2 items-center space-x-2">
                                <h2 className="text-lg capitalize fornt-bold">{item.doctor}</h2>
                                <h2 className="text-sm capitalize text-neutral-50 fornt-bold">{item.speciality}</h2>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>