import React from 'react';

export default function GoogleMaps() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.132813989066!2d27.59331111228128!3d53
                .91161577234377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfaef3
                fae639%3A0x4876fd96cac1590!2z0YPQuy4g0J_Qu9Cw0YLQvtC90L7QstCwIDM5LCDQnNC40L
                3RgdC6!5e0!3m2!1sru!2sby!4v1683408274394!5m2!1sru!2sby"
                style={{border: '0', width: '80vw', height: '80vh'}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}