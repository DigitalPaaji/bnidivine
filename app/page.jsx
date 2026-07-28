"use client"
import React, { useState } from 'react'
import Banner from './compo/Banner'
import FounderLT from './compo/FounderLT'
import CurrentLt from './compo/CurrentLt'
import Directors from './compo/Directors'
import RosterCompo from './RosterCompo'
import Supporters from './compo/Supporters'

const page = () => {







  return (
    <div>
      <Banner />
<Directors />
<Supporters/>
     <FounderLT />
     <CurrentLt />
<RosterCompo />
    </div>
  )
}

export default page
