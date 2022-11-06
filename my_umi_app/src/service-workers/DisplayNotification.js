export default async () => {
    if(Notification.permission === 'granted')
    {
        const REG_URL = new URL('sw.js', location.origin)
        console.log(REG_URL.toString())
        await navigator.serviceWorker.register(REG_URL.toString());
        navigator.serviceWorker.getRegistration().then(function (reg){
            // console.log(reg)
            if(reg?.showNotification)
                reg.showNotification('Go go');
        });
    }
}