import React from 'react'
import Image from 'next/image'

export default function ImageE() {
  return (
    <div>

        <h1>img component</h1>
        <img src="og.png"/>


        <br/>

        <h1>Image Component</h1>
        <Image width={953} height={696} src="/og.png"/>
    </div>
  )
}
