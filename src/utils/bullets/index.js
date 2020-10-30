import React from 'react';
import BulletTitle from './bulletTitle';
import BulletContainer from './bulletContainer';


export default function BulletFull (props) {
    
    return  <>
            <BulletTitle number={props.number} description={props.description}/>
            <BulletContainer { ... props} />
        </>
}