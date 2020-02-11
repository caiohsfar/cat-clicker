import React from 'react'
import Cat from '../cat'

export default function catList({ data, onCatPress }) {
    return (
        <div>
            {
                data.map(({ id, url }) => (
                    <Cat id={id} uriImage={url} onClick={onCatPress}/>
                    )   
                )
            }
        </div>
    )
    
    
}