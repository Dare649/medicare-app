import { useState } from "react";
import Account from "./Account";
import Schedule from "./Schedule";
import Tabs from "../../../components/Tabs";

const Settings = () => {
  return (
    <section className='w-full h-screen lg:p-5 sm:px-2 sm:py-10'>
        <div className="w-full rounded-lg sm:p-2 lg:p-5 lg:my-10 sm:my-5 bg-white">
            <Tabs
                title1={"update work schedule"}
                title2={"update account"}
                content1={<Schedule/>}
                content2={<Account/>}
            />
        </div>
    </section>
  )
}

export default Settings
